
//var cartP = sessionStorage.getItem(`${usr}cartproducts`);

document.addEventListener("DOMContentLoaded", function () {
  
  
  

  fetch_products().then((Products) => {
    load_products(Products);
    load_card(Products,0, "p");
    console.log(Products);
  });
  fetch_services().then((services) => {
    load_services(services);
    load_card(services,0, "s");
  });
});


async function fetch_products() {
  const response = await fetch("/myproducts");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    alert(message);
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
    var y =""
  for (product in Products) {
    y = document.createElement("option");
    y.setAttribute("value", `${product}`);
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
  
}
function load_services(services) {
    var y =""
  for (service in services) {
    y = document.createElement("option");
    y.setAttribute("value", `${service}`);
    y.setAttribute("id", `s${services[service].Service_id}`);
    y.setAttribute("name", `${services[service].Service_name}`);
    y.setAttribute("price", `${services[service].Service_price}`);
    y.innerHTML = `${services[service].Service_name}`;
    document.querySelector("#services").append(y);
  }
  
}

function load_card(Item,pos,ps){
    var y = ""
    if(ps=="p"){
        document.getElementById("prodBody").innerHTML = `
            <h3><b>Product Name:</b> ${Item[pos].Product_name}</h3>
            There is ${Item[pos].Total_amount} <i>${
          Item[pos].Measure_type
        }</i> left of ${Item[pos].Product_name}<br>
            Unit price: ${Item[pos].Unit_price}<br>
            Each unit has: ${Item[pos].Amount_per_unit} <i>${
          Item[pos].Measure_type
        }</i><br>
            Price per <i>${Item[pos].Measure_type}</i> is $${(
          Item[pos].Unit_price / Item[pos].Amount_per_unit
        ).toFixed(2)}
            `;
    }
}
