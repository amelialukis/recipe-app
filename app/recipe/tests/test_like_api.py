"""
Tests for the like APIs.
"""

from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import RecipeLike

from recipe.serializers import RecipeDetailSerializer
from recipe.tests.utils import create_recipe, create_user


LIKES_URL = reverse("recipe:like")


def recipe_detail_url(recipe_id):
    """Create and return a recipe detail URL."""
    return reverse("recipe:recipe-detail", args=[recipe_id])


class PublicUnitsApiTests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test auth is required for retrieving units."""
        res = self.client.post(LIKES_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateIngredientsApiTests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.user = create_user(
            email="test@example.com",
            password="test1234"
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)
        self.recipe = create_recipe(self.user)

    def test_like_unlike_recipe(self):
        """Test like and unlike a recipe."""
        # like a recipe
        self.client.post(
            LIKES_URL,
            data={"recipe_id": self.recipe.id},
        )
        res = self.client.get(recipe_detail_url(self.recipe.id))
        self.assertEqual(res.data.get("likes", 0), 1)
        self.assertEqual(res.data["liked"], True)

        # unlike a recipe
        self.client.post(
            LIKES_URL,
            data={"recipe_id": self.recipe.id},
        )
        res = self.client.get(recipe_detail_url(self.recipe.id))
        self.assertEqual(res.data.get("likes", 0), 0)
        self.assertEqual(res.data["liked"], False)
        self.assertEqual(RecipeLike.objects.all().count(), 1)

        # like a recipe after unliking
        self.client.post(
            LIKES_URL,
            data={"recipe_id": self.recipe.id},
        )
        res = self.client.get(recipe_detail_url(self.recipe.id))
        self.assertEqual(res.data.get("likes", 0), 1)
        self.assertEqual(res.data["liked"], True)
        self.assertEqual(RecipeLike.objects.all().count(), 1)

    def test_total_likes(self):
        for i in range(3):
            user = create_user(
                email=f"test{i}@example.com",
                password=f"test{i}1234"
            )
            client = APIClient()
            client.force_authenticate(user=user)
            client.post(
                LIKES_URL,
                data={"recipe_id": self.recipe.id},
            )

        serializer = RecipeDetailSerializer(self.recipe)
        self.assertEqual(serializer.data.get("likes", 0), 3)
