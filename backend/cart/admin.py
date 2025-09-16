from django.contrib import admin

from .models import CartItem, Carts

# Register your models here.


@admin.register(Carts)
class CartsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id')



@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_id', 'quantity', 'price', 'created_at')

    ordering = ('-created_at',)