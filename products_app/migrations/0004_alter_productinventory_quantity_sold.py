# Generated by Django 4.2.2 on 2023-11-05 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products_app', '0003_alter_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productinventory',
            name='quantity_sold',
            field=models.IntegerField(default=0),
        ),
    ]
