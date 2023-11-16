// Click on the logo to go to the orders page 
let logo = document.getElementById('logo');
logo.addEventListener('click', function() {
    window.location.href='http://127.0.0.1:8000/staff/orders';
})


// Search for ID or product name in table
function search() {
    let searchInput = document.getElementById('searchInput');
    let searchTerm = searchInput.value.toLowerCase();

    let filterCategory = document.getElementById('filterCategory');
    let category = filterCategory.value;

    let allProducts = document.getElementById('allProducts');
    let products = Array.from(allProducts.getElementsByClassName('one_product'));

    products.forEach(function(product) {
        let product_id = product.querySelector('.product_id').textContent;
        let product_name = product.querySelector('.product_name').textContent.toLowerCase();

        if (category === "none") {
            if (product_name.includes(searchTerm) || product_id.includes(searchTerm)) {
                product.style.display = '';
            }
            else {
                product.style.display = 'none';
            }
        }
        else {
            if (!searchInput.value) {
                filter();
            }
            else {
                let product_category = product.querySelector('.product_category').textContent;
                
                if (category.includes(product_category) && (product_name.includes(searchTerm) || product_id.includes(searchTerm))) {
                    product.style.display = '';
                }
                else {
                    product.style.display = 'none';
                }
            }
        }
    });
}


// Filter by category 
function filter() {
    let searchInput = document.getElementById('searchInput');
    let searchTerm = searchInput.value.toLowerCase();

    let filterCategory = document.getElementById('filterCategory');
    let category = filterCategory.value;

    let allProducts = document.getElementById('allProducts');
    let products = Array.from(allProducts.getElementsByClassName('one_product'));

    products.forEach(function(product) {
        if (category === "none") {
            if (!searchInput.value) {
                product.style.display = '';
            }
            else {
                search();
            }
        }
        else {
            let product_category = product.querySelector('.product_category').textContent;

            if (!searchInput.value) {
                if (category.includes(product_category)) {
                    product.style.display = '';
                }
                else {
                    product.style.display = 'none';
                }
            }
            else {
                let product_id = product.querySelector('.product_id').textContent;
                let product_name = product.querySelector('.product_name').textContent.toLowerCase();

                if (category.includes(product_category) && (product_name.includes(searchTerm) || product_id.includes(searchTerm))) {
                    product.style.display = '';
                }
                else {
                    product.style.display = 'none';
                }
            }

        }
    });
};


// Open the Add Product modal
let addProductButton = document.getElementById('addProductButton');
let addProductModal = document.getElementById('addProductModal');
let addProductBsModal = new bootstrap.Modal(document.getElementById('addProductModal'));

addProductButton.addEventListener('click', function(e) {

    // Get form elements
    let errorContainer = addProductModal.querySelector('#addProductErrors')
    let productNameElem = addProductModal.querySelector('#product_name');
    let priceElem = addProductModal.querySelector('#price');
    let descElem = addProductModal.querySelector('#desc');
    let categoryElem = addProductModal.querySelector('#category');
    let imagesElem = addProductModal.querySelector('#images');
    let selectedImagesElem = addProductModal.querySelector('#selectedImages');

    // Empty the form before showing it, so we don't see previous values
    errorContainer.innerHTML = ''
    errorContainer.classList.remove('alert');
    errorContainer.classList.remove('alert-danger');
    productNameElem.value = ''
    priceElem.value = ''
    descElem.value = ''
    categoryElem.value = 'none'
    imagesElem.value = ''
    selectedImagesElem.innerHTML = ''

    addProductBsModal.show();

    // Delete an image
    let allImages = Array.from(selectedImagesElem.querySelectorAll('li'));

    allImages.forEach((oneImage) => {

        let deleteLink = oneImage.querySelector('a'); 

        deleteLink.addEventListener('click', function(e) {
            e.preventDefault(); 
            oneImage.remove();
        });
    });
})


// Add name of selected images underneath the Choose Files form input 
let images = addProductModal.querySelector('#images');
let addSelectedImagesList = addProductModal.querySelector('#selectedImages');

