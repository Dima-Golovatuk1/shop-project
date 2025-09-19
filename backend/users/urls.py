from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path("api/check-auth/", views.check_auth, name="check-auth"),
    path("register/", views.register_user, name="register"),
    path('login/', views.login_user, name='login'),
]
