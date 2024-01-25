"""
URL mapping for the recipe app.
"""
from django.urls import (
    path,
    include
)

from rest_framework.routers import DefaultRouter

from recipe import views

router = DefaultRouter()
router.register("recipes", views.RecipeViewSet)
router.register("tags", views.TagViewSet)
router.register("ingredients", views.IngredientViewSet)
router.register("unit", views.UnitViewSet)

app_name = "recipe"

urlpatterns = [
    path("", include(router.urls)),
    path("like", views.RecipeLikeView.as_view(), name="like")
]
