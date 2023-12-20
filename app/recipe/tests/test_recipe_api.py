"""
Tests for recipe APIs.
"""
from decimal import Decimal
import tempfile
import os

from PIL import Image

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Recipe, Tag, Ingredient, Unit, RecipeIngredient
from ..serializers import (
    RecipeSerializer,
    RecipeDetailSerializer,
)

RECIPES_URL = reverse("recipe:recipe-list")


def detail_url(recipe_id):
    """Create and return a recipe detail URL."""
    return reverse("recipe:recipe-detail", args=[recipe_id])


def image_upload_url(recipe_id):
    """Create and return an image upload URL."""
    return reverse("recipe:recipe-upload-image", args=[recipe_id])


def create_recipe(user, **params):
    """Create and return a sample recipe."""
    defaults = {
        "title": "Sample recipe title",
        "time_minutes": 30,
        "price": Decimal("2.99"),
        "description": "Sample description.",
        "link": "http://example.com/recipes",
    }
    defaults.update(params)

    recipe = Recipe.objects.create(user=user, **defaults)
    return recipe


def create_user(**params):
    """Create and return a new user."""
    return get_user_model().objects.create_user(**params)


class PublicRecipeAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test auth is required to call API."""
        res = self.client.get(RECIPES_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateRecipeApiTests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            email="test@example.com",
            password="test1234"
        )
        self.other_user = create_user(
            email="other@example.com",
            password="pass1234",
        )

        self.client.force_authenticate(self.user)

    def test_retrieve_recipes(self):
        """Test retrieving a list of recipes."""
        create_recipe(user=self.user)
        create_recipe(user=self.user)

        res = self.client.get(RECIPES_URL)

        recipes = Recipe.objects.all().order_by("-id")
        serializer = RecipeSerializer(recipes, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_private_recipe_list_limited_to_user(self):
        """Test list of private recipes is limited to authenticated user."""
        other_recipe = create_recipe(user=self.other_user, private=False)
        my_recipe = create_recipe(user=self.user)

        res = self.client.get(RECIPES_URL, data={"my_recipe": True})

        other_recipe_ser = RecipeSerializer(other_recipe).data
        my_recipe_ser = RecipeSerializer(my_recipe).data
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertNotIn(other_recipe_ser, res.data)
        self.assertIn(my_recipe_ser, res.data)

    def test_other_user_non_private_recipe(self):
        """Test list other user non-private recipes."""
        other_recipe = create_recipe(user=self.other_user, private=False)
        my_recipe = create_recipe(user=self.user)

        res = self.client.get(RECIPES_URL)

        other_recipe_ser = RecipeSerializer(other_recipe).data
        my_recipe_ser = RecipeSerializer(my_recipe).data
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn(other_recipe_ser, res.data)
        self.assertIn(my_recipe_ser, res.data)

    def test_get_recipe_detail(self):
        """Test get recipe detail."""
        recipe = create_recipe(user=self.user)

        url = detail_url(recipe.id)
        res = self.client.get(url)

        serializer = RecipeDetailSerializer(recipe)
        self.assertEqual(res.data, serializer.data)

    def test_get_other_user_non_private_recipe_detail(self):
        """Test get non-private recipe detail of other user."""
        recipe = create_recipe(user=self.other_user, private=False)

        url = detail_url(recipe.id)
        res = self.client.get(url)

        serializer = RecipeDetailSerializer(recipe)
        self.assertEqual(res.data, serializer.data)

    def test_get_other_user_private_recipe_detail_returns_error(self):
        """Test get private recipe detail of other user returns error."""
        recipe = create_recipe(user=self.other_user, private=True)

        url = detail_url(recipe.id)
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_recipe(self):
        """Test creating a recipe."""
        payload = {
            "title": "Sample recipe",
            "time_minutes": 30,
            "price": Decimal("3.40")
        }
        res = self.client.post(RECIPES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        recipe = Recipe.objects.get(id=res.data["id"])
        for k, v in payload.items():
            self.assertEqual(getattr(recipe, k), v)
        self.assertEqual(recipe.user, self.user)

    def test_partial_update(self):
        """Test partial update of a recipe."""
        original_link = "http://example.com/recipe.pdf"
        recipe = create_recipe(
            user=self.user,
            title="Sample recipe title",
            link=original_link
        )

        payload = {"title": "New recipe title"}
        url = detail_url(recipe.id)
        res = self.client.patch(url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        recipe.refresh_from_db()
        self.assertEqual(recipe.title, payload["title"])
        self.assertEqual(recipe.link, original_link)
        self.assertEqual(recipe.user, self.user)

    def test_full_update(self):
        """Test full update of recipe."""
        recipe = create_recipe(
            user=self.user,
            title="Sample recipe title",
            link="http://example.com/recipe.pdf",
            description="Sample recipe description."
        )

        payload = {
            "title": "New recipe title",
            "link": "https://example.com/new_recipe.pdf",
            "description": "New recipe description.",
            "time_minutes": 15,
            "price": Decimal("7.80"),
        }
        url = detail_url(recipe.id)
        res = self.client.put(url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        recipe.refresh_from_db()
        for k, v in payload.items():
            self.assertEqual(getattr(recipe, k), v)
        self.assertEqual(recipe.user, self.user)

    def test_update_other_user_non_private_recipe_detail_returns_error(self):
        """Test update non-private recipe of other user returns error."""
        recipe = create_recipe(user=self.other_user, private=False)
        payload = {"title": "New recipe title"}

        url = detail_url(recipe.id)
        res = self.client.patch(url, payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_user_returns_error(self):
        """Test changing the recipe user results in an error."""
        recipe = create_recipe(user=self.user)

        payload = {"user": self.other_user.id}
        url = detail_url(recipe.id)
        self.client.patch(url, payload)

        recipe.refresh_from_db()
        self.assertEqual(recipe.user, self.user)

    def test_delete_recipe(self):
        """Test deleting a recipe successful."""
        recipe = create_recipe(user=self.user)

        url = detail_url(recipe.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Recipe.objects.filter(id=recipe.id).exists())


    def test_delete_other_user_non_private_recipe_error(self):
        """Test trying to delete another users recipe gives error."""
        recipe = create_recipe(user=self.other_user, private=False)

        url = detail_url(recipe.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(Recipe.objects.filter(id=recipe.id).exists())

    def test_create_recipe_with_new_tags(self):
        """Test creating a recipe with new tags."""
        payload = {
            "title": "Thai Curry",
            "time_minutes": 30,
            "price": Decimal("3"),
            "tags": [{"name": "Thai"}, {"name": "Dinner"}]
        }

        res = self.client.post(RECIPES_URL, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        recipes = Recipe.objects.filter(user=self.user)
        self.assertEqual(recipes.count(), 1)
        recipe = recipes[0]
        self.assertEqual(recipe.tags.count(), 2)
        for tag in payload["tags"]:
            exists = recipe.tags.filter(
                name=tag["name"].lower(),
            ).exists()
            self.assertTrue(exists)

    def test_create_recipe_with_existing_tag(self):
        """Test creating a recipe with existing tag."""
        tag_indian = Tag.objects.create(name="Indian")
        payload = {
            "title": "Pongal",
            "time_minutes": 60,
            "price": Decimal("3.75"),
            "tags": [{"name": "Indian"}, {"name": "Breakfast"}]
        }

        res = self.client.post(RECIPES_URL, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        recipes = Recipe.objects.filter(user=self.user)
        self.assertEqual(recipes.count(), 1)
        recipe = recipes[0]
        self.assertEqual(recipe.tags.count(), 2)
        self.assertIn(tag_indian, recipe.tags.all())
        for tag in payload["tags"]:
            exists = recipe.tags.filter(
                name=tag["name"].lower(),
            ).exists()
            self.assertTrue(exists)

    def test_create_tag_on_update(self):
        """Test creating tag when updating a recipe."""
        recipe = create_recipe(user=self.user)

        payload = {"tags": [{"name": "Lunch"}]}
        url = detail_url(recipe.id)
        res = self.client.patch(url, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        new_tag = Tag.objects.get(name="lunch")
        self.assertIn(new_tag, recipe.tags.all())

    def test_update_recipe_assign_tag(self):
        """Test assigning an existing tag when updating a recipe."""
        tag_breakfast = Tag.objects.create(name="Breakfast")
        recipe = create_recipe(user=self.user)
        recipe.tags.add(tag_breakfast)

        tag_lunch = Tag.objects.create(name="Lunch")
        payload = {"tags": [{"name": "Lunch"}]}
        url = detail_url(recipe.id)
        res = self.client.patch(url, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn(tag_lunch, recipe.tags.all())
        self.assertNotIn(tag_breakfast, recipe.tags.all())

    def test_clear_recipe_tags(self):
        """Test clearing a recipe tags."""
        tag = Tag.objects.create(name="Dessert")
        recipe = create_recipe(user=self.user)
        recipe.tags.add(tag)

        payload = {"tags": []}
        url = detail_url(recipe.id)
        res = self.client.patch(url, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(recipe.tags.count(), 0)

    def test_create_recipe_with_new_unit_ingredient(self):
        """Test creating a recipe with new units & ingredients."""
        payload = {
            "title": "Thai Curry",
            "time_minutes": 30,
            "price": Decimal("3"),
            "ingredients": [
                {
                    "amount": 10,
                    "unit": {"name": "gr"},
                    "ingredient": {"name": "Salt"}
                },
                {
                    "amount": 100,
                    "unit": {"name": "gr"},
                    "ingredient": {"name": "Curry"}
                }
            ]
        }

        res = self.client.post(RECIPES_URL, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        recipes = Recipe.objects.filter(user=self.user)
        self.assertEqual(recipes.count(), 1)
        recipe = recipes[0]
        self.assertEqual(recipe.ingredients.count(), 2)
        for ingredient in payload["ingredients"]:
            exists = recipe.ingredients.filter(
                unit__name=ingredient["unit"]["name"].lower(),
                ingredient__name=ingredient["ingredient"]["name"].lower(),
            ).exists()
            self.assertTrue(exists)

    def test_create_recipe_with_existing_unit_ingredient(self):
        """Test creating a recipe with existing unit & ingredient."""
        ingredient_salt = Ingredient.objects.create(name="Salt")
        unit_gr = Unit.objects.create(name="gr")
        rcp_ing = RecipeIngredient.objects.create(
            amount=10,
            unit=unit_gr,
            ingredient=ingredient_salt,
        )

        payload = {
            "title": "Thai Curry",
            "time_minutes": 60,
            "price": "2.55",
            "ingredients": [
                {
                    "amount": 10,
                    "unit": {"name": "gr"},
                    "ingredient": {"name": "Salt"}
                },
                {
                    "amount": 100,
                    "unit": {"name": "gr"},
                    "ingredient": {"name": "Curry"}
                }
            ]
        }

        res = self.client.post(RECIPES_URL, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        recipes = Recipe.objects.filter(user=self.user)
        self.assertEqual(recipes.count(), 1)
        recipe = recipes[0]
        self.assertEqual(recipe.ingredients.count(), 2)
        self.assertIn(rcp_ing, recipe.ingredients.all())
        for ingredient in payload["ingredients"]:
            exists = recipe.ingredients.filter(
                unit__name=ingredient["unit"]["name"].lower(),
                ingredient__name=ingredient["ingredient"]["name"].lower(),
            ).exists()
            self.assertTrue(exists)

    def test_create_unit_ingredient_on_update(self):
        """Test creating unit & ingredient when updating a recipe."""
        recipe = create_recipe(user=self.user)

        payload = {
            "ingredients": [
                {
                    "amount": 10,
                    "unit": {"name": "ml"},
                    "ingredient": {"name": "Limes"}
                }
            ]
        }
        url = detail_url(recipe.id)
        res = self.client.patch(url, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        new_rcp_ing = RecipeIngredient.objects.get(
            unit__name="ml",
            ingredient__name="limes",
        )
        self.assertIn(new_rcp_ing, recipe.ingredients.all())

    def test_update_recipe_assign_unit_ingredient(self):
        """Test assigning an existing unit & ingredient when updating a recipe."""
        ingredient_salt = Ingredient.objects.create(name="Salt")
        unit_gr = Unit.objects.create(name="gr")
        rcp_ing = RecipeIngredient.objects.create(
            amount=10,
            unit=unit_gr,
            ingredient=ingredient_salt,
        )
        recipe = create_recipe(user=self.user)
        recipe.ingredients.add(rcp_ing)

        ingredient_sugar = Ingredient.objects.create(name="Sugar")
        payload = {
            "ingredients": [
                {
                    "amount": 100,
                     "unit": {"name": "gr"},
                     "ingredient": {"name": "Sugar"}
                }
            ]
        }
        url = detail_url(recipe.id)
        res = self.client.patch(url, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        new_rcp_ing = RecipeIngredient.objects.get(
            amount=100,
            unit=unit_gr,
            ingredient=ingredient_sugar
        )
        self.assertIn(new_rcp_ing, recipe.ingredients.all())
        self.assertNotIn(rcp_ing, recipe.ingredients.all())

    def test_clear_recipe_ingredients(self):
        """Test clearing a recipe ingredients."""
        ingredient = Ingredient.objects.create(name="Salt")
        unit = Unit.objects.create(name="gr")
        rcp_ing = RecipeIngredient.objects.create(
            amount=10,
            unit=unit,
            ingredient=ingredient,
        )
        recipe = create_recipe(user=self.user)
        recipe.ingredients.add(rcp_ing)

        payload = {"ingredients": []}
        url = detail_url(recipe.id)
        res = self.client.patch(url, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(recipe.ingredients.count(), 0)

    def test_filter_by_tags(self):
        """Test filtering recipes by tags."""
        r1 = create_recipe(user=self.user, title="Thai Vegetable Curry")
        r2 = create_recipe(user=self.user, title="Aubergine with Tahini")
        tag1 = Tag.objects.create(name="Vegan")
        tag2 = Tag.objects.create(name="Vegetarian")
        r1.tags.add(tag1)
        r2.tags.add(tag2)
        r3 = create_recipe(user=self.user, title="Fish and chips")

        params = {"tags": f"{tag1.id},{tag2.id}"}
        res = self.client.get(RECIPES_URL, params)

        s1 = RecipeSerializer(r1)
        s2 = RecipeSerializer(r2)
        s3 = RecipeSerializer(r3)

        self.assertIn(s1.data, res.data)
        self.assertIn(s2.data, res.data)
        self.assertNotIn(s3.data, res.data)

    def test_filter_by_ingredients(self):
        """Test filtering recipes by ingredients."""
        r1 = create_recipe(user=self.user, title="Posh Beans on Toast")
        r2 = create_recipe(user=self.user, title="Chicken Soup")
        r3 = create_recipe(user=self.user, title="Red Lentil Dal")
        in1 = Ingredient.objects.create(name="Feta Cheese")
        in2 = Ingredient.objects.create(name="Chicken")
        unit = Unit.objects.create(name="gr")
        rcp_ing1 = RecipeIngredient.objects.create(
            amount=10,
            unit=unit,
            ingredient=in1,
        )
        rcp_ing2 = RecipeIngredient.objects.create(
            amount=10,
            unit=unit,
            ingredient=in2,
        )
        r1.ingredients.add(rcp_ing1)
        r2.ingredients.add(rcp_ing2)

        params = {"ingredients": f"{in1.id},{in2.id}"}
        res = self.client.get(RECIPES_URL, params)

        s1 = RecipeSerializer(r1)
        s2 = RecipeSerializer(r2)
        s3 = RecipeSerializer(r3)

        self.assertIn(s1.data, res.data)
        self.assertIn(s2.data, res.data)
        self.assertNotIn(s3.data, res.data)


class ImageUploadTests(TestCase):
    """Test for the image upload API."""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            "user@example.com",
            "pass1234",
        )
        self.client.force_authenticate(self.user)
        self.recipe = create_recipe(user=self.user)

    def tearDown(self):
        self.recipe.image.delete()

    def test_upload_image(self):
        """Test uploading an image to a recipe."""
        url = image_upload_url(self.recipe.id)
        with tempfile.NamedTemporaryFile(suffix=".jpg") as image_file:
            img = Image.new("RGB", (10, 10))
            img.save(image_file, format="JPEG")
            image_file.seek(0)
            payload = {"image": image_file}
            res = self.client.post(url, payload, format="multipart")

        self.recipe.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("image", res.data)
        self.assertTrue(os.path.exists(self.recipe.image.path))

    def test_upload_image_bad_request(self):
        """Test uploading an invalid image."""
        url = image_upload_url(self.recipe.id)
        payload = {"image": "not_an_image"}
        res = self.client.post(url, payload, format="multipart")

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
