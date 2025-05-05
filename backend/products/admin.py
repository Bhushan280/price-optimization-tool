from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Product

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = UserAdmin.fieldsets + (
        ('Additional fields', {
            'fields': ('role','is_verified',),
        }),
    )
    list_display = ('username','email','role','is_verified','is_staff')
    list_filter = ('role','is_verified','is_staff','is_superuser')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id','name','category','cost_price','selling_price',
        'stock_available','units_sold','customer_rating',
        'demand_forecast','optimized_price'
    )
    list_filter = ('category',)
    search_fields = ('name','category')
