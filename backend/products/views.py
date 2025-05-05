# products/views.py
from django.contrib.auth import authenticate
from rest_framework import status, permissions, generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.db.models import Q

import numpy as np
from sklearn.linear_model import LinearRegression

from .models import Product, CustomUser
from .serializers import ProductSerializer, UserSerializer
from .forms import ProductForm


# -------------------------------------------------------------------
# HTML Views (optional; for server-rendered pages)
# -------------------------------------------------------------------

class ProductListView(ListView):
    model = Product
    template_name = 'products/product_list.html'
    context_object_name = 'products'

    def get_queryset(self):
        qs = super().get_queryset()
        q = self.request.GET.get('search', '')
        cat = self.request.GET.get('category', '')
        if q:
            qs = qs.filter(Q(name__icontains=q))
        if cat:
            qs = qs.filter(category=cat)
        return qs

    def get_context_data(self, **kw):
        ctx = super().get_context_data(**kw)
        ctx['categories'] = Product.objects.values_list('category', flat=True).distinct()
        return ctx

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


# -------------------------------------------------------------------
# REST API Views
# -------------------------------------------------------------------

class UserRegistrationAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'user': serializer.data,
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Allow login via username or email
        identifier = request.data.get('username') or request.data.get('email')
        password   = request.data.get('password')
        user = authenticate(username=identifier, password=password)
        if not user:
            try:
                user_obj = CustomUser.objects.get(email=identifier)
                user = authenticate(username=user_obj.username, password=password)
            except CustomUser.DoesNotExist:
                user = None

        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role
            }
        }, status=status.HTTP_200_OK)


class ProductListAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductCreateAPI(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductUpdateAPI(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class DemandForecastAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, product_id):
        product = Product.objects.get(id=product_id)
        # simple linear model
        xs = np.array([product.cost_price, product.selling_price]).reshape(-1, 1)
        ys = np.array([product.demand_forecast * 0.8, product.demand_forecast])
        model = LinearRegression().fit(xs, ys)
        price_range = np.linspace(
            float(product.cost_price),
            float(product.selling_price) * 1.5,
            10
        )
        forecast = model.predict(price_range.reshape(-1, 1))
        return Response({
            'prices': price_range.tolist(),
            'demand': forecast.tolist(),
            'current_price': float(product.selling_price),
            'optimized_price': (float(product.optimized_price)
                                if product.optimized_price else None)
        })


class PriceOptimizationAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        products = Product.objects.all()
        for p in products:
            p.optimized_price = max(
                p.cost_price * 1.20,
                p.selling_price * 0.95
            )
            p.save()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