images.addEventListener('change', function() {
    addSelectedImagesList.innerHTML = '';
    let selectedImages = Array.from(images.files);

    selectedImages.forEach(file => {
        addSelectedImagesList.innerHTML += `<li>
        <div class="about_image">
        <p class="image_name">${file.name}</p>
        </div>
        <div class="action">
        <div class="main_image">
        <input type="radio" class="radio" id="${file.name}" name="main_image" value="${file.name}">
        <label for="${file.name}"> main</label>
        </div>
        <a>delete</a>
        </div>
        </li>`;
    })

    // Delete an image
    let allImages = Array.from(addSelectedImagesList.querySelectorAll('li'));

    allImages.forEach((oneImage) => {

        let deleteLink = oneImage.querySelector('a'); 

        deleteLink.addEventListener('click', function(e) {
            e.preventDefault(); 
            oneImage.remove();

            if (!addSelectedImagesList.innerHTML) {
                images.value = "";
            }
        });
    });
})


// Scroll to top of Add Product modal
function scrollToTopOfAddModal() {
    let topOfAddModal = document.getElementById('addProductModal'); 

    if (topOfAddModal) {
        topOfAddModal.scrollTop = 0;
    }
}


// Add a new product
let addProductForm = document.getElementById('addProductForm')
addProductForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form elements 
    let productNameElem = addProductForm.querySelector('#product_name');
    let priceElem = addProductForm.querySelector('#price');
    let descElem = addProductForm.querySelector('#desc');
    let categoryElem = addProductForm.querySelector('#category');
    let inventoryCountElem = addProductForm.querySelector('#inventory_count')
    let imagesElem = addProductForm.querySelector('#images');
    let radioButtons = document.querySelectorAll('.radio');
    let isValid = true;

    // Reset errors
    let errorContainer = document.getElementById('addProductErrors');
    while (errorContainer.firstChild) {
        errorContainer.removeChild(errorContainer.firstChild);
    }
    
    errorContainer.classList.remove('alert');
    errorContainer.classList.remove('alert-danger');
    
    let errors = {};
    
    // Client-side validations
    let product_name = productNameElem.value;
    if (product_name.length < 2) {
        errors['product_name'] = 'Product name must be at least 2 characters.';
    }

    let price = priceElem.value;
    if (price < 0) {
        errors['price'] = 'Please enter a valid price.';
    }
    
    let desc = descElem.value;
    if (desc.length < 5) {
        errors['desc'] = 'Description must be at least 5 characters.';
    }
    
    let category = categoryElem.value;
    if (category == "none") {
        errors['category'] = 'Please choose a category.';
    }

    let inventoryCount = inventoryCountElem.value;
    if (inventoryCount < 0) {
        errors['inventory_count'] = 'Please enter a valid inventory count.';
    }
    
    let images = imagesElem.value;
    let selectedImages = addSelectedImagesList.innerHTML;
    if (!images && !selectedImages) {
        errors['images'] = 'Please upload an image.';
    }

    let noSelection = !Array.from(radioButtons).some(button => button.checked);
    if (noSelection) {
        errors['main_image'] = 'Please select a main image.'
    }
    
    // Show errors
    if (Object.keys(errors).length > 0) {
        isValid = false;
        for (let key in errors) {
            let newMessage = document.createElement('p');
            newMessage.innerText = errors[key];
            errorContainer.appendChild(newMessage);
        }
        errorContainer.classList.add('alert');
        errorContainer.classList.add('alert-danger');
        scrollToTopOfAddModal();
    }
    
    if (isValid) {

        let chosenImages = [];
        let selectedImagesArray = Array.from(addSelectedImagesList.querySelectorAll('.image_name'));

        selectedImagesArray.forEach((image) => {
            chosenImages.push(image.innerText);
        })

        let formData = new FormData(this);
        formData.append('selected_images', chosenImages);

        fetch('http://127.0.0.1:8000/staff/products/add', {
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
                window.location.href = 'http://127.0.0.1:8000/staff/products';
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    };
});


// Open the Edit Product Modal 
let allProductsElem = document.getElementById('allProducts');
let allProducts = Array.from(allProductsElem.querySelectorAll('.one_product')); 

