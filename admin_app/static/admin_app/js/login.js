let loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let emailElem = document.getElementById('email');
    let passwordElem = document.getElementById('password');
    let isValid = true;
    
    let errorContainer = document.getElementById('loginErrors')
    while (errorContainer.firstChild) {
        errorContainer.removeChild(errorContainer.firstChild)
    }

    errorContainer.classList.remove('alert')
    errorContainer.classList.remove('alert-danger')

    let errors = {}

    let email = emailElem.value;
    if (!email) {
        errors['email'] = 'Please enter an email address.';
    }
    else if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        errors['email'] = 'Invalid email address.';
    }

    let password = passwordElem.value;
    if (!password || password.length < 1) {
        errors['password'] = 'Please enter your password.'
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
        let formData = new FormData(this)

        fetch('http://127.0.0.1:8000/staff/login', {
            method: 'POST', 
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                if (data.error_messages) {
                    for (let key in data.error_messages) {
                        let newMessage = document.createElement('p')
                        newMessage.innerText = data.error_messages[key]
                        errorContainer.appendChild(newMessage)
                    }
                    errorContainer.classList.add('alert')
                    errorContainer.classList.add('alert-danger')
                }
            }
            else {
                window.location.href = 'http://127.0.0.1:8000/staff/orders'
            }
        })
        .catch(error => {
            console.error('Error: ', error)
        });
    };
});