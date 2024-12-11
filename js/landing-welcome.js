// Counter Animation for Statistics
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 20);
}

const observerOptions = {
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("welcome-section")) {
        const statNumbers = Array.from(
          entry.target.querySelectorAll(".stat-number")
        );
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
      }
      entry.target.classList.add("animate-fade-up");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".welcome-content, .welcome-image").forEach((el) => {
  observer.observe(el);
});

// Observe welcome section
const welcomeSections = document.querySelectorAll(".welcome-section");
welcomeSections.forEach((section) => {
  observer.observe(section);
});

// Image slide-in effect
const welcomeImage = document.querySelector(".welcome-image img");
const welcomeImageContainer = document.querySelector(".welcome-image");

const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        welcomeImage.classList.add("animate-slide-in");
        imageObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2, // Trigger the animation when 20% of the element is visible
  }
);

imageObserver.observe(welcomeImageContainer);
