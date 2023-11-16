from django.urls import path 
from . import views

urlpatterns = [
    path('', views.login_page), 
    path('/login', views.login), 
    path('/register_page', views.register_page), 
    path('/register', views.register), 
]