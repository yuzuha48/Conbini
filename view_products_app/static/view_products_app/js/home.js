// Search for ID or product name in table
function search() {
    let searchInput = document.getElementById('searchInput');
    let searchTerm = searchInput.value.toLowerCase();

    let filterCategories = document.querySelectorAll('.filterCategory');
    let selectedCategories = Array.from(filterCategories)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.getAttribute('data-category'));

    let allProducts = document.getElementById('products');
    let products = Array.from(allProducts.getElementsByClassName('one_product'));

    products.forEach(function(product) {
        let product_name = product.querySelector('.product_name').textContent.toLowerCase();

        if (selectedCategories.length === 0) {
            if (product_name.includes(searchTerm)) {
                product.style.display = '';
            }
            else {
                product.style.display = 'none';
            }
        }
        else if (selectedCategories.length != 0) {
            if (!searchInput.value) {
                updateFilters();
            }
            else {
                let product_category = product.querySelector('.product_category').textContent;

                if (product_name.includes(searchTerm) && selectedCategories.includes(product_category)) {
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
let filterCategories = document.querySelectorAll('.filterCategory');

filterCategories.forEach((category) => {
    category.addEventListener('change', updateFilters);
});


function updateFilters() {
    let searchInput = document.getElementById('searchInput');
    let searchTerm = searchInput.value.toLowerCase();

    let selectedCategories = Array.from(filterCategories)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.getAttribute('data-category'));

    let allProducts = document.getElementById('products');
    let products = Array.from(allProducts.getElementsByClassName('one_product'));
    
    products.forEach(function(product) {
        if (selectedCategories.length === 0) {
                if (!searchInput.value) {
                    product.style.display = '';
                }
                else {
                    search();
                }
        }
        else if (selectedCategories.length != 0) {
            let product_category = product.querySelector('.product_category').textContent;
        
            if (!searchInput.value) {
                if (selectedCategories.includes(product_category)) {
                    product.style.display = '';
                }
                else {
                    product.style.display = 'none';
                }
            }
            else {
                let product_name = product.querySelector('.product_name').textContent.toLowerCase();

                if (selectedCategories.includes(product_category) && product_name.includes(searchTerm)) {
                    product.style.display = '';
                }
                else {
                    product.style.display = 'none';
                }
            }
        }
    });
}


// Click on product 
let products = Array.from(document.querySelectorAll('.one_product'));

products.forEach((product) => {
    product.addEventListener('click', function() {
        let productId = product.querySelector('.product_id').innerText;
        window.location.href = (`http://127.0.0.1:8000/products/show/${productId}`);
    });
});