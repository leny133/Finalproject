

function add_Service() {
  fetch('/addService', {
    method: 'POST',
    body: JSON.stringify({
        Service_name: document.querySelector('#serviceName').value,
        Service_price: document.querySelector('#servicePrice').value,
        Service_description: document.querySelector('#serviceDescription').value
    })
  
  })
      
      
};