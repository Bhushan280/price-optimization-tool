import csv
from django.core.management.base import BaseCommand
from products.models import Product

class Command(BaseCommand):
    help = 'Imports products from CSV'

    def handle(self, *args, **options):
        with open('product_data.csv') as f:
            reader = csv.DictReader(f)
            for row in reader:
                Product.objects.create(
                    name=row['name'],
                    description=row['description'],
                    cost_price=float(row['cost_price']),
                    selling_price=float(row['selling_price']),
                    category=row['category'],
                    stock_available=int(row['stock_available']),
                    units_sold=int(row['units_sold']),
                    customer_rating=float(row['customer_rating']),
                    demand_forecast=int(row['demand_forecast']),
                    optimized_price=float(row['optimized_price'])
                )
        self.stdout.write(self.style.SUCCESS('Successfully imported products'))