from django.contrib import admin

from .models import Order, OrderItem

# Register your models here.


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'tracking_number', 'phone_number', 'first_name', 'last_name', 'total_price', 
                    'payment_method', 'shipping_address', 'status', 'created_at', 'updated_at')
    
    list_filter = ('status',)
    
    ordering = ('-created_at',)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity', 'price', 'created_at')

    list_filter = ('order',)
    