from django.db import models
from django.contrib.auth.models import AbstractUser


# class User(AbstractUser):
#     email = models.EmailField(unique=True, null=True, blank=True)
#     age = models.IntegerField(null=True, blank=True)
#     phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)

#     is_verified = models.BooleanField(default=False)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

#     def __str__(self):
#         return self.username
