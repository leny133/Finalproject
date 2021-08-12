# Finalproject
CS50W Final project Capstone

## Introduction 
This proyect is called Salon Inventory and its main purpuse is to keep track of sales in a beauty Salon. With Salon Inventory you can add new products and services that are offer in the salon. You can keep track of sales with the new sale tab. The sales order tab includes a cart that lets you edit the price of the items to sell. In your main page you will have all the placed orders list ordered by the last sale first. Then you can go into your current inventory and add more units of each preduct or change existing services prices.

## Requirements: 
### - Distinctiveness and Complexity:
    - The Salon Inventory app has its own api for the services and products data and is conditioned to the logged in user. Salon Inventory has a list of sales in the main page for the user and has the add products an services feature. This products and services can be modified by the user. The app has a shopping cart built in.
    - This project is far distinct from Project 4 and since it has a sales area, the main use is to keep track of the products amounts so the salon can re-stock its products in a timely manner.
    - This app is not an e-commerce app.
    - Salon Inventory is built in Django with a JavaScript front-end.
    - This app is mobile responsive.
### - Files:
    1. The saloncalc folder has all the files that Django creates automatically for a project, the only change I made was adding Salon Inventory and the admin app.
    2. Then created with Django cli the Salon Inventory app with the following parts:
        - templates/saloninventory:
            1. layout.html:
                - This HTML file has all the tabs and css headers needed through all other HTML files and is included in all other HTML files.
                - The tabs become a hamburguer button when the viewport is mobile or becomes a norrow page.
                - Some bootstrap features need the javascript references to work, these are included in the layout HTML.
            2. login.html:
                - The login page will ask for user and password to let you log in.
            3. register.html:
                - This page has all the required fields to register a new user.
            4. index.html:
                - In the index html you can see all the sales thas had been placed. I used the bootstrap cards feature to organize each order's table.
                - Orders will be organized from newest to oldest.
                - This page has pagination with 10 orders to keep the growing orders organized.
            5. addproduct.html:
                - In this page you can add more products to your inventory. 
                - Fields are required and you have to provide product name, units, measurement type, amount per unit, price per unit and product description the image url is optional.
                - Once submited the app will add the user owner and save the product.
            6. services.html:
                - Services.html will have fields for service name, price and description.
                - Once submited the app will add the user owner and save the service.
            7. newsale.html:
                - This html has all the needed parts of a sales cart that are responsive to a JavaScript file that will be further discussed later in this documentation.
            8.inventory.html:
                - 