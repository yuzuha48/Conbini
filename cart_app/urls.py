from django.urls import path 
from . import views

urlpatterns = [
    path('/add/<int:product_id>', views.add), 
    path('', views.cart), 
    path('/get/<int:product_id>', views.get), 
    path('/update/<int:product_id>', views.update), 
    path('/remove/<int:product_id>', views.remove)
]