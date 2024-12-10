// Animation timing configurations
const ANIMATION_CONFIG = {
  scrollReveal: {
    threshold: 0.15,
    rootMargin: "0px",
  },
  staggerDelay: 100,
  defaultDuration: 600,
};

// Helper function to handle fetch errors
const handleFetchError = (error, context) => {
  console.error(`Error loading ${context}:`, error);
};

// Helper function for staggered animations
const animateWithStagger = (elements, className, baseDelay = 0) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(className);
    }, baseDelay + index * ANIMATION_CONFIG.staggerDelay);
  });
};

// Enhanced scroll reveal initialization
const initScrollReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add revealed class to the main element
        entry.target.classList.add("revealed");

        // Handle section-specific animations
        if (entry.target.classList.contains("section-header")) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }

        // Handle grid cards
        if (entry.target.classList.contains("grid-3")) {
          const cards = entry.target.querySelectorAll(".highlight-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 100 * index);
          });
        }

        // Handle package details
        if (entry.target.classList.contains("package-details")) {
          const items = entry.target.querySelectorAll(".detail-item");
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateX(0)";
            }, 100 * index);
          });
        }

        // Handle map section
        if (entry.target.classList.contains("map-section")) {
          const mapContainer = entry.target.querySelector(".map-container");
          const mapInfo = entry.target.querySelector(".map-info");

          if (mapContainer) {
            mapContainer.style.opacity = "1";
            mapContainer.style.transform = "translateY(0)";
          }

          if (mapInfo) {
            const items = mapInfo.querySelectorAll(".item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, 200 + 100 * index);
            });
          }
        }

        // Handle itinerary section
        if (entry.target.classList.contains("day-card")) {
          const activities = entry.target.querySelectorAll(".activity-block");
          activities.forEach((activity, index) => {
            setTimeout(() => {
              activity.style.opacity = "1";
              activity.style.transform = "translateX(0)";
            }, 100 * index);
          });
        }
      }
    });
  }, ANIMATION_CONFIG.scrollReveal);

  // Observe all relevant elements
  const elementsToObserve = [
    ".section-header",
    ".grid-3",
    ".package-details",
    ".map-section",
    ".day-card",
    ".scroll-reveal",
  ].join(",");

  document.querySelectorAll(elementsToObserve).forEach((element) => {
    observer.observe(element);
  });
};

// Initialize hero section animations
const initHeroAnimations = () => {
  const heroElements = {
    title: document.querySelector(".hero-title"),
    subtitle: document.querySelector(".hero-subtitle"),
    image: document.querySelector(".hero-image"),
  };

  if (heroElements.title && heroElements.subtitle && heroElements.image) {
    heroElements.image.style.animation = "kenBurns 30s infinite";
    heroElements.title.style.animation =
      "slideInFromLeft 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards";
    heroElements.subtitle.style.animation =
      "slideInFromRight 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s forwards";
  }
};

// Initialize map loading animation
const initMapLoading = () => {
  const mapContainer = document.querySelector(".map-container");
  if (mapContainer) {
    const loadingIndicator = mapContainer.querySelector(".map-loading");
    if (loadingIndicator) {
      loadingIndicator.style.display = "block";

      const mapIframe = mapContainer.querySelector("iframe");
      if (mapIframe) {
        mapIframe.addEventListener("load", () => {
          loadingIndicator.style.display = "none";
          mapContainer.style.opacity = "1";
        });
      }
    }
  }
};

// Initialize interactive elements
const initInteractiveElements = () => {
  // Card hover effects
  document.querySelectorAll(".highlight-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // Activity block hover effects
  document.querySelectorAll(".activity-block").forEach((block) => {
    block.addEventListener("mouseenter", () => {
      const image = block.querySelector(".activity-image");
      if (image) image.style.transform = "scale(1.05)";
    });

    block.addEventListener("mouseleave", () => {
      const image = block.querySelector(".activity-image");
      if (image) image.style.transform = "scale(1)";
    });
  });
};

// Main initialization
const initializeApp = () => {
  // Set initial opacity for elements that will be animated
  document
    .querySelectorAll(
      ".section-header, .highlight-card, .detail-item, .map-container, .map-info .item, .activity-block"
    )
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

  initScrollReveal();
  initHeroAnimations();
  loadExternalContent();
  initMapLoading();
  initInteractiveElements();
};

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initMapLoading, 250);
});

