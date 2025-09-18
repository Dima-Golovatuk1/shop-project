from django.urls import path

from .views import *

urlpatterns = [
    path('<int:product_id>/', product, name='products'),
    path('buy/<int:id_>/', buy_product, name='buy_product'),
]
