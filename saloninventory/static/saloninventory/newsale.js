var usr = document.querySelector("#userid").name;
var cartP = sessionStorage.getItem(`${usr}cartproducts`);
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
  document
    .querySelector("#emptycart")
    .addEventListener("click", () => {sessionStorage.clear(); location.href ="/"; });
  document.querySelector("#Cart").style.display = "none";
  document.querySelector("#emptycart").style.display = "none";
  cartP = JSON.parse(cartP);
  console.log(document.querySelector("#userid").name);
  if(cartP!=null){
    loadCart();
    document.querySelector("#Cart").style.display = "block";
    document.querySelector("#emptycart").style.display = "block";
  }
  
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
  console.log(Products);
  return Products;
}
async function fetch_services() {
  const response = await fetch("/myservices");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  services = await response.json();
  console.log(services)
  return services;
}

function load_products(Products) {
  for (product in Products) {
    var y = document.createElement("option");
    y.setAttribute("value", `${Products[product].id}`);
    y.setAttribute("id",`p${Products[product].id}`)
    y.setAttribute("name",`${Products[product].Product_name}`)
    y.setAttribute("price", `${(Products[product].Unit_price/Products[product].Amount_per_unit).toFixed(2)}`);
    y.innerHTML = `${Products[product].Product_name}(${Products[product].Measure_type}) `;
    document.querySelector("#products").append(y);
  }
}
function load_services(services) {
  for (service in services) {
    var y = document.createElement("option");
    y.setAttribute("value", `${services[service].Service_id}`);
    y.setAttribute("priceS", `${services[service].Service_price}`);
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
  
  
    const prodId =document.querySelector("#products").value 
    const prodPrice =document.getElementById(`p${prodId}`).getAttribute('price')
    const prodAmount = document.getElementById("productAmount").value
    const prodName = document.getElementById(`p${prodId}`).getAttribute('name')
    const tPSale = (prodPrice*prodAmount).toFixed(2);
    var itemcount = sessionStorage.getItem(`${usr}itemcount`);
    var cartproducts = {
      pid:prodId,
      Product_Name:prodName,
      Price:prodPrice,
      Amount:prodAmount
    };
    
    if (cartP == null){
      cartP = [];
      itemcount=0;
      
    }else{

      itemcount=parseInt(itemcount)+1;
      
    }
    
    console.log(itemcount)
    console.log(cartproducts)
    cartP[itemcount]=cartproducts;
    console.log(cartP);
    var jsonStr = JSON.stringify(cartP);
    
    sessionStorage.setItem(`${usr}itemcount`,itemcount)
    sessionStorage.setItem(`${usr}cartproducts`,jsonStr)
    location.href = "/newSale";
}
function addToCartS() {};
function loadCart(){
  
  for(i=0;i<cartP.length;i++){
   var y = document.createElement("tr"); 
   y.innerHTML = `
    
            <td>${cartP[i].Product_Name} </td>
            <td> $${cartP[i].Price} </td>
            <td> ${cartP[i].Amount}</td>
            <td> $${cartP[i].Price*cartP[i].Amount}</td>
    
          `;
  document.getElementById("Cart").append(y); 
  }
  
};
