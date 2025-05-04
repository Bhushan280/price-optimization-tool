from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLES = (
        ('admin', 'Admin'),
        ('buyer', 'Buyer'),
        ('supplier', 'Supplier'),
    )
    role = models.CharField(max_length=10, choices=ROLES, default='buyer')
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',
        blank=True,
    )

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    stock_available = models.IntegerField()
    units_sold = models.IntegerField()
    customer_rating = models.FloatField(null=True, blank=True, default=0.0)
    demand_forecast = models.IntegerField(default=0)
    optimized_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True
    )
    def __str__(self):
        return self.name