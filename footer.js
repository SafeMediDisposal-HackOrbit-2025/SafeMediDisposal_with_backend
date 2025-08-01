// 👇 Auto-update the copyright year
document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  if (yearSpan) {
    yearSpan.textContent = currentYear;
  }

  // 👇 Scroll to top button visibility
  const scrollBtn = document.getElementById("scrollToTopBtn");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    // 👇 Scroll to top behavior
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
// This script updates the copyright year and manages the scroll-to-top button functionality.
// It ensures the year is always current and provides a smooth user experience for navigating back to the