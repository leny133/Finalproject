
document.addEventListener("DOMContentLoaded", function () {
   load_cards()
});

async function load_cards() {
  const response = await fetch("/mysales");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    alert(message);
    throw new Error(message);
  }
  Sales = await response.json();
  console.log(Sales)
  for(sale in Sales){
   var y = document.createElement("div");
   y.setAttribute("class", "card border-success mb-3");
   y.setAttribute("id", `card${sale}`)
   y.setAttribute("style", `max-width: 20rem; 
                            text-align: center;
                            margin-left: auto;
                            margin-right: auto; `);
   y.innerHTML = `<table>${Sales[sale].Sold_html}</table>`;
   document.getElementById("indexdiv").append(y)
   y = document.createElement("div");
   y.setAttribute("class","footer");
   y.innerHTML=`${Sales[sale].Sale_date}`
   
   document.getElementById(`card${sale}`).append(y)
  
  }
}
  

