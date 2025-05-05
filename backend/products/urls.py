from django.urls import path
from .views import (
    UserRegistrationAPI, UserLoginAPI,
    ProductListAPI, ProductCreateAPI, ProductUpdateAPI,
    DemandForecastAPI, PriceOptimizationAPI
)

urlpatterns = [
    path('api/register/',      UserRegistrationAPI.as_view(),   name='user-register'),
    path('api/login/',         UserLoginAPI.as_view(),          name='user-login'),
    path('api/products/',      ProductListAPI.as_view(),        name='product-list'),
    path('api/products/create/', ProductCreateAPI.as_view(),     name='product-create'),
    path('api/products/<int:pk>/', ProductUpdateAPI.as_view(),   name='product-update'),
    path('api/demand-forecast/<int:product_id>/', DemandForecastAPI.as_view(), name='demand-forecast'),
    path('api/optimize-prices/', PriceOptimizationAPI.as_view(), name='optimize-prices'),
]
