from dataclasses import field
from rest_framework import serializers
from .models import Product
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser, Product

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'role')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'buyer')
        )
        return user
        
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