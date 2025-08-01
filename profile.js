document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('authToken');

  // If no token is found, redirect to the login page
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Fetch the user's profile data from the secure endpoint
  fetch('/api/user/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        // If token is invalid or expired, log out the user
        throw new Error('Session expired');
      }
      return res.json();
    })
    .then(user => {
      // Populate the page with the fetched user data
      document.getElementById('helloName').textContent = `Hello, ${user.firstName}!`;
      document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`.trim();
      document.getElementById('profileEmail').textContent = user.email;

      // Prefill the edit form
      document.getElementById('editFirstName').value = user.firstName;
      document.getElementById('editLastName').value = user.lastName;
      document.getElementById('editEmail').value = user.email;
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
      logOut(); // If anything goes wrong, clear the token and redirect to login
    });
});

async function saveChanges() {
  const token = localStorage.getItem('authToken');
  const firstName = document.getElementById('editFirstName').value.trim();
  const lastName = document.getElementById('editLastName').value.trim();
  const email = document.getElementById('editEmail').value.trim();

  if (!firstName || !email) {
    alert('First name and email are required.');
    return;
  }

  try {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ firstName, lastName, email })
    });

    const data = await response.json();
    alert(data.msg);

    if (response.ok) {
      location.reload(); // Reload the page to show updated info
    }

  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile.');
  }
}

function logOut() {
  localStorage.removeItem('authToken');
  window.location.href = 'login.html';
}
