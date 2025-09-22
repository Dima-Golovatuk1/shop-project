from rest_framework import serializers

from .models import CartItem


class CartItemsSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source="product.title", read_only=True)
    product_photo_url = serializers.ImageField(source="product.photo_url")

    class Meta:
        model = CartItem
        fields = ["id", "quantity", "product_title", "product_photo_url"]
