"""
Serializers for recipe APIs.
"""
from django.http import HttpResponse
from drf_spectacular.utils import (
    extend_schema_field,
    OpenApiTypes,
)
from rest_framework import serializers

from core.models import (
    Recipe,
    Tag,
    Ingredient,
    Unit,
    RecipeIngredient,
    RecipeLike
)


class TagSerializer(serializers.ModelSerializer):
    """Serializer for tags"""

    class Meta:
        model = Tag
        fields = ["id", "name"]
        read_only_fields = ["id"]


class UnitSerializer(serializers.ModelSerializer):
    """Serializer for units."""

    class Meta:
        model = Unit
        fields = ["id", "name"]
        read_only_fields = ["id"]


class IngredientSerializer(serializers.ModelSerializer):
    """Serializer for ingredients."""

    class Meta:
        model = Ingredient
        fields = ["id", "name"]
        read_only_fields = ["id"]


class RecipeIngredientSerializer(serializers.ModelSerializer):
    """Serializer for recipe ingredients."""
    unit = UnitSerializer()
    ingredient = IngredientSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ["id", "amount", "unit", "ingredient"]
        read_only_fields = ["id"]


class RecipeLikeSerializer(serializers.Serializer):
    """Serializer for recipe likes."""
    recipe_id = serializers.IntegerField(min_value=1)

    class Meta:
        fields = ["recipe_id"]

    def create(self, validated_data):
        """Create a like object for recipe."""
        recipe_id = validated_data.pop("recipe_id", 0)
        request = self.context.get("request")
        if request:
            like_obj, created = RecipeLike.objects.get_or_create(
                recipe_id=recipe_id,
                user=request.user
            )
            if not created:
                like_obj.active = not like_obj.active
                like_obj.save()
            return like_obj
        return HttpResponse(status=400)


class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for recipes."""
    tags = TagSerializer(many=True, required=False)
    ingredients = RecipeIngredientSerializer(many=True, required=False)
    user = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = [
            "id", "title", "time_minutes", "price", "link", "tags",
            "ingredients", "user", "private", "image", "likes",
            "liked",
        ]
        read_only_fields = ["id", "user"]

    def _get_or_create_tags(self, tags, recipe):
        """Handle getting or creating tags as needed."""
        for tag in tags:
            tag_obj, created = Tag.objects.get_or_create(
                name=tag["name"].lower(),
            )
            recipe.tags.add(tag_obj)

    def _get_or_create_ingredients(self, ingredients, recipe):
        """Handle getting or creating ingredients as needed."""
        for ingredient in ingredients:
            unit_obj, _ = Unit.objects.get_or_create(
                name=ingredient["unit"]["name"].lower()
            )
            ingredient_obj, _ = Ingredient.objects.get_or_create(
                name=ingredient["ingredient"]["name"].lower()
            )

            recipe_ingredient_obj, created = RecipeIngredient \
                .objects.get_or_create(
                    amount=ingredient["amount"],
                    unit=unit_obj,
                    ingredient=ingredient_obj,
                )
            recipe.ingredients.add(recipe_ingredient_obj)

    def create(self, validated_data):
        """Create a recipe."""
        tags = validated_data.pop("tags", [])
        ingredients = validated_data.pop("ingredients", [])
        recipe = Recipe.objects.create(**validated_data)
        self._get_or_create_tags(tags, recipe)
        self._get_or_create_ingredients(ingredients, recipe)

        return recipe

    def update(self, instance, validated_data):
        """Update recipe."""
        tags = validated_data.pop("tags", None)
        ingredients = validated_data.pop("ingredients", None)
        if tags is not None:
            instance.tags.clear()
            self._get_or_create_tags(tags, instance)
        if ingredients is not None:
            instance.ingredients.clear()
            self._get_or_create_ingredients(ingredients, instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

    @extend_schema_field(OpenApiTypes.STR)
    def get_user(self, obj):
        request = self.context.get("request")
        return obj.user.name if request and obj.user != request.user else ""

    @extend_schema_field(OpenApiTypes.INT)
    def get_likes(self, obj):
        return obj.recipelike_set.filter(active=True).count()

    @extend_schema_field(OpenApiTypes.BOOL)
    def get_liked(self, obj):
        if request := self.context.get("request"):
            return (obj
                    .recipelike_set
                    .filter(active=True, user=request.user)
                    .exists())
        return False


class RecipeDetailSerializer(RecipeSerializer):
    """Serializer for recipe detail view."""

    class Meta(RecipeSerializer.Meta):
        fields = (RecipeSerializer.Meta.fields
                  + ["description", "procedures"])


class RecipeImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to recipes."""

    class Meta:
        model = Recipe
        fields = ["id", "image"]
        read_only_fields = ["id"]
        extra_kwargs = {"image": {"required": "True"}}
