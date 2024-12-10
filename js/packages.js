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
