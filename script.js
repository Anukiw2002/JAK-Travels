// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollTop({
        behavior: "smooth",
      });
    });
  });

  // Parallax scrolling effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    document.querySelector(".hero").style.backgroundPositionY =
      -(scrolled * 0.5) + "px";
  });

  // Animate highlights on scroll
  const highlights = document.querySelectorAll(".highlight-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  highlights.forEach((highlight) => {
    highlight.style.opacity = 0;
    highlight.style.transform = "translateY(20px)";
    highlight.style.transition = "all 0.6s ease-out";
    observer.observe(highlight);
  });

  // Gallery image click handler
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", function () {
      const location = this.dataset.location;
      alert(`Loading more details about ${location}...`);
      // Here you would typically open a modal or navigate to a details page
    });
  });

  // Form validation
  const bookingForm = document.querySelector(".booking-form");
  const searchBtn = document.querySelector(".search-btn");

  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const inputs = bookingForm.querySelectorAll("input");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value) {
        isValid = false;
        input.style.border = "2px solid red";
        setTimeout(() => {
          input.style.border = "none";
        }, 3000);
      }
    });

    if (isValid) {
      alert("Thank you! We will contact you shortly with available packages.");
      // Here you would typically handle the form submission
    }
  });

  // Navigation background change on scroll
  window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
      nav.style.background = "rgba(255, 255, 255, 0.95)";
      nav.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    } else {
      nav.style.background = "rgba(255, 255, 255, 0.8)";
      nav.style.boxShadow = "none";
    }
  });
});
