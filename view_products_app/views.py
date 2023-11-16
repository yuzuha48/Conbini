from django.shortcuts import render
from products_app.models import Product


def home(request):

    all_products = Product.objects.all()
    food_count = 0 
    drink_count = 0 
    snack_count = 0 

    for product in all_products: 
        if product.category == 'food':
            food_count += 1 
        elif product.category == 'drink':
            drink_count += 1 
        elif product.category == 'snack':
            snack_count += 1

    items = 0
    if 'cart' in request.session:
        for val in request.session['cart'].values():
            items += val

    context = {
        'all_products': Product.objects.all(),
        'food_count': food_count, 
        'drink_count': drink_count, 
        'snack_count': snack_count, 
        'cart': items
    }

    return render(request, 'home.html', context)


def show_one(request, product_id):
    items = 0
    if 'cart' in request.session:
        for val in request.session['cart'].values():
            items += val

    context = {
        'product': Product.objects.get(id=product_id), 
        'cart': items
    }
    return render(request, 'show_one.html', context)
