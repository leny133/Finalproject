from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import *
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from decimal import *

def index(request):

    # Authenticated users view their inbox
    if request.user.is_authenticated:
        return render(request, "saloninventory/index.html")

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "saloninventory/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()

        except IntegrityError:
            return render(request, "saloninventory/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "saloninventory/register.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "saloninventory/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "saloninventory/login.html")


@login_required
def Products_api(request):
    my_products = Products.objects.filter(prodowner=request.user)
    return JsonResponse([my_product.serialize() for my_product in my_products], safe=False)


@login_required
def Services_api(request):
    my_services = Services.objects.filter(servowner=request.user)
    return JsonResponse([my_service.serialize() for my_service in my_services], safe=False)


@login_required
def Sales_api(request):
    my_sales = Sale.objects.filter(sales_person=request.user) 
    return JsonResponse([my_sale.serialize() for my_sale in my_sales], safe=False)


@login_required
def add_product(request):
    if request.method == "POST":

        product = Products(
            prodowner=request.user,
            product_name=request.POST["productname"],
            totalamount=request.POST["units"],
            measure=request.POST["measurement"],
            units=request.POST["units"],
            amountperunit=request.POST["amount"],
            unitprice=request.POST["price"],
            description=request.POST["description"],
            image=request.POST["productimage"]
        )

        product.save()
        return render(request, "saloninventory/index.html")
    else:
        return render(request, "saloninventory/addproduct.html")


@login_required
def add_service(request):
    if request.method == "POST":
        service = Services(
            servowner=request.user,
            price=request.POST["servicePrice"],
            service_name=request.POST["serviceName"],
            description=request.POST["serviceDescription"]
        )
        service.save()
        return render(request, "saloninventory/index.html")
    else:
        return render(request, "saloninventory/services.html")


@csrf_exempt
@login_required
def newSale(request):
    if request.method == "POST":
        sale = json.loads(request.body)
        cartP =json.loads(sale[0].get("cartP") )
        tbl_html = sale[0].get("tbl_html")
        total_S = 0.00
        for p in cartP:
            if p != None:
                total_S = total_S + float(p.get("Sale"))
        print(total_S)
        endsale = Sale.objects.create(
                sales_person=request.user,
                total=total_S,
                sale_html=tbl_html,
                )
        for p in cartP :
            if p != None:
                Pid = int(p.get("pid"))
                amount = Decimal(p.get("Amount"))
                if p.get("type")== "product":
                    endsale.sold_products.add(Pid)
                    pupdate = Products.objects.filter(id=Pid)
                    totalamount = pupdate[0].totalamount - amount
                    pupdate.update(totalamount=totalamount)
                    newunits = totalamount/(pupdate[0].amountperunit)
                    pupdate.update(units=newunits)
                elif p.get("type")== "service":
                    endsale.sold_services.add(Pid)
                    
                
            
        return render(request, "saloninventory/index.html")
    else:
        return render(request, "saloninventory/newsale.html")
