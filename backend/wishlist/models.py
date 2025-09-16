from django.db import models

from products.models import Product
from backend.settings import AUTH_USER_MODEL

# Create your models here.


class Wishlist(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    user_id = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    