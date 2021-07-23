from django.urls import path, include
from django.views.generic.base import RedirectView
from . import views
from django.contrib.staticfiles.storage import staticfiles_storage

urlpatterns = [
    path('', views.index, name='index'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("addproduct", views.add_product, name="addproduct"),
    path("addService", views.add_service, name="addService"),
    path("newsale",views.newSale, name="newSale"), 
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('img/favicon.ico'))),
    path('inventory',views.inventory, name="inventory"),
    #API
    path("myproducts", views.Products_api, name = "products_api"),
    path("myservices", views.Services_api, name = "Services_api"),
    path("mysales",views.Sales_api, name="sales"),
    path("newSale", views.newSale, name="newSale"),
    path("<str:fllw>", views.Sales_pag, name="pagSales"),
    
]
 
