from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    pass

class Products(models.Model):
    prodowner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="prodowner")
    totalamount = models.DecimalField(max_digits=10,decimal_places=2)
    measure = models.CharField(max_length=24)
    units = models.IntegerField(null=True)
    amountperunit = models.DecimalField(max_digits=10, decimal_places=2)
    unitprice = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=250)

class Services(models.Model):
    servowner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="servowner")
    client = models.CharField(max_length=50)
    service = models.CharField(max_length=50)
