from django.db import models

from products.models import Product
from backend.settings import AUTH_USER_MODEL

# Create your models here.


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

    user_id = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=15, choices=Status, default=Status.PENDING)
    total_price = models.PositiveIntegerField()
    payment_method = models.CharField(max_length=30, choices=PaymentMethod, default=PaymentMethod.CASH_ON_DELIVERY)
    shipping_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderItem(models.Model):
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
