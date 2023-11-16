// Click on the logo to go to the orders page 
let logo = document.getElementById('logo');
logo.addEventListener('click', function() {
    window.location.href='http://127.0.0.1:8000/staff/orders';
})


// Search for order ID, customer name, order date, or shipping address in table
function search() {
    let searchInput = document.getElementById('searchInput');
    let allOrders = document.getElementById('allOrders');
    let orders = Array.from(allOrders.getElementsByClassName('one_order'));
    let searchTerm = searchInput.value.toLowerCase();

    orders.forEach(function(order) {
        let order_id = order.querySelector('.order_id').textContent;
        let customer_name = order.querySelector('.customer_name').textContent.toLowerCase();
        let order_date = order.querySelector('.order_date').textContent.toLowerCase();
        let shipping_address = order.querySelector('.shipping_address').textContent.toLowerCase();

        if (order_id.includes(searchTerm) || customer_name.includes(searchTerm) || order_date.includes(searchTerm) || shipping_address.includes(searchTerm)) {
            order.style.display = '';
        }
        else {
            order.style.display = 'none';
        }
    });
}


// Filter by status 
function filter() {
    let filterStatus = document.getElementById('filterStatus');
    let allOrders = document.getElementById('allOrders');
    let orders = Array.from(allOrders.getElementsByClassName('one_order'));
    let status = filterStatus.value;

    orders.forEach(function(order) {
        let order_status = order.querySelector('.status').value;

        if (status == 'none') {
            order.style.display = '';
        }
        else if (status.includes(order_status)) {
            order.style.display = '';
        }
        else {
            order.style.display = 'none';
        }
    });
};


// Update status
let orders = Array.from(document.querySelectorAll('.one_order'));
let csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

orders.forEach(function(order) {
    let statusElem = order.querySelector('.status');
    let orderId = order.querySelector('.order_id').innerText;

    statusElem.addEventListener('change', function(e) {
        e.preventDefault(); 
        let status = this.value;
        let formData = new FormData();
        formData.append('status', status);
    
        fetch(`http://127.0.0.1:8000/staff/orders/update_status/${orderId}`, {
            method: 'POST', 
            body: formData,
            headers: {
                "X-CSRFToken": csrfToken,
            }
        })
        .then(response => response.json())
        .then(data)
        .catch(error => {
            console.error('Error: ', error);
        });
    })
})


