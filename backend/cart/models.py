from django.db import models

from products.models import Product
from backend.settings import AUTH_USER_MODEL


# Create your models here.


class Carts(models.Model):
    user_id = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_id}'s cart"


class CartItem(models.Model):
    cart_id = models.ForeignKey(Carts, on_delete=models.CASCADE, null=True)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    quantity = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.cart_id}"
