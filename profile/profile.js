const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Simulated in-memory database
const users = new Map();

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve HTML and CSS

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (users.has(email)) {
    res.json({ success: false, message: 'Account exists. Forgot password?' });
  } else if (password.length < 8) {
    res.json({ success: false, message: 'Password too weak. Use at least 8 characters.' });
  } else {
    users.set(email, { password, preferences: {} }); // Store preferences if needed
    res.json({ success: true, message: 'Account created successfully. Preferences saved for future sessions.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
    
const form = document.getElementById('registrationForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  messageDiv.textContent = data.message;
  messageDiv.style.color = data.success ? 'green' : 'red';
});