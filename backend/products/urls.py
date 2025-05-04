from django.urls import path
from .views import (
    ProductListAPI,
    DemandForecastAPI,
    PriceOptimizationAPI,
    ProductCreateAPI,
    ProductUpdateAPI,
)

urlpatterns = [
    path('api/products/', ProductListAPI.as_view()),
    path('api/demand-forecast/<int:product_id>/', DemandForecastAPI.as_view(), name='demand-forecast'),
    path('api/optimize-prices/', PriceOptimizationAPI.as_view()),
    path('api/products/create/', ProductCreateAPI.as_view(), name='product-create'),
    path('api/products/<int:pk>/', ProductUpdateAPI.as_view(), name='product-update'),
]