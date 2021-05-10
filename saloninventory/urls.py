from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("addproduct", views.add_product, name="addproduct"),
    
    #API
    path("myinventory", views.Products_api, name = "inventory_api"),
]