function handleFormSubmit(event) {
  event.preventDefault();

  // Get form and success message elements
  const form = document.getElementById("packageEnquiryForm");
  const successMessage = document.getElementById("successMessage");

  // Basic form validation
  if (!form.checkValidity()) {
    return false;
  }

  if (!validateForm()) {
    return;
  }

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Here you would typically send the data to your server
  // For demo purposes, we'll just show the success message
  console.log("Form Data:", data);

  // Hide form and show success message
  form.style.display = "none";
  successMessage.style.display = "block";
  successMessage.classList.add("show");

  // Optional: Reset form after submission
  form.reset();

  // Optional: Hide success message after some time
  setTimeout(() => {
    form.style.display = "block";
    successMessage.style.display = "none";
    successMessage.classList.remove("show");
  }, 5000);
}

document.addEventListener("DOMContentLoaded", function () {
  // Get date input elements
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  // Calculate today's date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format dates for input min attribute
  const todayFormatted = today.toISOString().split("T")[0];
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  // Set minimum dates
  startDateInput.min = todayFormatted;
  endDateInput.min = tomorrowFormatted;

  // Handle start date changes
  startDateInput.addEventListener("change", function () {
    // Calculate minimum end date (day after selected start date)
    const selectedStart = new Date(this.value);
    const minEnd = new Date(selectedStart);
    minEnd.setDate(minEnd.getDate() + 1);

    // Update end date minimum
    endDateInput.min = minEnd.toISOString().split("T")[0];

    // Clear end date if it's now invalid
    if (
      endDateInput.value &&
      new Date(endDateInput.value) <= new Date(this.value)
    ) {
      endDateInput.value = "";
    }
  });
});
// Add form validation
function validateForm() {
  const startDate = new Date(document.getElementById("startDate").value);
  const endDate = new Date(document.getElementById("endDate").value);

  if (endDate < startDate) {
    alert("End date must be after start date");
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  // Set minimum date as today for start date
  const today = new Date().toISOString().split("T")[0];
  startDateInput.min = today;

  // Update end date minimum when start date changes
  startDateInput.addEventListener("change", function () {
    endDateInput.min = this.value;

    // If end date is before new start date, update it
    if (endDateInput.value && endDateInput.value < this.value) {
      endDateInput.value = this.value;
    }
  });

  // Form submission handler
  const form = document.getElementById("classicPackageForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show success message
    form.style.display = "none";
    const successMessage = document.getElementById("successMessage");
    successMessage.style.display = "block";
    successMessage.classList.add("show");

    // Optional: Reset form after submission
    form.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      form.style.display = "block";
      successMessage.style.display = "none";
      successMessage.classList.remove("show");
    }, 5000);
  });
});

function validateForm() {
  const startDate = new Date(document.getElementById("startDate").value);
  const endDate = new Date(document.getElementById("endDate").value);
  const adults = document.getElementById("adults").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (endDate < startDate) {
    alert("End date must be after start date");
    return false;
  }

  if (adults < 1) {
    alert("At least one adult is required");
    return false;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  if (!validatePhone(phone)) {
    alert("Please enter a valid phone number");
    return false;
  }

  return true;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10,}$/.test(phone.replace(/[^0-9]/g, ""));
}

// Handle Floating Book Button
document.addEventListener("DOMContentLoaded", function () {
  const floatingBtn = document.getElementById("floatingBookBtn");
  const enquirySection = document.querySelector(".enquiry-section");

  // Show/hide floating button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight) {
      floatingBtn.classList.add("visible");
    } else {
      floatingBtn.classList.remove("visible");
    }
  });

  // Scroll to enquiry form when clicking the button
  floatingBtn.addEventListener("click", function () {
    enquirySection.scrollIntoView({ behavior: "smooth" });
  });

  // Smooth scroll for quick navigation links
  document.querySelectorAll(".quick-nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Make itinerary collapsible
document.addEventListener("DOMContentLoaded", function () {
  const dayCards = document.querySelectorAll(".day-card");

  dayCards.forEach((card, index) => {
    const header = card.querySelector(".day-header");
    const activities = card.querySelector(".activities-container");

    // Only show first two days by default
    if (index > 1) {
      activities.style.display = "none";
    }

    // Add expand/collapse arrow
    const arrow = document.createElement("i");
    arrow.className = "fas fa-chevron-down day-arrow";
    header.appendChild(arrow);

    header.style.cursor = "pointer";
    header.addEventListener("click", function () {
      const isExpanded = activities.style.display !== "none";

      activities.style.display = isExpanded ? "none" : "block";
      arrow.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
    });
  });
});
