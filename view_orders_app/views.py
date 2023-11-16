from django.shortcuts import render
from django.http import JsonResponse
from orders_app.models import Order


def orders(request):
    context = {
        'all_orders': Order.objects.all()
    }
    return render(request, 'orders.html', context)


def update_status(request, order_id): 
    order = Order.objects.get(id=order_id)
    order.status = request.POST['status']
    order.save()
    return JsonResponse({'success': True})


def view_order(request, order_id):
    context = {
        'order': Order.objects.get(id=order_id)
    }
    return render(request, 'view_order.html', context)