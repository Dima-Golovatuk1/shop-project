from django.urls import path

from . import views

urlpatterns = [
    path('', views.orders),
    path('thanks/', views.thanks_for_order)
]