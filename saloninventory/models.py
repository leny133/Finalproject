from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    pass


class Products(models.Model):
    prodowner = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="prodowner")
    product_name = models.CharField(max_length=250)
    totalamount = models.DecimalField(max_digits=10, decimal_places=2)
    measure = models.CharField(max_length=24)
    units = models.DecimalField(max_digits=10, decimal_places=2)
    amountperunit = models.DecimalField(max_digits=10, decimal_places=2)
    unitprice = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=250, blank=True)
    image = models.URLField(null=True)

    def serialize(self):
        return{
            "id": self.id,
            "Product_name": self.product_name,
            "Units": self.units,
            "Amount_per_unit": self.amountperunit,
            "Unit_price": self.unitprice,
            "Measure_type": self.measure,
            "Description": self.description,
            "Total_amount":self.totalamount,
            "image": self.image,

        }


class Services(models.Model):
    servowner = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="servowner")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    service_name = models.CharField(max_length=50)
    description = models.CharField(max_length=250, blank=True)

    def serialize(self):
        return{
            "Service_id": self.id,
            "Service_name": self.service_name,
            "Service_price": self.price,
            "Service_description": self.description,
        }


class Sale(models.Model):
    sales_person = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="sales_person")
    total = models.DecimalField(max_digits=10, decimal_places=2)
    sold_products = models.ManyToManyField(
        "Products", blank=True, related_name="sold_products")
    sold_services = models.ManyToManyField(
        "Services", blank=True, related_name="sold_services")
    sale_html = models.CharField(max_length=2000, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return{
            "Sale_id": self.id,
            "Sold_products": [{"prodName":Products.product_name,
                               "prodImage": Products.image} for Products in self.sold_products.all()],
            "Sold_services": [Services.service_name for Services in self.sold_services.all()],
            "Sale_date": [{"day":self.timestamp.day,
                           "month":self.timestamp.month,
                           "year":self.timestamp.year,
                           "date":self.timestamp.strftime("%B %d, %Y")
                            }],
            "Total":self.total,
            "Sold_html": self.sale_html,
            
        }
