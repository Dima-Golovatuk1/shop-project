from django.urls import path

from .views import *

urlpatterns = [
    path('api/', get_all_products, name='products'),
    path('<int:product_id>/', product, name='product'),
    path('buy/<int:product_id>/', buy_product, name='buy_product'),
]