allProducts.forEach((product) => {
    let editProduct = product.querySelector('.editProduct');
    let productId = product.querySelector('.product_id').innerText;
    editProduct.addEventListener('click', function(e) {
        fetch(`http://127.0.0.1:8000/staff/products/get/${productId}`)
        .then(response => response.json())
        .then(data => {

            // Reset errors 
            let errorContainer = document.getElementById('editProductErrors');
            while (errorContainer.firstChild) {
                errorContainer.removeChild(errorContainer.firstChild);
            }
            
            errorContainer.classList.remove('alert');
            errorContainer.classList.remove('alert-danger');

            // Get form elements 
            let editProductBsModal = new bootstrap.Modal(document.getElementById('editProductModal'));
            let editProductModal = document.getElementById('editProductModal');
            let titleElem = editProductModal.querySelector('.modal-title');
            let productId = editProductModal.querySelector('#product_id')
            let productNameElem = editProductModal.querySelector('#product_name');
            let priceElem = editProductModal.querySelector('#price');
            let descElem = editProductModal.querySelector('#desc');
            let categoryElem = editProductModal.querySelector('#category');
            let inventoryCountElem = editProductModal.querySelector('#inventory_count');
            let quantitySoldElem = editProductModal.querySelector('#quantity_sold');
            let imagesElem = editProductModal.querySelector('#images');
            let selectedImagesElem = editProductModal.querySelector('#selectedImages');
            imagesElem.value = '';
            selectedImagesElem.innerText = '';
            
            // Set value of form elements 
            titleElem.innerText = `Edit Product - ID ${data.product_id}`;
            productId.innerText = data.product_id;
            productNameElem.value = data.product_name;
            priceElem.value = data.price;
            descElem.value = data.desc;
            categoryElem.value = data.category;
            inventoryCountElem.value = data.inventory_count;
            quantitySoldElem.value = data.quantity_sold;
            
            data.images.forEach((image) => {
                if (image['main'] == 1) {
                    selectedImagesElem.innerHTML += `<li>
                    <div class="about_image">
                    <img src="/media/${image['name']}" alt="${image['name']} Image">
                    <p class="image_name">${image['name']}</p>
                    <p class="hidden imageId">${image['id']}</p>
                    </div>
                    <div class="action">
                    <div class="main_image">
                    <input type="radio" class="radio" id="${image['name']}" name="main_image" value="${image['name']}" checked>
                    <label for="${image['name']}"> main</label>
                    </div>
                    <a>delete</a>
                    </div>
                    </li>`;
                }
                else if (image['main'] == 0) {
                    selectedImagesElem.innerHTML += `<li>
                    <div class="about_image">
                    <img src="/media/${image['name']}" alt="${image['name']} Image">
                    <p class="image_name">${image['name']}</p>
                    <p class="hidden imageId">${image['id']}</p>
                    </div>
                    <div class="action">
                    <div class="main_image">
                    <input type="radio" class="radio" id="${image['name']}" name="main_image" value="${image['name']}">
                    <label for="${image['name']}"> main</label>
                    </div>
                    <a>delete</a>
                    </div>
                    </li>`;
                }
            })
            
            editProductBsModal.show();

            // Delete an image
            let allImages = Array.from(selectedImagesElem.querySelectorAll('li'));

            allImages.forEach((oneImage) => {

                let deleteLink = oneImage.querySelector('a'); 

                deleteLink.addEventListener('click', function(e) {
                    e.preventDefault(); 
                    oneImage.remove();
                });
            });
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    });
});


// Add name of selected images underneath the Choose Files form input 
let editProductModal = document.getElementById('editProductModal');
let editImages = editProductModal.querySelector('#images');
let editSelectedImagesList = editProductModal.querySelector('#selectedImages');

editImages.addEventListener('change', function() {
    let selectedImages = Array.from(editImages.files);
    
    selectedImages.forEach(file => {
        editSelectedImagesList.innerHTML += `<li>
        <div class="about_image">
        <p class="image_name">${file.name}</p>
        </div>
        <div class="action">
        <div class="main_image">
        <input type="radio" class="radio" id="${file.name}" name="main_image" value="${file.name}">
        <label for="${file.name}"> main</label>
        </div>
        <a>delete</a>
        </div>
        </li>`;
    })
    
    // Delete an image
    let allImages = Array.from(editSelectedImagesList.querySelectorAll('li'));

    allImages.forEach((oneImage) => {

        let deleteLink = oneImage.querySelector('a'); 
    
        deleteLink.addEventListener('click', function(e) {
            e.preventDefault(); 
            oneImage.remove();

            if (!editSelectedImagesList.innerHTML) {
                editImages.value = "";
            }
        });
    });
});


// Scroll to top of Edit Product modal to show error messages
function scrollToTopOfEditModal() {
    let topOfEditModal = document.getElementById('editProductModal'); 

    if (topOfEditModal) {
        topOfEditModal.scrollTop = 0;
    }
}


// Edit a product
let editProductForm = document.getElementById('editProductForm');

editProductForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form elements 
    let productId= editProductForm.querySelector('#product_id').innerText;
    let productNameElem = editProductForm.querySelector('#product_name');
    let priceElem = editProductForm.querySelector('#price');
    let descElem = editProductForm.querySelector('#desc');
    let categoryElem = editProductForm.querySelector('#category');
    let inventoryCountElem = editProductForm.querySelector('#inventory_count');
    let quantitySoldElem = editProductForm.querySelector('#quantity_sold');
    let imagesElem = editProductForm.querySelector('#images');
    let radioButtons = document.querySelectorAll('.radio');
    let isValid = true;

    // Reset errors 
    let errorContainer = document.getElementById('editProductErrors');
    while (errorContainer.firstChild) {
        errorContainer.removeChild(errorContainer.firstChild);
    }
    
    errorContainer.classList.remove('alert');
    errorContainer.classList.remove('alert-danger');
    
    let errors = {};
    
    // Client-side validations 
    let product_name = productNameElem.value;
    if (product_name.length < 2) {
        errors['product_name'] = 'Product name must be at least 2 characters.';
    }

    let price = priceElem.value;
    if (price < 0 || !price.match(/^\d+(.\d{1,2})?$/)) {
        errors['price'] = 'Please enter a valid price.';
    }
    
    let desc = descElem.value;
    if (desc.length < 5) {
        errors['desc'] = 'Description must be at least 5 characters.';
    }
    
    let category = categoryElem.value;
    if (category == "none") {
        errors['category'] = 'Please choose a category.';
    }

    let inventoryCount = inventoryCountElem.value;
    if (inventoryCount < 0 || !inventoryCount) {
        errors['inventory_count'] = 'Please enter a valid inventory count.';
    }
    
    let images = imagesElem.value;
    let selectedImages = editSelectedImagesList.innerHTML;
    if (!images && !selectedImages) {
        errors['images'] = 'Please upload an image.';
    }

    let noSelection = !Array.from(radioButtons).some(button => button.checked);
    if (noSelection) {
        errors['main_image'] = 'Please select a main image.'
    }

    // Show errors
    if (Object.keys(errors).length > 0) {
        isValid = false;
        for (let key in errors) {
            let newMessage = document.createElement('p');
            newMessage.innerText = errors[key];
            errorContainer.appendChild(newMessage);
        }
        errorContainer.classList.add('alert');
        errorContainer.classList.add('alert-danger');
        errorContainer.classList.remove('hidden');
        scrollToTopOfEditModal();
    }
    
    if (isValid) {

        let chosenImages = [];
        let selectedImagesArray = Array.from(editSelectedImagesList.querySelectorAll('.image_name'));

        selectedImagesArray.forEach((image) => {
            chosenImages.push(image.innerText);
        })

        let formData = new FormData(this);
        formData.append('selected_images', chosenImages);

        fetch(`http://127.0.0.1:8000/staff/products/edit/${productId}`, {
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
                window.location.href = 'http://127.0.0.1:8000/staff/products';
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    };
});


// Delete a product
allProducts.forEach((product) => {
    let deleteProduct = product.querySelector('.deleteProduct');
    let productId = product.querySelector('.product_id').innerText;
    deleteProduct.addEventListener('click', function(e) {
        fetch(`http://127.0.0.1:8000/staff/products/delete/${productId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                product.remove();
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    });
});
