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

        if (!isValid) return;

        // Check localStorage for user data
        const emailKey = `user-${email.value.toLowerCase().trim()}`;  
        const userDataJson = localStorage.getItem(emailKey);

        if (!userDataJson) {
            emailError.textContent = 'Account does not exist. Please register.';
            email.classList.add('error');
            return;
        }

        const userData = JSON.parse(userDataJson);

        // Check password
        if (userData.password !== password.value) {
            passwordError.textContent = 'Incorrect password';
            password.classList.add('error');
            return;
        }

        // Successful login
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;

        // Save current user in localStorage
        localStorage.setItem('currentUser', email.value.toLowerCase().trim());
        localStorage.setItem('isGuest', 'false');  // mark as logged-in

        setTimeout(function() {
            window.location.href = '../home/index.html';
        }, 1000);
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
    if (guestBtn) {
      guestBtn.addEventListener('click', function() {
          localStorage.setItem('isGuest', 'true'); // mark as guest user
          localStorage.removeItem('currentUser'); 
          window.location.href = '../home/index.html';
      });
    }
});
