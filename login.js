document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form');
  if (!form) return;

  const messageElement = document.getElementById('login-message');
  if (!messageElement) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Clear any previous messages
    messageElement.textContent = '';
    messageElement.className = '';

    const email = document.getElementById('e-mail').value.trim();
    const password = form.querySelector('input[type="password"]').value;

    if (!email || !password) {
      messageElement.textContent = 'Please enter both email and password.';
      messageElement.className = 'error';
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the secure token to manage the session
        localStorage.setItem('authToken', data.token);
        // Immediately redirect to the profile page on success
        window.location.href = 'profile.html';
      } else {
        // Show the error message from the server in the message element
        const data = await response.json();
        messageElement.textContent = data.msg;
        messageElement.className = 'error';
      }
    } catch (error) {
      console.error('Login Error:', error);
      messageElement.textContent = 'An error occurred during login.';
      messageElement.className = 'error';
    }
  });
});