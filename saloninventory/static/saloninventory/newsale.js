var usr = document.querySelector("#userid").name;
var cartP = sessionStorage.getItem(`${usr}cartproducts`);
var tbl_html = "";
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
  document.querySelector("#cartList").style.display = "none";
  cartP = JSON.parse(cartP);
  if (cartP != null) {
    loadCart();
    document.querySelector("#cartList").style.display = "block";
    document.querySelector("#emptycart").style.display = "inline";
    document.querySelector("#placeOrder").style.display = "inline";
  }

  fetch_products().then((Products) => {
    load_products(Products);
  });
  fetch_services().then((services) => {
    load_services(services);
  });
});

async function place_order() {
  const body = [{"cartP":JSON.stringify(cartP),
                  "tbl_html":tbl_html}];
  const response = await fetch("/newsale", {
    method: "POST",
    body: JSON.stringify(body),
          
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    alert(message);
    throw new Error(message);
  }
  sessionStorage.clear();
  return (location.href = "/");
}
async function fetch_products() {
  const response = await fetch("/myproducts");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    alert(message)
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
    y.setAttribute("id", `p${Products[product].id}`);
    y.setAttribute("name", `${Products[product].Product_name}`);
    y.setAttribute(
      "price",
      `${(
        Products[product].Unit_price / Products[product].Amount_per_unit
      ).toFixed(2)}`
    );
    y.innerHTML = `${Products[product].Product_name}(${Products[product].Measure_type}) `;
    document.querySelector("#products").append(y);
  }
  y = document.querySelector("#productAmount")
  y.setAttribute("max",`${Products[0].Total_amount}`)
}
function load_services(services) {
  for (service in services) {
    var y = document.createElement("option");
    y.setAttribute("value", `${services[service].Service_id}`);
    y.setAttribute("id", `s${services[service].Service_id}`);
    y.setAttribute("name", `${services[service].Service_name}`);
    y.setAttribute("price", `${services[service].Service_price}`);
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
function setMax(){
  const prodId = document.querySelector("#products").value;
  var selproduct = Products.filter(function(pmax){
    return pmax.id == prodId
  })
  var y = document.querySelector("#productAmount");
  y.setAttribute("max", `${selproduct[0].Total_amount}`);
  console.log(selproduct[0].Total_amount)
}
function addToCartP() {
  const prodId = document.querySelector("#products").value;
  const prodPrice = document.getElementById(`p${prodId}`).getAttribute("price");
  const prodAmount = document.getElementById("productAmount").value;
  const prodName = document.getElementById(`p${prodId}`).getAttribute("name");
  const tPSale = (prodPrice * prodAmount).toFixed(2);
  var itemcount = sessionStorage.getItem(`${usr}itemcount`);
  var cartproducts = {
    type: "product",
    pid: prodId,
    Product_Name: prodName,
    Price: prodPrice,
    Amount: prodAmount,
    Sale: tPSale,
  };

  if (cartP == null) {
    cartP = [];
    itemcount = 0;
  } else {
    itemcount = parseInt(itemcount) + 1;
  }
  cartP[itemcount] = cartproducts;
  var jsonStr = JSON.stringify(cartP);
  sessionStorage.setItem(`${usr}itemcount`, itemcount);
  sessionStorage.setItem(`${usr}cartproducts`, jsonStr);
  location.href = "/newSale";
}
function addToCartS() {
  const prodId = document.querySelector("#services").value;
  const prodPrice = document.getElementById(`s${prodId}`).getAttribute("price");
  const prodAmount = 1;
  const prodName = document.getElementById(`s${prodId}`).getAttribute("name");
  const tPSale = (prodPrice * prodAmount).toFixed(2);
  var itemcount = sessionStorage.getItem(`${usr}itemcount`);
  var cartproducts = {
    type: "service",
    pid: prodId,
    Product_Name: prodName,
    Price: prodPrice,
    Amount: prodAmount,
    Sale: tPSale,
  };

  if (cartP == null) {
    cartP = [];
    itemcount = 0;
  } else {
    itemcount = parseInt(itemcount) + 1;
  }

  console.log(cartproducts);
  cartP[itemcount] = cartproducts;
  console.log(cartP);
  var jsonStr = JSON.stringify(cartP);

  sessionStorage.setItem(`${usr}itemcount`, itemcount);
  sessionStorage.setItem(`${usr}cartproducts`, jsonStr);
  location.href = "/newSale";
}
function loadCart() {
  var total_sale = 0;
  console.log(cartP);
  const isEmpty = Object.values(cartP).every((x) => x === null);
  console.log(isEmpty);
  var y = document.createElement("table");
  y.style = "text-align: center; margin-left: auto; margin-right: auto";
  var tblhead = `
    
      <tr>
            <th>Product or Service</th>
            <th>Price per oz/ml</th>
            <th>Amount oz/ml</th>
            <th>This Sale</th>
      </tr>
      
  `;
  var tblbody="";
  var tblbodyedt="";
  for (i = 0; i < cartP.length; i++) {
    if (isEmpty === true) {
      sessionStorage.clear();
      location.href = "/newSale";
    } else {
      if (cartP[i] == undefined) {
      } else {
        var tbl = "";
        
        tbl = `
            <tr>
            <td>${cartP[i].Product_Name} </td>
            <td> $${cartP[i].Price} </td>
            <td> ${cartP[i].Amount}</td>
            <td> $${(cartP[i].Price * cartP[i].Amount).toFixed(2)}</td>
            
            `;
        var tbledt =
          tbl +
          `<td> <button id="ed${cartP[i].pid}" name="${cartP[i].pid}" class="btn btn-warning"
             onclick="edit(${i})">
            Edit
            </button></td>
            <td> <button id="del${cartP[i].pid}" name="${cartP[i].pid}" class="btn btn-danger"
             onclick="delete_entry(${i})">
            Remove
            </button></td></tr>
          `;
          tblbodyedt = tblbodyedt + tbledt;
          tblbody = tblbody + tbl +"</tr>"
        total_sale = parseFloat(cartP[i].Sale) + total_sale;
      }
    }
  }
  
  var tbltotal = `
          <tr>
            <td> </td>
            <td> </td>
            <td> Total: </td>
            <td id="total" name="${total_sale.toFixed(2)}">
             $${total_sale.toFixed(2)}</td>
          </tr>
          `;
  
  tbl_html = tblhead + tblbody + tbltotal;
  y.innerHTML = tblhead + tblbodyedt + tbltotal;
  document.getElementById("cartList").append(y);
  y = document.createElement("div")
  y.innerHTML = `<br>
    <button id="emptycart" onclick="emptycart()" class="btn btn-danger" style="display: inline;">Empty Cart</button>  
    
    <button id="placeOrder" onclick="placeOrder()" class="btn btn-info" style="display: inline;">Place Order</button>
  
  `;
  document.getElementById("cartList").append(y);
  console.log(tbl_html);
}
function edit(prod_id) {
  var x = parseFloat(prompt("Enter price change", "0"));
  const isInteger = /^[0-9.,]+$/;
  if (isInteger.test(x)) {
    cartP[prod_id].Price = x;
    cartP[prod_id].Sale = cartP[prod_id].Amount * x;
    var jsonStr = JSON.stringify(cartP);
    sessionStorage.setItem(`${usr}cartproducts`, jsonStr);
    location.href = "/newSale";
  } else {
    edit(prod_id);
  }
}
function delete_entry(prod_id) {
  delete cartP[prod_id];
  var jsonStr = JSON.stringify(cartP);
  sessionStorage.setItem(`${usr}cartproducts`, jsonStr);
  location.href = "/newSale";
}
function emptycart(){
  sessionStorage.clear();
  location.href = "/";
}
function placeOrder(){
  var r = confirm(
    `Place Order?`
  );
  if (r == true) {
    place_order();
  } else {
    location.href = "/newsale";
  }
}