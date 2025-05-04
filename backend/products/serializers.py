from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {
            'name': {'required': True},
            'category': {'required': True},
            'cost_price': {'required': True}
        }

class PriceOptimizationSerializer(serializers.Serializer):
    selling_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    demand_forecast = serializers.IntegerField()


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {
            'customer_rating': {'required': False},
            'demand_forecast': {'required': False},
            'optimized_price': {'required': False}
        }