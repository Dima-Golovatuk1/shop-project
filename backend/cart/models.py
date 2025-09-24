from django.db import models

from products.models import Product
from backend.settings import AUTH_USER_MODEL


# Create your models here.


class Carts(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.user or self.session_key}'s cart"


class CartItem(models.Model):
    cart = models.ForeignKey(Carts, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.cart}"
