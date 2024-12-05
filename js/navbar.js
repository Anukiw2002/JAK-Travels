// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const dropdowns = document.querySelectorAll(".dropdown");

hamburger.addEventListener("click", () => {
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !isExpanded);
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");

  // Prevent body scroll when menu is open
  document.body.style.overflow = isExpanded ? "auto" : "hidden";
});

// Handle dropdowns in mobile view
dropdowns.forEach((dropdown) => {
  const link = dropdown.querySelector(".nav-link");

  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      dropdown.classList.toggle("active");
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 992) {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "auto";
    }
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (
      window.innerWidth <= 992 &&
      !link.parentElement.classList.contains("dropdown")
    ) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "auto";
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add scrolled class for styling
  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Handle keyboard navigation
const handleTabKey = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
  }
};

window.addEventListener("keydown", handleTabKey);
