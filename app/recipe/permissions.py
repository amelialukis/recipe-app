from rest_framework import permissions


class RecipePermission(permissions.BasePermission):
    """Permission for recipe views."""

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if view.action == "retrieve":
            return not obj.private or obj.user == request.user
        else:
            return obj.user == request.user
