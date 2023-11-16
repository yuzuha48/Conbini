from django.shortcuts import render
from products_app.models import Product
from orders_app.models import Order


def checkout_page(request):
    cart = request.session['cart']
    items = {}

    for product_id, quantity in cart.items():
        product = Product.objects.get(id=product_id)
        cost = quantity * product.price
        for img in product.images.all():
            if img.main == 1:
                image = img.image
        items[product.product_name] = {'image': image, 'quantity': quantity, 'cost': cost}

    context = {
        "items": items,
        "total": "{:.2f}".format(request.session['total'])
    }

    return render(request, 'checkout.html', context)


def success(request, order_id):
    context = {
        'order': Order.objects.get(id=order_id)
    }
    return render(request, 'success.html', context)

