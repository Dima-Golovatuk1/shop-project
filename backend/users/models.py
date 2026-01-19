from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager



class MyUserManager(BaseUserManager):
    def create_user(self, username: str, email: str, phone_number: str, password: str, is_seller: bool = False):
        try:
            email = self.normalize_email(email)
            user = self.model(
                username=username,
                email=email,
                phone_number=phone_number,
                is_seller=is_seller
            )
            
            user.set_password(password)
            user.save(using=self._db)
        
        except Exception as e:
            raise e
        
        return user

    def create_superuser(self, username: str, email: str, password: str):
        user = self.create_user(
            username=username,
            email=email,
            password=password,
            phone_number=False,
            is_seller=False
        )
        
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        
        return user


class MyUser(AbstractUser):
    is_seller = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)

    objects = MyUserManager()
