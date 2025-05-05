import csv
from django.core.management.base import BaseCommand
from products.models import Product

class Command(BaseCommand):
    help = 'Load products from product_data.csv'

    def handle(self, *args, **kwargs):
        with open('product_data.csv', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Product.objects.update_or_create(
                    id=row['product_id'],
                    defaults={
                        'name': row['name'],
                        'description': row['description'],
                        'cost_price': row['cost_price'],
                        'selling_price': row['selling_price'],
                        'category': row['category'],
                        'stock_available': row['stock_available'],
                        'units_sold': row['units_sold'],
                        'demand_forecast': row.get('demand_forecast', 0),
                        'optimized_price': row.get('optimized_price') or None,
                    }
                )
        self.stdout.write(self.style.SUCCESS('✅ Products loaded successfully'))