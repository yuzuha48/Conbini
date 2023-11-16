// Click on the logo to go to the home page 
let logo = document.getElementById('logo');
logo.addEventListener('click', function() {
    window.location.href='http://127.0.0.1:8000/products';
})


// Get card bodies
let shippingBody = document.getElementById('shippingBody');
let billingBody = document.getElementById('billingBody');
let paymentBody = document.getElementById('paymentBody');


// Get error containers
let shippingErrors = document.getElementById('shippingErrors');
let billingErrors = document.getElementById('billingErrors');
let paymentErrors = document.getElementById('paymentErrors');


// Get shipping form elements 
let firstNameElem = document.querySelector('#shippingFirstName');
let lastNameElem = document.querySelector('#shippingLastName');
let addressElem = document.querySelector('#shippingAddress');
let address2Elem = document.querySelector('#shippingAddress2');
let cityElem = document.querySelector('#shippingCity')
let stateElem = document.querySelector('#shippingState');
let zipcodeElem = document.querySelector('#shippingZipcode');


// Save shipping form
let shippingForm = document.getElementById('shippingForm');

shippingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;
    
    // Reset errors
    while (shippingErrors.firstChild) {
        shippingErrors.removeChild(shippingErrors.firstChild);
    }
    
    shippingErrors.classList.remove('alert');
    shippingErrors.classList.remove('alert-danger');
    
    let errors = {};

    // Client-side validations
    first_name = firstNameElem.value;
    if (first_name.length < 2) {
        errors['first_name'] = 'First name must be at least 2 characters.';
    }

    last_name = lastNameElem.value;
    if (last_name.length < 2) {
        errors['last_name'] = 'Last name must be at least 2 characters.';
    }

    address = addressElem.value;
    if (address.length < 5) {
        errors['address'] = 'Address must be at least 5 characters.';
    }

    address2 = address2Elem.value;

    city = cityElem.value;
    if (city.length < 3) {
        errors['city'] = 'City must be at least 3 characters.';
    }

    state = stateElem.value;
    if (state.length !== 2) {
        errors['state'] = "Please enter your state's 2 letter abbreviation.";
    }

    zipcode = zipcodeElem.value;
    if (zipcode.length < 5) {
        errors['zipcode'] = 'Zipcode must have at least 5 numbers.';
    }
    else if (zipcode.length > 10) {
        errors['zipcode'] = 'Zipcode must be less than 10 numbers.';
    }

    // Show errors
    if (Object.keys(errors).length > 0) {
        isValid = false;
        for (let key in errors) {
            let newMessage = document.createElement('p');
            newMessage.innerText = errors[key];
            shippingErrors.appendChild(newMessage);
        }
        shippingErrors.classList.add('alert');
        shippingErrors.classList.add('alert-danger');
    }

    if (isValid) {
        shippingForm = new FormData(this);
        shippingBody.style.display = 'none';
        billingBody.style.display = '';
    };
});


// Get billing form elements 
let billingFirstNameElem = document.querySelector('#billingFirstName');
let billingLastNameElem = document.querySelector('#billingLastName');
let billingAddressElem = document.querySelector('#billingAddress');
let billingAddress2Elem = document.querySelector('#billingAddress2');
let billingCityElem = document.querySelector('#billingCity')
let billingStateElem = document.querySelector('#billingState');
let billingZipcodeElem = document.querySelector('#billingZipcode');


// Set billing fields equal to shipping if user specifies
let sameAsShipping = document.getElementById('same_as_shipping');

sameAsShipping.addEventListener('click', function() {
    billingFirstNameElem.value = first_name;
    billingLastNameElem.value = last_name;
    billingAddressElem.value = address;
    billingAddress2Elem.value = address2;
    billingCityElem.value = city;
    billingStateElem.value = state;
    billingZipcodeElem.value = zipcode;
    sameAsShipping.checked = true;
});


// Save billing form
let billingForm = document.getElementById('billingForm');

billingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    // Reset errors
    while (billingErrors.firstChild) {
        billingErrors.removeChild(billingErrors.firstChild);
    }
    
    billingErrors.classList.remove('alert');
    billingErrors.classList.remove('alert-danger');
    
    let errors = {};

    // Client-side validations
    let b_first_name = billingFirstNameElem.value;
    if (b_first_name.length < 2) {
        errors['b_first_name'] = 'First name must be at least 2 characters.';
    }

    let b_last_name = billingLastNameElem.value;
    if (b_last_name.length < 2) {
        errors['b_last_name'] = 'Last name must be at least 2 characters.';
    }

    let b_address = billingAddressElem.value;
    if (b_address.length < 5) {
        errors['b_address'] = 'Address must be at least 5 characters.';
    }

    let b_city = billingCityElem.value;
    if (b_city.length < 3) {
        errors['b_city'] = 'City must be at least 3 characters.';
    }

    let b_state = billingStateElem.value;
    if (b_state.length !== 2) {
        errors['b_state'] = "Please enter your state's 2 letter abbreviation.";
    }

    let b_zipcode = billingZipcodeElem.value;
    if (b_zipcode.length < 5) {
        errors['b_zipcode'] = 'Zipcode must have at least 5 numbers.';
    }

    // Show errors
    if (Object.keys(errors).length > 0) {
        isValid = false;
        for (let key in errors) {
            let newMessage = document.createElement('p');
            newMessage.innerText = errors[key];
            billingErrors.appendChild(newMessage);
        }
        billingErrors.classList.add('alert');
        billingErrors.classList.add('alert-danger');
    }
    
    if (isValid) {
        billingForm = new FormData(this);
        billingBody.style.display = 'none';
        paymentBody.style.display = '';
    };
});


// Set IDs to null
let shipping_address_id = null;
let billing_address_id = null;
let payment_id = null;


// Get payment form elements
let paymentFormElem = document.getElementById('paymentForm');
let cardNumberElem = document.getElementById('cardNumber'); 
let expirationDateElem = document.getElementById('expirationDate')
let cvvElem = document.getElementById('cvv')


// Submit order
let paymentForm = document.getElementById('paymentForm');

paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    let isSuccess = true;
    let csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Reset errors
    while (paymentErrors.firstChild) {
        paymentErrors.removeChild(paymentErrors.firstChild);
    }
    
    paymentErrors.classList.remove('alert');
    paymentErrors.classList.remove('alert-danger');
    
    let errors = {};

    // Client-side validations
    let card_number = cardNumberElem.value;
    if (card_number.length < 13) {
        errors['card_number'] = 'Card number must be at least 13 numbers.';
    }
    else if (card_number.length > 16) {
        errors['card_number'] = 'Card number must be less than 16 numbers.';
    }
    
    let today = new Date();
    let currentMonth = today.getMonth() + 1; 
    let currentYear = today.getFullYear();
    let expiration_date = expirationDate.value;
    let exp_month_year = expiration_date.split('-');

    if (expiration_date === null) {
        errors['expiration_date'] = 'Please enter an expiration date.';
    }
    else if (exp_month_year[0] < currentYear) {
        errors['expiration_date'] = 'Please use a card that has not yet expired.';
    }
    else if (exp_month_year[0] == currentYear && exp_month_year[1] < currentMonth) {
        errors['expiration_date'] = 'Please use a card that has not yet expired.';
    }

    let cvv = cvvElem.value;
    if (cvv.length !== 3 && cvv.length !== 4) {
        errors['cvv'] = 'CVV must be 3 or 4 numbers.';
    }

    // Show errors
    if (Object.keys(errors).length > 0) {
        isValid = false;
        for (let key in errors) {
            let newMessage = document.createElement('p');
            newMessage.innerText = errors[key];
            paymentErrors.appendChild(newMessage);
        }
        paymentErrors.classList.add('alert');
        paymentErrors.classList.add('alert-danger');
    }

    if (isValid) {
        paymentForm = new FormData(this);

        // Create fetch requests
        let saveShipping = fetch('http://127.0.0.1:8000/orders/save_shipping', {
            method: 'POST',
            body: shippingForm,
            headers: {
                "X-CSRFToken": csrfToken,
            }
        });
        
        let saveBilling = fetch('http://127.0.0.1:8000/orders/save_billing', {
            method: 'POST',
            body: billingForm,
            headers: {
                "X-CSRFToken": csrfToken,
            }
        });
        
        let savePayment = fetch('http://127.0.0.1:8000/orders/save_payment', {
            method: 'POST',
            body: paymentForm,
            headers: {
                "X-CSRFToken": csrfToken,
            }
        });

        let requests = [saveShipping, saveBilling, savePayment];

        // Submit order once all information is saved
        Promise.all(requests)
            .then(responses => {
                let promiseArray = responses.map(response => response.json());
                return Promise.all(promiseArray);
            })
            .then(dataArray => {
                dataArray.forEach(data => {
                    if (!data.success) {
                        if (data.error_messages) {
                            if (data.shipping) {
                                for (let key in data.error_messages) {
                                    let newMessage = document.createElement('p');
                                    newMessage.innerText = data.error_messages[key];
                                    shippingErrors.appendChild(newMessage);
                                }
                                shippingErrors.classList.add('alert');
                                shippingErrors.classList.add('alert-danger');
            
                                shippingBody.style.display = '';
                            }
                            if (data.billing) {
                                for (let key in data.error_messages) {
                                    let newMessage = document.createElement('p');
                                    newMessage.innerText = data.error_messages[key];
                                    billingErrors.appendChild(newMessage);
                                }
                                billingErrors.classList.add('alert');
                                billingErrors.classList.add('alert-danger');
                                
                                billingBody.style.display = '';
                            }
                            if (data.payment) {
                                for (let key in data.error_messages) {
                                    let newMessage = document.createElement('p');
                                    newMessage.innerText = data.error_messages[key];
                                    paymentErrors.appendChild(newMessage);
                                }
                                paymentErrors.classList.add('alert');
                                paymentErrors.classList.add('alert-danger');
                            }
                            isSuccess = false;
                        }
                    }
                    else if (data.success) {
                        if (data.shipping_address_id) {
                            shipping_address_id = data.shipping_address_id;
                        }
                        if (data.billing_address_id) {
                            billing_address_id = data.billing_address_id;
                        }
                        if (data.payment_id) {
                            payment_id = data.payment_id;
                        }
                    }
                })
                if (isSuccess) {
                    let submitForm = new FormData();
                    
                    submitForm.append('shipping_address_id', shipping_address_id)
                    submitForm.append('billing_address_id', billing_address_id)
                    submitForm.append('payment_id', payment_id)
                    submitForm.append("csrfmiddlewaretoken", csrfToken)
            
                    fetch('http://127.0.0.1:8000/orders/submit', {
                        method: 'POST',
                        body: submitForm, 
                        headers: {
                            "X-CSRFToken": csrfToken,
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            window.location.href = `http://127.0.0.1:8000/checkout/success/${data.order_id}`;
                        }
                    })
                    .catch(error => {
                        console.error('Error: ', error);
                    });
                }
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }
});


// Edit shipping form
let editShipping = document.getElementById('editShipping');

editShipping.addEventListener('click', function() {
    shippingBody.style.display = '';
    billingBody.style.display = 'none';
    paymentBody.style.display = 'none';

    if (sameAsShipping.checked) {
        firstNameElem.addEventListener('input', function() {
            billingFirstNameElem.value = firstNameElem.value;
        });
        
        lastNameElem.addEventListener('input', function() {
            billingLastNameElem.value = lastNameElem.value;
        });
        
        addressElem.addEventListener('input', function() {
            billingAddressElem.value = addressElem.value;
        });
        
        address2Elem.addEventListener('input', function() {
            billingAddress2Elem.value = address2Elem.value;
        });
        
        cityElem.addEventListener('input', function() {
            billingCityElem.value = cityElem.value;
        });
        
        stateElem.addEventListener('input', function() {
            billingStateElem.value = stateElem.value;
        });
        
        zipcodeElem.addEventListener('input', function() {
            billingZipcodeElem.value = zipcodeElem.value;
        });
    }
});


// Edit billing form
let editBilling = document.getElementById('editBilling');

editBilling.addEventListener('click', function() {
    billingBody.style.display = '';
    shippingBody.style.display = 'none';
    paymentBody.style.display = 'none';
});


// Edit payment form
let editPayment = document.getElementById('editPayment');

editPayment.addEventListener('click', function() {
    paymentBody.style.display = '';
    shippingBody.style.display = 'none';
    billingBody.style.display = 'none';
});