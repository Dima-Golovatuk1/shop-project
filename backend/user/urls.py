from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path("api/register/", views.register_user, name="register"),
    path('api/login/', views.login_user, name='login'),
    path('profile/')
]
