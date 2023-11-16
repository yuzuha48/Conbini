from django.urls import path 
from . import views

urlpatterns = [
    path('/save_shipping', views.save_shipping), 
    path('/save_billing', views.save_billing), 
    path('/save_payment', views.save_payment), 
    path('/submit', views.submit)
]