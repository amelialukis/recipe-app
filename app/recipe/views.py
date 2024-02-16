"""
Views for recipe APIs.
"""
import random

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.db.models import Q, Count
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiParameter,
    OpenApiTypes
)
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Recipe, Tag, Ingredient, Unit, RecipeLike
from recipe import serializers, permissions
from recipe.decorators import cache_on_auth


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                "tags",
                OpenApiTypes.STR,
                description="Comma seperated list of tag IDs to filter",
            ),
            OpenApiParameter(
                "ingredients",
                OpenApiTypes.STR,
                description="Comma seperated list of ingredients IDs to "
                            + "filter",
            ),
            OpenApiParameter(
                "title",
                OpenApiTypes.STR,
                description="Search recipe by name",
            ),
            OpenApiParameter(
                "my_recipe",
                OpenApiTypes.BOOL,
                description="Filter user's own recipes",
                default=False,
            ),
            OpenApiParameter(
                "liked_recipe",
                OpenApiTypes.BOOL,
                description="Filter user's liked recipes",
                default=False,
            ),
            OpenApiParameter(
                "sort_by",
                OpenApiTypes.STR,
                description="Sort recipes",
                enum=["latest", "oldest", "popularity"],
                default="latest",
            ),
        ]
    )
)
class RecipeViewSet(viewsets.ModelViewSet):
    """View for manage recipe APIs."""
    serializer_class = serializers.RecipeDetailSerializer
    queryset = Recipe.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.RecipePermission]

    def _params_to_ints(self, qs):
        """Convert a list of strings to integers."""
        return [int(str_id) for str_id in qs.split(",")]

    def get_queryset(self):
        """Retrieve recipes for authenticated user."""
        title = self.request.query_params.get("title")
        tags = self.request.query_params.get("tags")
        ingredients = self.request.query_params.get("ingredients")
        my_recipe = self.request.query_params.get("my_recipe", False)
        sort_by = self.request.query_params.get("sort_by", "latest")
        liked_recipes = self.request.query_params.get("liked_recipes", False)
        home_recipes = self.request.query_params.get("home_recipes", False)
        queryset = self.queryset

        if home_recipes:
            ids = list(
                queryset
                .filter(Q(user=self.request.user) | Q(private=False))
                .distinct()
                .values_list("id", flat=True)
            )
            recipe_ids = random.sample(ids, min(10, len(ids)))
            return (queryset
                    .filter(id__in=recipe_ids)
                    .annotate(likes=Count("recipelike"))
                    .order_by("-likes"))

        if title:
            queryset = queryset.filter(title__icontains=title)
        if tags:
            tags_ids = self._params_to_ints(tags)
            queryset = queryset.filter(tags__id__in=tags_ids)
        if ingredients:
            ingredient_ids = self._params_to_ints(ingredients)
            queryset = queryset.filter(
                ingredients__ingredient__id__in=ingredient_ids
            )

        if sort_by == "latest":
            queryset = queryset.order_by("-id")
        elif sort_by == "oldest":
            queryset = queryset.order_by("id")
        elif sort_by == "popularity":
            queryset = (queryset
                        .annotate(likes=Count("recipelike"))
                        .order_by("-likes"))

        if liked_recipes:
            queryset = queryset.filter(recipelike__user=self.request.user)

        if my_recipe:
            return queryset.filter(
                user=self.request.user
            ).distinct()

        return queryset.filter(
            Q(user=self.request.user) | Q(private=False)
        ).distinct()

    def get_serializer_class(self):
        """Return the serializer class for request."""
        if self.action == "list":
            return serializers.RecipeSerializer
        elif self.action == "upload_image":
            return serializers.RecipeImageSerializer

        return self.serializer_class

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def perform_create(self, serializer):
        """Create new recipe."""
        serializer.save(user=self.request.user)

    @action(methods=["POST"], detail=True, url_path="upload-image")
    def upload_image(self, request, pk=None):
        """Upload an image to recipe."""
        recipe = self.get_object()
        serializer = self.get_serializer(recipe, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(cache_on_auth(60 * 60))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


@method_decorator(cache_on_auth(24 * 60 * 60), "dispatch")
@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                "assigned_only",
                OpenApiTypes.INT,
                enum=[0, 1],
                description="Filter by items assigned to recipes.",
            )
        ]
    )
)
class BaseRecipeAttrViewSet(mixins.ListModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):
    """Base viewset for recipe attributes."""
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter queryset to authenticated user."""
        assigned_only = bool(
            int(self.request.query_params.get("assigned_only", 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(recipe__isnull=False)
        return queryset.order_by("-name").distinct()


class TagViewSet(BaseRecipeAttrViewSet):
    """Manage tags in database."""
    serializer_class = serializers.TagSerializer
    queryset = Tag.objects.all()


class IngredientViewSet(BaseRecipeAttrViewSet):
    """Manage ingredients in the database."""
    serializer_class = serializers.IngredientSerializer
    queryset = Ingredient.objects.all()

    def get_queryset(self):
        """Filter queryset to authenticated user."""
        assigned_only = bool(
            int(self.request.query_params.get("assigned_only", 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(recipeingredient__isnull=False)
        return queryset.order_by("-name").distinct()


@method_decorator(cache_on_auth(24 * 60 * 60), "dispatch")
class UnitViewSet(mixins.ListModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet
                  ):
    """View for manage units."""
    serializer_class = serializers.UnitSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Unit.objects.all()


class RecipeLikeView(CreateAPIView):
    """View for manage recipe likes."""
    serializer_class = serializers.RecipeLikeSerializer
    queryset = RecipeLike.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
