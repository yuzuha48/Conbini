from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Product, Image, ProductInventory


def products(request):
    if 'admin_id' not in request.session:
        return redirect('/staff')
    context = {
        'all_products': Product.objects.all(),
    }
    return render(request, 'products.html', context)


def add(request):
    if 'admin_id' not in request.session:
        return redirect('/staff')

    errors = Product.objects.basic_validator(request.POST, request.FILES)
    if len(errors) > 0:
        return JsonResponse({'success': False, 'error_messages': errors})
    else:
        product = Product.objects.create(product_name=request.POST['product_name'], price=request.POST['price'], desc=request.POST['desc'], category=request.POST['category'])
        product_inventory = ProductInventory.objects.create(inventory_count=request.POST['inventory_count'], product_id=product.id)

        main_image = request.POST['main_image']
        selected_images = request.POST['selected_images']

        for file in request.FILES.getlist('images'):
            if str(file) in selected_images:
                if str(file) == main_image:
                    Image.objects.create(image=file, main=1, product_id=product.id)
                else:
                    Image.objects.create(image=file, main=0, product_id=product.id)

        return JsonResponse({'success': True})
    

def get(request, product_id):
    if 'admin_id' not in request.session:
        return redirect('/staff')

    product = Product.objects.get(id=product_id)
    imgs = product.images.all()
    images = []

    for img in imgs:
        images.append({'id': img.id, 'name': str(img.image), 'main': img.main})

    return JsonResponse({'product_id': product.id, 'product_name': product.product_name, 'price': product.price, 'desc': product.desc, 'category': product.category, 'inventory_count': product.productinventory.inventory_count, 'quantity_sold': product.productinventory.quantity_sold, 'images': images})


def edit(request, product_id):
    if 'admin_id' not in request.session:
        return redirect('/staff')

    # Validate form data
    errors = Product.objects.edit_validator(request.POST)
    if len(errors) > 0:
        return JsonResponse({'success': False, 'error_messages': errors})
    
    # Update the product
    else:
        # Set product attributes to the new values 
        product = Product.objects.get(id=product_id)
        product.product_name = request.POST['product_name']
        product.price = request.POST['price']
        product.desc = request.POST['desc']
        product.category = request.POST['category']
        product.productinventory.inventory_count = request.POST['inventory_count']

        if request.POST['quantity_sold']:
            product.productinventory.quantity_sold = int(request.POST['quantity_sold'])
        else:
            product.productinventory.quantity_sold = 0 

        # Get main image
        main_image = request.POST['main_image']

        # If there were new images uploaded
        if request.FILES.getlist('images'):
            
            # Update main image or delete removed images 
            selected_images = request.POST['selected_images'].split(',')
            all_images = product.images.all()

            for image in all_images:
                if image.image not in selected_images:
                    image.delete()
                else: 
                    if image.image == main_image:
                        image.main = 1 
                    else:
                        image.main = 0
                    image.save()    

            # Create a new image object
            for file in request.FILES.getlist('images'):
                if str(file) in selected_images:
                    if str(file) == main_image:
                        Image.objects.create(image=file, main=1, product_id=product.id)
                    else:
                        Image.objects.create(image=file, main=0, product_id=product.id)

        # If no new images were uploaded
        else:
            # Update main image or delete removed images 
            selected_images = request.POST['selected_images'].split(',')
            all_images = product.images.all()

            for image in all_images:
                if image.image in selected_images:
                    if image.image == main_image:
                        image.main = 1 
                    else:
                        image.main = 0
                    image.save()      
                else: 
                    image.delete()
        
        product.productinventory.save()
        product.save()

        return JsonResponse({'success': True})


def delete(request, product_id):
    if 'admin_id' not in request.session:
        return redirect('/staff')
    
    product = Product.objects.get(id=product_id)
    product.delete()
    return JsonResponse({'success': True})
