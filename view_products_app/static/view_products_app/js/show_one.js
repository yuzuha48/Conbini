// Click on the logo to go to the home page
let logo = document.getElementById('logo');
logo.addEventListener('click', function() {
    window.location.href='http://127.0.0.1:8000/products';
})


// Add item to cart
let addToCartForm = document.getElementById('addToCartForm'); 

addToCartForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let productId = document.getElementById('product_id').innerText;
    
    // Reset success message 
    while (successMessage.firstChild) {
        successMessage.removeChild(successMessage.firstChild);
    }
    
    successMessage.classList.remove('alert');
    successMessage.classList.remove('alert-success');

    // Reset errors
    let errorContainer = document.getElementById('addToCartErrors');
    while (errorContainer.firstChild) {
        errorContainer.removeChild(errorContainer.firstChild);
    }
    
    errorContainer.classList.remove('alert');
    errorContainer.classList.remove('alert-danger');
    
    let formData = new FormData(this);

    fetch(`http://127.0.0.1:8000/cart/add/${productId}`, {
        method: 'POST', 
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            if (data.error_messages) {
                for (let key in data.error_messages) {
                    let newMessage = document.createElement('p');
                    newMessage.innerText = data.error_messages[key];
                    errorContainer.appendChild(newMessage);
                }
                errorContainer.classList.add('alert');
                errorContainer.classList.add('alert-danger');
            }
        }
        else {
            let cart = document.getElementById('cart');
            let quantity = document.getElementById('quantity').value;
            let successMessage = document.getElementById('successMessage');

            let updated_cart = parseInt(cart.innerText) + parseInt(quantity);

            cart.innerText = updated_cart;

            let message = document.createElement('p');

            if (quantity == 1) {
                message.innerText = 'Item added to cart.';
            }
            else {
                message.innerText = 'Items added to cart.';
            }

            successMessage.appendChild(message);

            successMessage.classList.add('alert');
            successMessage.classList.add('alert-success');

            successMessage.style.opacity = 1;

            setTimeout(function() {
                successMessage.style.opacity = 0;
            }, 2500);
        }
    })
    .catch(error => {
        console.error('Error: ', error);
    });
});

