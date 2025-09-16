from django.contrib import admin

from .models import Order, OrderItem

# Register your models here.


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'status', 'total_price', 
                    'payment_method', 'shipping_address', 'created_at', 'updated_at')
    
    list_filter = ('status',)
    
    ordering = ('-created_at',)