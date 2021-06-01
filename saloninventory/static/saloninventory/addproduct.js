function add_product() {
  alert("before fetch")  
  fetch('/addproduct', {
    method: 'POST',
    body: JSON.stringify({
        Product_name: document.querySelector('#productname').value,
        Units: document.querySelector('#units').value,
        Amount_per_unit: document.querySelector('#amount').value,
        Unit_price: document.querySelector('#price').value,
        Measure_type: document.querySelector('#measurment').value,
        Description: document.querySelector('#description').value,
        image: document.querySelector('#productimage').value,
    })
    
  })
  alert("after fetch")    
      
};