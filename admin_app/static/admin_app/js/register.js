let registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let firstNameElem = document.getElementById('first_name');
    let lastNameElem = document.getElementById('last_name');
    let emailElem = document.getElementById('email');
    let passwordElem = document.getElementById('password');
    let confirmPwElem = document.getElementById('confirm_pw');
    let isValid = true;
    
    let errorContainer = document.getElementById('registerErrors');
    while (errorContainer.firstChild) {
        errorContainer.removeChild(errorContainer.firstChild);
    }

    errorContainer.classList.remove('alert');
    errorContainer.classList.remove('alert-danger');

    let errors = {}

    let first_name = firstNameElem.value;
    if (first_name.length < 2) {
        errors['first_name'] = 'First name should be at least 2 characters.';
    }

    let last_name = lastNameElem.value;
    if (last_name.length < 2) {
        errors['last_name'] = 'Last name should be at least 2 characters.';
    }

    let email = emailElem.value;
    if (!email) {
        errors['email'] = 'Please enter an email address.';
    }
    else if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        errors['email'] = 'Invalid email address.';
    }

    let password = passwordElem.value;
    if (password.length < 8) {
        errors['password'] = 'Password should be at least 8 characters.'
    }

    let confirm_pw = confirmPwElem.value;
    if (password != confirm_pw) {
        errors['confirm_pw'] = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
        isValid = false;
        for (let key in errors) {
            let newMessage = document.createElement('p');
            newMessage.innerText = errors[key];
            errorContainer.appendChild(newMessage);
        }
        errorContainer.classList.add('alert');
        errorContainer.classList.add('alert-danger');
    }

    if (isValid) {
        let formData = new FormData(this);

        fetch('http://127.0.0.1:8000/staff/register', {
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
                window.location.href = 'http://127.0.0.1:8000/staff/orders';
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    };
});
