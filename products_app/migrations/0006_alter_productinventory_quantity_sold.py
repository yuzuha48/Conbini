# Generated by Django 4.2.2 on 2023-11-05 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products_app', '0005_alter_productinventory_quantity_sold'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productinventory',
            name='quantity_sold',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]