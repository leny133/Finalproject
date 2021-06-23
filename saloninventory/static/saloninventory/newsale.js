document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#showproduct")
    .addEventListener("click", () => showproduct());
  document
    .querySelector("#showservice")
    .addEventListener("click", () => showservice());
  load_products_services();
});
var allproducts;
var allservices;
function load_products_services() {
  fetch("/myproducts")
    .then((response) => response.json())
    .then((myproducts) => {
      allproducts = myproducts;
      for (product in myproducts) {
        var y = document.createElement("option");
        y.setAttribute("value", `${myproducts[product].Product_name}`);
        y.innerHTML = `${myproducts[product].Product_name}(${myproducts[product].Measure_type}) `;
        document.querySelector("#products").append(y);
      }
    });
    fetch("/myservices")
      .then((response) => response.json())
      .then((myservices) => {
        allservices = myservices;
        for (service in myservices) {
          var y = document.createElement("option");
          y.setAttribute("value", `${myservices[service].Service_name}`);
          y.innerHTML =`${myservices[service].Service_name}`;
          document.querySelector("#services").append(y);
        }
      });
}

function showproduct() {
  document.querySelector("#cartproduct-view").style.display = "block";
  document.querySelector("#cartservice-view").style.display = "none";
  
}
function showservice() {
  document.querySelector("#cartproduct-view").style.display = "none";
  document.querySelector("#cartservice-view").style.display = "block";
}
