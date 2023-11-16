from django.urls import path 
from . import views

urlpatterns = [
    path('', views.products), 
    path('/add', views.add), 
    path('/get/<int:product_id>', views.get),
    path('/edit/<int:product_id>', views.edit), 
    path('/delete/<int:product_id>', views.delete)
]