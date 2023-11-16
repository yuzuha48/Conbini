from django.urls import path 
from . import views

urlpatterns = [
    path('', views.home), 
    path('/show/<int:product_id>', views.show_one), 
]