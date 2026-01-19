from django.contrib import admin
from django.utils.html import format_html

from .models import Product, Category, SubCategory 

# Register your models here.


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_code', 'title', 'category_id',
                    'subcategory_id', 'seller_id', 'stock_quantity',
                    'characteristics', 'price', 'get_photo', 'is_active', 'created_at')
    
    list_filter = ('is_active', 'category_id', 'subcategory_id')
    ordering = ('-created_at',)

    def get_photo(self, obj):
        return format_html(f'<img src="{obj.photo_url.url}" alt="" style="width: 100px; height: 100px;">')
    

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')

    ordering = ('-created_at',)


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'parent_id', 'created_at')

    ordering = ('-created_at',)
    