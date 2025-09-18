from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .models import Product
from cart.models import Carts, CartItem

class SingleProduct(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ("__all__")


    # def get_product(self, product_id):
    #     product = Product.objects.get(product_id)
    #     return product


