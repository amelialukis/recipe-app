"""
Tests for the units APIs.
"""

from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Unit

from recipe.serializers import UnitSerializer


UNITS_URL = reverse("recipe:unit-list")


def detail_url(unit_id):
    """Create and return a unit detail URL."""
    return reverse("recipe:unit-detail", args=[unit_id])


def create_user(email="user@example.com", password="pass1234"):
    """Create and return user."""
    return get_user_model().objects.create_user(email=email, password=password)


class PublicUnitsApiTests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test auth is required for retrieving units."""
        res = self.client.get(UNITS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUnitsApiTests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.user = create_user()
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_units(self):
        """Test retrieving a list of units."""
        Unit.objects.create(name="gr")
        Unit.objects.create(name="ml")

        res = self.client.get(UNITS_URL)

        units = Unit.objects.all()
        serializer = UnitSerializer(units, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_update_unit(self):
        """Test updating an unit."""
        unit = Unit.objects.create(name="kg")

        payload = {"name": "gr"}
        url = detail_url(unit.id)
        res = self.client.patch(url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        unit.refresh_from_db()
        self.assertEqual(unit.name, payload["name"])

    def test_delete_unit(self):
        """Test deleting an unit."""
        unit = Unit.objects.create(name="kg")

        url = detail_url(unit.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        units = Unit.objects.all()
        self.assertFalse(units.exists())
