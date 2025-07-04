document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const messageDiv = document.getElementById('message');
  const loginButton = document.getElementById('loginButton');

  if (loginButton) {
    loginButton.addEventListener('click', () => {
      window.location.href = '../login/login.html';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (password.length < 8) {
      messageDiv.textContent = 'Password must be at least 8 characters.';
      messageDiv.style.color = 'red';
      return;
    }

    const existing = localStorage.getItem(`user-${email}`);
    if (existing) {
      messageDiv.textContent = 'Account already exists. Forgot password?';
      messageDiv.style.color = 'red';
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password
    };

    localStorage.setItem(`user-${email}`, JSON.stringify(userData));
    localStorage.setItem('currentUser', email);

    messageDiv.textContent = 'Account created successfully.';
    messageDiv.style.color = 'green';

    form.reset();

    setTimeout(() => {
      window.location.href = '../login/login.html';
    }, 1500);
  });
});

