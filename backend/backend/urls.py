from django.contrib import admin
from django.urls import path, include



urlpatterns = [
    path('admin/', admin.site.urls),
    path('shop/', include("shop.urls")),
    path('user/', include('users.urls')),
    path('orders/', include('orders.urls')),
    path('payments/', include('payments.urls')),
    path('products/', include('products.urls')),
    path('cart/', include('cart.urls')),
]
