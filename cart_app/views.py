from django.shortcuts import render
from django.http import JsonResponse
from products_app.models import Product


def add(request, product_id):

    product_id = str(product_id)

    if 'cart' in request.session:
        cart = request.session['cart']

        if product_id in cart:
            if cart[product_id] + int(request.POST['quantity']) <= 10:
                cart[product_id] += int(request.POST['quantity'])
            else: 
                return JsonResponse({'success': False, 'error_messages': {'quantity': f'Total quantity cannot be more than 10.\nThere are currently {cart[product_id]} of these items in your cart.'}})
        else:
            cart[product_id] = int(request.POST['quantity'])
        
        request.session['cart'] = cart
    else:
        request.session['cart'] = {product_id: int(request.POST['quantity'])}

    return JsonResponse({'success': True})


def cart(request):
    total = 0 

    if 'cart' in request.session:
        cart = request.session['cart']

        cart_items = []
        for key, val in cart.items():
            product = Product.objects.get(id=key)
            cost = product.price * val
            total += cost
            cart_items.append({'product': product, 'quantity': val, 'cost': cost})

        context = {
            'cart_items': cart_items, 
            'total': total
        }
    else:
        context = {
            'cart_items': None, 
            'total': total
        }

    request.session['total'] = float(total)
    return render(request, 'cart.html', context)


def get(request, product_id):

    product = Product.objects.get(id=product_id)
    imgs = product.images.all()
    images = []

    for img in imgs:
        images.append([img.id, str(img.image), img.main])

    return JsonResponse({'product_id': product.id, 'product_name': product.product_name, 'price': product.price, 'desc': product.desc, 'category': product.category, 'images': images})


def update(request, product_id):
    cart = request.session['cart']

    for product in cart.keys():
        if int(product) == product_id:
            cart[product] = int(request.POST['quantity'])
            request.session['cart'] = cart
            return JsonResponse({'success': True})
        

def remove(request, product_id):
    cart = request.session['cart']

    for key, val in cart.items():
        if int(key) == product_id:

            product = Product.objects.get(id=product_id)
            cost = product.price * val

            request.session['total'] -= float(cost)
            total = "{:.2f}".format(request.session['total'])

            del cart[key]
            request.session['cart'] = cart

            return JsonResponse({'success': True, 'grand_total': total})
