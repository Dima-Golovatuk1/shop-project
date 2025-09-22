from django.urls import path

from . import views

urlpatterns = [
    path('', views.cart),
    path('api/add/', views.cart_items),
    path('api/remove/', views.cart_item_delete),
    path('api/update_add/', views.cart_item_adding),
    path('api/update_remove/', views.cart_item_removing),
    path('api/buy/', views.cart_buy)
]