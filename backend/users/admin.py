from django.contrib import admin
from .models import MyUser 

@admin.register(MyUser)
class MyUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'phone_number', 'is_seller', 'is_staff', 'is_superuser')