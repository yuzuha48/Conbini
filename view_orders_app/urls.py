from django.urls import path
from . import views

urlpatterns = [
    path('', views.orders), 
    path('/<int:order_id>', views.view_order),
    path('/update_status/<int:order_id>', views.update_status)
]