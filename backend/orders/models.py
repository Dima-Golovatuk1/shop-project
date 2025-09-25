from django.db import models
from django.utils.timezone import now

from products.models import Product
from backend.settings import AUTH_USER_MODEL

import time


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Очікує підтвердження" 
        CONFIRMED = "CONFIRMED", "Підтверджене"     
        PROCESSING = "PROCESSING", "Обробляється"   
        SHIPPED = "SHIPPED", "Відправлено"           
        DELIVERED = "DELIVERED", "Доставлено"       
        CANCELED = "CANCELED", "Скасоване"           
        RETURNED = "RETURNED", "Повернення" 

    class PaymentMethod(models.TextChoices):
        CASH_ON_DELIVERY = "CASH_ON_DELIVERY", "Готівка при отриманні"
        CARD_ONLINE = "CARD_ONLINE", "Банківська карта онлайн"
        CARD_ON_DELIVERY = "CARD_ON_DELIVERY", "Карта при отриманні"

    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    session_key = models.TextField(null=True)
    first_name = models.TextField()
    last_name = models.TextField()
    middle_name = models.TextField()
    tracking_number = models.CharField(max_length=50, unique=True, blank=True)
    status = models.CharField(max_length=15, choices=Status, default=Status.PENDING)
    total_price = models.PositiveIntegerField()
    phone_number = models.CharField(max_length=15, blank=True)
    payment_method = models.CharField(max_length=30, choices=PaymentMethod, default=PaymentMethod.CASH_ON_DELIVERY)
    shipping_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.tracking_number:
            self.tracking_number = f"TRACK-{int(time.time())}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} - {self.tracking_number}: {self.status}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order}: {self.product}"
    