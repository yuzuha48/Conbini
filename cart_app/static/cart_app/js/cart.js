// Click on the logo to go to the home page 
let logo = document.getElementById('logo');
logo.addEventListener('click', function() {
    window.location.href='http://127.0.0.1:8000/products';
})


// Open the Update Item Modal 
let allProductsElem = document.getElementById('allProducts');
let allProducts = Array.from(allProductsElem.querySelectorAll('.one_product')); 

allProducts.forEach((product) => {
    let updateItem = product.querySelector('.updateItem');
    let quantity = product.querySelector('.quantity').innerText;
    let productId = product.querySelector('.product_id').innerText;

    updateItem.addEventListener('click', function(e) {
        fetch(`http://127.0.0.1:8000/cart/get/${productId}`)
        .then(response => response.json())
        .then(data => {

            // Get form elements 
            let updateItemBsModal = new bootstrap.Modal(document.getElementById('updateItemModal'));
            let updateItemModal = document.getElementById('updateItemModal');
            let productId = updateItemModal.querySelector('#product_id');
            let productNameElem = updateItemModal.querySelector('#product_name');
            let priceElem = updateItemModal.querySelector('#price');
            let descElem = updateItemModal.querySelector('#desc');
            let quantityElem = updateItemModal.querySelector('#quantity');
            let imagesElem = updateItemModal.querySelector('#images');

            while (imagesElem.firstChild) {
                imagesElem.removeChild(imagesElem.firstChild);
            }
            
            // Set value of form elements 
            productId.innerText = data.product_id;
            productNameElem.innerText = data.product_name;
            priceElem.innerText = `$${data.price}`;
            descElem.innerText = data.desc;
            quantityElem.value = quantity

            data.images.forEach((image) => {
                let oneImage = document.createElement('div'); 
                oneImage.classList.add('carousel-item');
                if(image[2] == 1) {
                    oneImage.classList.add('active');
                }
                oneImage.innerHTML = `<img class="d-block w-100" src="/media/${image[1]}" alt="${data.product_name} Image"></img>`; 
                imagesElem.appendChild(oneImage)
            })
            
            updateItemBsModal.show();
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    });
});


// Update an item
let updateItemForm = document.getElementById('updateItemForm');

updateItemForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form elements 
    let productId = updateItemForm.querySelector('#product_id').innerText;
    
    let formData = new FormData(this);

    fetch(`http://127.0.0.1:8000/cart/update/${productId}`, {
        method: 'POST', 
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'http://127.0.0.1:8000/cart';
        }
    })
    .catch(error => {
        console.error('Error: ', error);
    });
});


// Remove an item 
let content = document.getElementById('content');

allProducts.forEach((product) => {
    let removeItem = product.querySelector('.removeItem');
    let productId = product.querySelector('.product_id').innerText;
    let grandTotal = document.getElementById('grandTotal')

    removeItem.addEventListener('click', function(e) {
        fetch(`http://127.0.0.1:8000/cart/remove/${productId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                product.remove();
                grandTotal.innerText = `Grand Total: $${data.grand_total}`

                let cart = document.getElementById('allProducts');

                if (!cart.innerText) {
                    content.innerHTML = `<div class="nothing_in_cart">
                    <div class="alert alert-secondary" role="alert">
                    <h4 class="alert-heading text-center">You don't have anything in your cart</h4>
                    </div>
                    </div>`;
                } 
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    });
});