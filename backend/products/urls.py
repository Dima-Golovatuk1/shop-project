from django.urls import path

from .views import *

urlpatterns = [
    path('<int:id_>/', product, name='products'),
    # path('buy/<int:id_>/', buy_product, name='buy_product'),
]
