document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signin-form');
  if (!form) return;
  
  const messageElement = document.getElementById('signin-message');
  if (!messageElement) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Clear previous messages
    messageElement.textContent = '';
    messageElement.className = '';

    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const email = document.getElementById('e-mail').value.trim();
    const passwordFields = form.querySelectorAll('input[type="password"]');
    const password = passwordFields[0].value;
    const confirmPassword = passwordFields[1].value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      messageElement.textContent = 'Please fill in all fields.';
      messageElement.className = 'error';
      return;
    }

    if (password !== confirmPassword) {
      messageElement.textContent = 'Passwords do not match.';
      messageElement.className = 'error';
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // On success, save the new token and redirect to profile
        messageElement.textContent = 'Registration successful! Redirecting...';
        messageElement.className = 'success';
        localStorage.setItem('authToken', data.token);
        // Add a small delay so the user can see the success message before redirecting
        setTimeout(() => {
          window.location.href = 'profile.html';
        }, 1500); // 1.5 second delay
      } else {
        // Show error from server (e.g., "User already exists")
        messageElement.textContent = data.msg;
        messageElement.className = 'error';
      }
    } catch (error) {
      console.error('Sign-up Error:', error);
      messageElement.textContent = 'An error occurred during sign-up.';
      messageElement.className = 'error';
    }
  });
});