from django.urls import path 
from . import views

urlpatterns = [
    path('', views.checkout_page), 
    path('/success/<int:order_id>', views.success)
]