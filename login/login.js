// Wait for DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    const guestBtn = document.getElementById('guestBtn');
    
    // Get error message elements
    const emailError = email.nextElementSibling;
    const passwordError = password.nextElementSibling;

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        email.classList.remove('error');
        password.classList.remove('error');
        emailError.textContent = '';
        passwordError.textContent = '';
        
        let isValid = true;

        // Validate email
        if (!email.value) {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            email.classList.add('error');
            isValid = false;
        } else if (!email.value.includes('@') || !email.value.includes('.')) {
            emailError.textContent = 'Invalid email';
            email.classList.add('error');
            isValid = false;
        }

        // Validate password
        if (!password.value) {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            password.classList.add('error');
            isValid = false;
        } else if (password.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            password.classList.add('error');
            isValid = false;
        }

        // If valid, proceed with login
        if (isValid) {
            loginBtn.textContent = 'Logging in...';
            loginBtn.disabled = true;
            setTimeout(function() {
                window.location.href = '../home/index.html';
            }, 1000);
        }
    });

    // Clear errors when typing
    email.addEventListener('input', function() {
        email.classList.remove('error');
        emailError.textContent = '';
    });
    
    password.addEventListener('input', function() {
        password.classList.remove('error');
        passwordError.textContent = '';
    });

    // Guest button
    guestBtn.addEventListener('click', function() {
        window.location.href = '../home/index.html';
    });
});