import re
from django.shortcuts import render
from django.http import JsonResponse
from products_app.models import Product, ProductInventory
from .models import ShippingAddress, BillingAddress, Payment, Order, OrderItem


def save_shipping(request):
    if request.POST:
        errors = ShippingAddress.objects.basic_validator(request.POST)
        if len(errors) > 0:
            return JsonResponse({'success': False, 'shipping': True, 'error_messages': errors})
        else:
            shipping_address = ShippingAddress.objects.create(first_name=request.POST['first_name'], last_name=request.POST['last_name'], shipping_address=request.POST['address'], shipping_address2=request.POST['address_2'], shipping_city=request.POST['city'], shipping_state=request.POST['state'], shipping_zipcode=request.POST['zipcode'])

            return JsonResponse({'success': True, 'shipping_address_id': shipping_address.id})
    else:
        return JsonResponse({'success': False, 'shipping': True, 'error_messages': {'shipping_address': 'Please enter your shipping address.'}})
    

def save_billing(request):
    if request.POST:
        errors = BillingAddress.objects.basic_validator(request.POST)
        if len(errors) > 0:
            return JsonResponse({'success': False, 'billing': True, 'error_messages': errors})
        else:
            billing_address = BillingAddress.objects.create(first_name=request.POST['first_name'], last_name=request.POST['last_name'], billing_address=request.POST['address'], billing_address2=request.POST['address_2'], billing_city=request.POST['city'], billing_state=request.POST['state'], billing_zipcode=request.POST['zipcode'])

            return JsonResponse({'success': True, 'billing_address_id': billing_address.id})
    else:
        return JsonResponse({'success': False, 'billing': True, 'error_messages': {'billing_address': 'Please enter your billing address.'}})
    

def save_payment(request):
    if request.POST:
        errors = Payment.objects.basic_validator(request.POST)
        if len(errors) > 0:
            return JsonResponse({'success': False, 'payment': True, 'error_messages': errors})
        else:
            expiration_date = request.POST['expiration_date']+"-01"
            card_number = request.POST['card_number']

            last_four_digits = card_number[-4:]

            masked_number = re.sub(r'\d', '*', card_number[:-4]) + last_four_digits

            payment = Payment.objects.create(card_number=masked_number, expiration_date=expiration_date, cvv=request.POST['cvv'])

            return JsonResponse({'success': True, 'payment_id': payment.id})
    else:
        return JsonResponse({'success': False, 'payment': True, 'error_messages': {'payment': 'Please enter your payment information.'}})
    

def submit(request):
    order = Order.objects.create(shipping_address_id=int(request.POST['shipping_address_id']), billing_address_id=int(request.POST['billing_address_id']), payment_id=int(request.POST['payment_id']), order_total=request.session['total'])

    cart = request.session['cart']

    for product_id, quantity in cart.items():
        product = Product.objects.get(id=product_id)

        product.productinventory.inventory_count -= quantity
        product.productinventory.quantity_sold += quantity

        product.productinventory.save()
        product.save()

        cost = product.price * quantity

        OrderItem.objects.create(order_id=order.id, product_id=product.id, quantity=quantity, total=cost)

    del request.session['cart']
    
    return JsonResponse({'success': True, 'order_id': order.id})