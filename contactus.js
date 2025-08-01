document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const messageElement = document.getElementById("form-message");

  if (!submitButton || !messageElement) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitButton.disabled = true;
    messageElement.textContent = '';
    messageElement.className = '';

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!firstName || !lastName || !email || !message) {
      messageElement.textContent = "Please fill in all the fields.";
      messageElement.className = 'error';
      submitButton.disabled = false;
      return;
    }

    try {
      const response = await fetch('/api/contact/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, message }),
      });

      const resultText = await response.text();
      messageElement.textContent = resultText;

      if (response.ok) {
        messageElement.className = 'success';
        form.reset();
      } else {
        messageElement.className = 'error';
      }
    } catch (error) {
      console.error('Contact Form Error:', error);
      messageElement.textContent = 'An error occurred while sending your message.';
      messageElement.className = 'error';
    } finally {
      submitButton.disabled = false;
    }
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});