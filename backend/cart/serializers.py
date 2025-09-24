from rest_framework import serializers

from .models import CartItem


class CartItemsSerializer(serializers.ModelSerializer):
    product_id = serializers.ReadOnlyField(source='product.id')
    product_title = serializers.CharField(source="product.title", read_only=True)
    product_photo_url = serializers.ImageField(source="product.photo_url")
    product_price = serializers.IntegerField(source="product.price", read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "quantity", "product_id", "product_title", "product_photo_url", "product_price"]
