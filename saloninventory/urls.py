from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("addproduct", views.add_product, name="addproduct"),
    path("addService", views.add_service, name="addService"), 
    
    #API
    path("myproducts", views.Products_api, name = "products_api"),
    path("myservices", views.Services_api, name = "Services_api"),
    path("mysales",views.Sales_api, name="sales"),
    path("newSale", views.newSale, name="newSale"),
    
]
 