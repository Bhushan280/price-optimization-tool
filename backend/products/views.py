from django.shortcuts import render
# Create your views here.
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Product
from .forms import ProductForm
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
import numpy as np
from sklearn.linear_model import LinearRegression
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer


class DemandForecastAPI(APIView):
    def get(self, request, product_id):
        product = Product.objects.get(id=product_id)
        
        # Mock linear regression model (replace with actual model)
        prices = np.array([product.cost_price, product.selling_price]).reshape(-1, 1)
        demand = np.array([product.demand_forecast * 0.8, product.demand_forecast])
        
        model = LinearRegression()
        model.fit(prices, demand)
        
        # Generate prediction points
        price_range = np.linspace(float(product.cost_price), float(product.selling_price)*1.5, 10)
        forecast = model.predict(price_range.reshape(-1, 1))
        
        data = {
            "prices": price_range.tolist(),
            "demand": forecast.tolist(),
            "current_price": float(product.selling_price),
            "optimized_price": float(product.optimized_price) if product.optimized_price else None
        }
        return Response(data)

class PriceOptimizationAPI(APIView):
    def post(self, request):
        products = Product.objects.all()
        # Simple optimization logic (replace with actual algorithm)
        for product in products:
            # Example: Set optimized price as cost + 20% margin
            product.optimized_price = product.cost_price * 1.20
            product.save()
        
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductListView(ListView):
    model = Product
    template_name = 'products/product_list.html'
    context_object_name = 'products'

    def get_queryset(self):
        query = self.request.GET.get('search')
        category = self.request.GET.get('category')
        queryset = super().get_queryset()
        
        if query:
            queryset = queryset.filter(Q(name__icontains=query))
        if category:
            queryset = queryset.filter(category=category)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Product.objects.values_list('category', flat=True).distinct()
        return context

class ProductCreateView(CreateView):
    model = Product
    form_class = ProductForm
    template_name = 'products/product_form.html'
    success_url = reverse_lazy('product_list')

class ProductUpdateView(UpdateView):
    model = Product
    form_class = ProductForm
    template_name = 'products/product_form.html'
    success_url = reverse_lazy('product_list')

class ProductDeleteView(DeleteView):
    model = Product
    template_name = 'products/product_confirm_delete.html'
    success_url = reverse_lazy('product_list')

class ProductListAPI(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductCreateAPI(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductUpdateAPI(generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer