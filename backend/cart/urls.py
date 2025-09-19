from django.urls import path

from . import views

urlpatterns = [
    path('', views.cart),
    path('api/add/<int:product_id>/', views.cart_items),
    path('api/remove/<int:product_id>/', views.cart_item_delete),
    path('api/update_add/<int:product_id>/', views.cart_item_adding),
    path('api/update_remove/<int:product_id>/', views.cart_item_removing),
    path('api/buy/')
]