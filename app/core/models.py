"""
Database models.
"""
import uuid
import os

from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.db.models.functions import Lower


def recipe_image_file_path(instance, filename):
    """Generate file path for new recipe image."""
    ext = os.path.splitext(filename)[1]
    filename = f"{uuid.uuid4()}{ext}"

    return os.path.join("uploads", "recipe", filename)


class UserManager(BaseUserManager):
    """Manager for user."""

    def create_user(self, email, password=None, **extra_field):
        """Create, save and return a new user."""
        if not email:
            raise ValueError("User must have an email address.")
        user = self.model(email=self.normalize_email(email), **extra_field)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None):
        """Create and return a new superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system."""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"


class Recipe(models.Model):
    """Recipe object."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    time_minutes = models.IntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.0)])
    link = models.CharField(max_length=255, blank=True)
    tags = models.ManyToManyField("Tag")
    ingredients = models.ManyToManyField("RecipeIngredient")
    image = models.ImageField(null=True, upload_to=recipe_image_file_path)
    private = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class BaseRecipeAttrModel(models.Model):
    """Base model for recipe attribute."""
    name = models.CharField(max_length=255)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(BaseRecipeAttrModel, self).save(*args, **kwargs)


class Tag(BaseRecipeAttrModel):
    """Tag for filtering recipes."""

class Unit(BaseRecipeAttrModel):
    """Unit for recipe ingredient."""

class Ingredient(BaseRecipeAttrModel):
    """List of ingredients."""

class RecipeIngredient(models.Model):
    """Ingredient for recipes."""
    amount = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.0)])
    unit = models.ForeignKey("Unit", on_delete=models.CASCADE)
    ingredient = models.ForeignKey("Ingredient", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.amount} {self.unit} {self.ingredient}"
