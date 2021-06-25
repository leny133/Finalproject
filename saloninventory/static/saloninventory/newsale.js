let cartP = [];
let cartS = [];
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#showproduct")
    .addEventListener("click", () => showproduct());
  document
    .querySelector("#showservice")
    .addEventListener("click", () => showservice());
  document
    .querySelector("#productCart")
    .addEventListener("click", () => addToCartP());
  document
    .querySelector("#serviceCart")
    .addEventListener("click", () => addToCartS());
  
  fetch_products().then((Products) => {
    load_products(Products);
  });
  fetch_services().then((services) => {
    load_services(services);
  });
});

async function fetch_products() {
  const response = await fetch("/myproducts");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  Products = await response.json();
  return Products;
}
async function fetch_services() {
  const response = await fetch("/myservices");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  services = await response.json();
  return services;
}

function load_products(Products) {
  for (product in Products) {
    var y = document.createElement("option");
    y.setAttribute("value", `${Products[product].id}`);
    y.innerHTML = `${Products[product].Product_name}(${Products[product].Measure_type}) `;
    document.querySelector("#products").append(y);
  }
}
function load_services(services) {
  for (service in services) {
    var y = document.createElement("option");
    y.setAttribute("value", `${services[service].id}`);
    y.innerHTML = `${services[service].Service_name}`;
    document.querySelector("#services").append(y);
  }
}

function showproduct() {
  document.querySelector("#cartproduct-view").style.display = "block";
  document.querySelector("#cartservice-view").style.display = "none";
}
function showservice() {
  document.querySelector("#cartproduct-view").style.display = "none";
  document.querySelector("#cartservice-view").style.display = "block";
}
function addToCartP() {
  
  fetch_products().then((Products) => {
    const prodAdd =document.querySelector("#products").value 
    
  });
}
function addToCartS() {}
