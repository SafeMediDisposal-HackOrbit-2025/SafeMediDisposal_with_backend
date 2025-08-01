// Toggle the wrapper (not just the form)
document.getElementById("search-toggle").addEventListener("click", () => {
  const wrapper = document.getElementById("search-wrapper");
  wrapper.style.display = wrapper.style.display === "none" ? "flex" : "none";
});

// Handle form submission
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const selectedValue = document.getElementById("feature-select").value;
  if (selectedValue) {
    window.location.href = `services.html#${selectedValue}`;
  } else {
    alert("Please select a feature.");
  }
});