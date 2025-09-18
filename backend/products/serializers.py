from rest_framework import serializers
<<<<<<< HEAD
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
=======
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .models import Product
from cart.models import Carts, CartItem


class SingleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
>>>>>>> 0e9ce5af28b256e48b9bc8d77af266e80f41dd27
