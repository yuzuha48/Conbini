from django.db import models

CATEGORY_CHOICES = [
    ('food', 'Food'), 
    ('drink', 'Drink'), 
    ('snack', 'Snack'), 
]

class ProductManager(models.Manager):
    def basic_validator(self, postData, fileData):
        errors = {}

        if len(postData['product_name']) < 2:
            errors['product_name'] = 'Product name must be at least 2 characters.'
        if float(postData['price']) < 0:
            errors['price'] = 'Please enter a valid price.'
        if len(postData['desc']) < 5:
            errors['desc'] = 'Description must be at least 5 characters.'
        if postData['category'] == "none":
            errors['category'] = 'Please choose a category.'
        if int(postData['inventory_count']) < 0:
            errors['inventory_count'] = 'Please enter a valid inventory count.'
        if not fileData['images']:
            errors['images'] = 'Please upload an image.'
        if not postData['main_image']:
            errors['main_image'] = 'Please select a main image.'

        return errors
    
    def edit_validator(self, postData):
        errors = {}

        if len(postData['product_name']) < 2:
            errors['product_name'] = 'Product name must be at least 2 characters.'
        if float(postData['price']) < 0:
            errors['price'] = 'Please enter a valid price.'
        if len(postData['desc']) < 5:
            errors['desc'] = 'Description must be at least 5 characters.'
        if postData['category'] == "none":
            errors['category'] = 'Please choose a category.'
        if int(postData['inventory_count']) < 0:
            errors['inventory_count'] = 'Please enter a valid inventory count.'
        if not postData['main_image']:
            errors['main_image'] = 'Please select a main image.'

        return errors
    

class Product(models.Model):
    product_name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    desc = models.TextField()
    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = ProductManager()


class Image(models.Model):
    image = models.ImageField()
    main = models.BooleanField()
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ProductInventory(models.Model):
    inventory_count = models.IntegerField()
    quantity_sold = models.IntegerField(null=True, blank=True, default=0)
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
