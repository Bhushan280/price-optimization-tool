# Generated by Django 5.2 on 2025-05-03 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_product_alter_customuser_groups_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='customer_rating',
            field=models.FloatField(blank=True, default=0.0, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='demand_forecast',
            field=models.IntegerField(default=0),
        ),
    ]
