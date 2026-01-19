from django.contrib import admin

from .models import CartItem, Carts

# Register your models here.


@admin.register(Carts)
class CartsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'session_key')


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'quantity', 'price')
