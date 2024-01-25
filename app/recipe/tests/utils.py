"""
Utility functions for tests.
"""
from decimal import Decimal

from django.contrib.auth import get_user_model

from core.models import Recipe


def create_recipe(user, **params):
    """Create and return a sample recipe."""
    defaults = {
        "title": "Sample recipe title",
        "time_minutes": 30,
        "price": Decimal("2.99"),
        "description": "Sample description.",
        "link": "http://example.com/recipes",
        "procedures": "1. Bla bla bla...",
    }
    defaults.update(params)

    recipe = Recipe.objects.create(user=user, **defaults)
    return recipe


def create_user(**params):
    """Create and return a new user."""
    return get_user_model().objects.create_user(**params)
