from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path("register/", views.register_user),
    path('login/', views.login_user),
    path('logout/', views.logout_user),
    path("api/check-auth/", views.check_auth),
    path('profile/', views.profile)
]
