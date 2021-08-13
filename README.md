# Finalproject
CS50W Final project Capstone

## Introduction 
This project is called Salon Inventory and its main purpose is to keep track of sales in a beauty Salon. With Salon Inventory you can add new products and services that are offered in the salon. You can keep track of sales with the new sale tab. The sales order tab includes a cart that lets you edit the price of the items to sell. On your main page, you will have all the placed orders list ordered by the last sale first. Then you can go into your current inventory and add more units of each product or change existing services prices.

## Requirements: 
 ### Distinctiveness and Complexity:
  * The Salon Inventory app has its own api for the services and products data and is conditioned to the logged-in user. Salon Inventory has a list of sales on the main page for the user and has the add products and services feature. These products and services can be modified by the user. The app has a shopping cart built-in.
  * This project is far distinct from Project 4 and since it has a sales area, the main use is to keep track of the products amounts so the salon can re-stock its products in a timely manner.
  * This app is not an e-commerce app.
  * Salon Inventory is built in Django with a JavaScript front-end.
  * This app is mobile responsive.
    
 ### Files:
  1. The saloncalc folder has all the files that Django creates automatically for a project, the only change I made was adding Salon Inventory and the admin app.
  2. Then created with Django cli the Salon Inventory app with the following parts:
    - saloninventory/
      1. **urls.py:**
         - This file has all the paths and the API urls.
      2. **models.py:**
         - In this file are all the tables needed in the database for the app to work.
         - Each table has its own way of serializing for better API understanding when returning json to front-end.
      3. **views.py:**
         - All back-end logic and functions are in this file.
         - API is documented [here.](https://github.com/leny133/Finalproject/blob/main/README.md#api)
    - saloninventory/templates/saloninventory:
      1. **layout.html:**
         - This HTML file has all the tabs and css headers needed through all other HTML files and is included in all other HTML files.
         - The tabs become a hamburger button when the viewport is mobile or becomes a narrow page.
         - Some bootstrap features need javascript references to work, these are included in the layout HTML.
      2. **login.html:**
         - The login page will ask for the user and password to let you log in.
      3. **register.html:**
         - This page has all the required fields to register a new user.
      4. **index.html:**
         - In the index html you can see all the sales that had been placed. I used the bootstrap cards feature to organize each order's table.
         - Orders will be organized from newest to oldest.
         - This page has pagination with 10 orders to keep the growing orders organized.
      5. **addproduct.html:**
         - On this page, you can add more products to your inventory. 
         - Fields are required and you have to provide product name, units, measurement type, amount per unit, price per unit, and product description the image url is optional.
         - Once submitted the app will add the user owner and save the product.
      6. **services.html:**
         - Services.html will have fields for service name, price and description.
         - Once submitted the app will add the user owner and save the service.
      7. **newsale.html:**
         - This html has all the needed parts of a sales cart that are responsive to a JavaScript file that will be further discussed later in this documentation.
      8. **inventory.html:**
         - This html has all the needed parts for a JavaScript file that updates the amount of units in products and the price of services.
    - saloninventory/static/img:
      1. **favicon.ico:**
         - Icon image.
    - saloninventory/static/saloninventory:
      1. **newsale.js:**
         - This JavaScript file has all the front-end part of the sales cart in newsale.html.
         - Has async functions to fetch data from the back-end api which populates the products and services of the request user.
         - When submitted asks for user confirmation and sends data via POST to back-end.
      2. **inventory.js:**
         - On this JavaScript file are two cards, one for each services and products, this cards have the main information about its respective areas.
         - There is a drop-down select that will change the product or service.
         - Each product or service can be updated in this code. Changes are made via PUT.
 ### How to run:
  1. You must have Django 3.1.5 or later for this app to work
  2. Clone this repo, in shell or powershell type in app's root path `python manage.py runserver`
  3. Open your browser and type `127.0.0.1:8000`
  4. For testing purposes you can use the following credentials:
     - Username: leny
     - Password: admin
  5. If you register as a new user the app will alert you with a message when there is no order placed on how to get started. The message is:
     - Welcome to the Salon App
     - For this App to work you must do the following steps:
     - Step 1 : use Add Products or Add Services to your inventory
     - Step 2 : Go to New Sale and fill the cart and place order
     - Step 3(optional) : Modify products in My Inventory"
## API
  - For this API to work you must be logged in with a vlid user of the app.
  - For a list of **products** you should fetch via GET `/myproducts`. Products will be in json format. Example:
    ```json
    {
     "id": "id",
     "Product_name": "product name",
     "Units": "units",
     "Amount_per_unit": "amount perunit",
     "Unit_price": "unit price",
     "Measure_type": "measure",
     "Description": "description",
     "Total_amount": "total amount of oz",
     "image": "image url",
    }
    ```
  - For a list of **services** you should fetch via GET `/myservices`. Services will be in json format. Example:
    ```json
    {
     "Service_id": "id",
     "Service_name": "service name",
     "Service_price": "price",
     "Service_description": "description",
    }
    ```
  - For a list of **Placed Orders** you should fetch via GET `/mysales`. Sales will be in json format. Example:
    ```json
     {
      "Sale_id": "id",
      "Sold_products": [{"prodName":"Product name",
                         "prodImage": "Products"}],
      "Sold_services": ["Services"],
      "Sale_date": [{"day":"day",
                    "month":"month",
                    "year":"year",
                    "date":"date"
                            }],
            "Total":"sale total",
            "Sold_html": "Table of the order formatted in HTML",
            
        }
     ```
