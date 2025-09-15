from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register"),
    path('login/', views.login_user, name='login'),
]
