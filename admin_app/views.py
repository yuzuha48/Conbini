import bcrypt
from django.http import JsonResponse
from django.shortcuts import render
from .models import Admin


def login_page(request):
    if 'admin_id' in request.session:
        del request.session['admin_id']
    return render(request, 'login.html')


def login(request):
    admin = Admin.objects.filter(email = request.POST['email'])
    if admin:
            logged_admin = admin[0]
            if bcrypt.checkpw(request.POST['password'].encode(), logged_admin.password.encode()):
                request.session['admin_id'] = logged_admin.id
                return JsonResponse({'success': True})
            else: 
                errors = {'login': 'Password is incorrect.'}
                return JsonResponse({'success': False, 'error_messages': errors})
    else:
        errors = {'login': 'Email does not belong to a registered admin.'}
        return JsonResponse({'success': False, 'error_messages': errors})


def register_page(request):
    if 'admin_id' in request.session:
        del request.session['admin_id']
    return render(request, 'register.html')


def register(request):
    errors = Admin.objects.basic_validator(request.POST)
    if len(errors) > 0:
        return JsonResponse({'success': False, 'error_messages': errors})
    else:  
        password = request.POST['password']
        pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        admin = Admin.objects.create(first_name=request.POST['first_name'], last_name=request.POST['last_name'], email=request.POST['email'], password=pw)
        request.session['admin_id'] = admin.id
        return JsonResponse({'success': True})
