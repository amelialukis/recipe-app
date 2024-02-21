from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class RecipePagination(PageNumberPagination):
    page_size = 25

    def get_paginated_response(self, data):
        return Response({
            "next":
                self.page.next_page_number()
                if self.page.has_next()
                else None,
            "previous":
                self.page.previous_page_number()
                if self.page.has_previous()
                else None,
            "results": data,
        })
