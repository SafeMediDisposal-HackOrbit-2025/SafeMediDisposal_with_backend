document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      
      // ADD: Change hamburger icon to X when menu is open
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // ADD: Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // ADD: Close menu when clicking on a nav link
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });

    // ADD: Handle window resize - close menu if window gets larger
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
});