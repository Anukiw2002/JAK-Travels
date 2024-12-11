document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const body = document.body;

    if (!hamburger || !navLinks) {
      console.error("Menu elements not found!");
      return;
    }

    function toggleMenu() {
      console.log("Toggle menu clicked"); // Add this for debugging
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      body.classList.toggle("menu-open");
    }

    hamburger.addEventListener("click", toggleMenu);

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
          toggleMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 992 &&
        navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        toggleMenu();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992 && navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  }, 100);
});
