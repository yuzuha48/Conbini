import datetime
from django.db import models
from products_app.models import Product

ORDER_STATUS_CHOICES = [
    ('order_in_process', 'Order in Process'), 
    ('shipped', 'Shipped'), 
    ('delivered', 'Delivered'), 
    ('canceled', 'Canceled')
]


class AddressManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}

        if len(postData['first_name']) < 2:
            errors['first_name'] = 'First name must be at least 2 characters.'
        if len(postData['last_name']) < 2:
            errors['last_name'] = 'Last name must be at least 2 characters.'
        if len(postData['address']) < 5:
            errors['address'] = 'Address must be at least 5 characters.'
        if len(postData['city']) < 3:
            errors['city'] = 'City must be at least 3 characters.'
        if len(postData['state']) != 2:
            errors['state'] = "Please enter your state's 2 letter abbreviation."
        if len(postData['zipcode']) < 5:
            errors['zipcode'] = "Zipcode must have at least 5 numbers."
        if len(postData['zipcode']) > 10:
            errors['zipcode'] = "Zipcode must be less than 10 numbers."

        return errors


class ShippingAddress(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    shipping_address = models.CharField(max_length=255)
    shipping_address2 = models.CharField(max_length=255, null=True)
    shipping_city = models.CharField(max_length=255)
    shipping_state = models.CharField(max_length=2)
    shipping_zipcode = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = AddressManager()


class BillingAddress(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    billing_address = models.CharField(max_length=255)
    billing_address2 = models.CharField(max_length=255, null=True)
    billing_city = models.CharField(max_length=255)
    billing_state = models.CharField(max_length=2)
    billing_zipcode = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = AddressManager()


class PaymentManager(models.Manager):

    def basic_validator(self, postData):
        current_date = datetime.date.today()
        current_month = current_date.month
        current_year = current_date.year
        exp_month_year = postData['expiration_date'].split('-')

        errors = {}

        if len(postData['card_number']) < 13:
            errors['card_number'] = 'Card number must be at least 13 numbers.'
        if len(postData['card_number']) > 16:
            errors['card_number'] = 'Card number must be less than 16 numbers.'
        if not postData['expiration_date']:
            errors['expiration_date'] = 'Please enter an expiration date.'
        if int(exp_month_year[0]) < int(current_year):
            errors['expiration_date'] = 'Please use a card that has not yet expired.'
        if int(exp_month_year[0]) == int(current_year) and int(exp_month_year[1]) < int(current_month):
            errors['expiration_date'] = 'Please use a card that has not yet expired.'
        if len(postData['cvv']) != 3 and len(postData['cvv']) != 4:
            errors['cvv'] = 'CVV must be 3 or 4 numbers.'
        
        return errors


class Payment(models.Model):
    card_number = models.CharField(max_length=16)
    expiration_date = models.DateField()
    cvv = models.CharField(max_length=4)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = PaymentManager()


class Order(models.Model):
    shipping_address = models.ForeignKey(ShippingAddress, related_name="orders", on_delete=models.CASCADE)
    billing_address = models.ForeignKey(BillingAddress, related_name="orders", on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, related_name="orders", on_delete=models.CASCADE)
    order_total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default="order_in_process")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_items', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)