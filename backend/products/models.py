from django.contrib.postgres.indexes import GinIndex
from django.utils.text import slugify
from django.utils.timezone import now
from django.db import models

from backend.settings import AUTH_USER_MODEL


# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"


class SubCategory(models.Model):
    parent = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"
    

class Product(models.Model):
    product_code = models.PositiveIntegerField(unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE, null=True)
    seller = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    characteristics = models.JSONField(default=dict, blank=True)
    price = models.PositiveIntegerField()
    photo_url = models.ImageField(upload_to="catalog")
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            GinIndex(fields=["characteristics"], name="product_characteristics_idx")
        ]

    def __str__(self):
        return f"{self.title}"
