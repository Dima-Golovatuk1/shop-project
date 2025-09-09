from django.contrib.postgres.indexes import GinIndex
from django.utils.text import slugify
from django.utils.timezone import now
from django.db import models

# Create your models here.


class Seller(models.Model):
    title = models.CharField(max_length=75)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    characteristics = models.JSONField()
    price = models.PositiveIntegerField()
    photo_url = models.ImageField(upload_to="catalog")
    product_code = models.PositiveIntegerField()
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            GinIndex(fields=["characteristics"], name="product_characteristics_idx")
        ]

    def publish(self, *args, **kwargs):
        if not self.slug:
            time_ = now().strftime("%Y%m%d%H%M%S")
            self.slug = f"{slugify(self.title)}-{time_}"
        self.save(*args, **kwargs)

    def __str__(self):
        return f"{self.title}"
    