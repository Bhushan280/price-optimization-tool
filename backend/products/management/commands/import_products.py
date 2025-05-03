import csv
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from decimal import Decimal
from products.models import Product

class Command(BaseCommand):
    help = 'Import products from product_data.csv'

    def handle(self, *args, **options):
        csv_path = os.path.join(settings.BASE_DIR, 'product_data.csv')
        
        with open(csv_path, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                Product.objects.create(
                    name=row['name'],
                    description=row['description'],
                    cost_price=Decimal(row['cost_price']),
                    selling_price=Decimal(row['selling_price']),
                    category=row['category'],
                    stock_available=int(row['stock_available']),
                    units_sold=int(row['units_sold']),
                    customer_rating=float(row['customer_rating']),
                    demand_forecast=int(row['demand_forecast']),
                    optimized_price=Decimal(row['optimized_price']) if row['optimized_price'] else None
                )
        self.stdout.write(self.style.SUCCESS(f'Imported {Product.objects.count()} products'))