from django.contrib import admin

from .models import Wishlist

# Register your models here.


@admin.register(Wishlist)
class WishlstAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'product_id', 'created_at')

    ordering = ('-created_at',)
    