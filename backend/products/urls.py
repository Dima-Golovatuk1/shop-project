from django.urls import path

from .views import *

urlpatterns = [
    path('api/', get_all_products, name='products'),
    path('<int:product_id>/', product, name='product'),
    path('buy/<int:id_>/', buy_product, name='buy_product'),
]
