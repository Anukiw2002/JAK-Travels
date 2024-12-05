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
        const statNumbers = entry.target.querySelectorAll(".stat-number");
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
document.querySelector(".welcome-section").forEach((section) => {
  observer.observe(section);
});

// Parallax effect for image
window.addEventListener("scroll", () => {
  const image = document.querySelector(".welcome-image img");
  const scrolled = window.pageYOffset;
  const rate = scrolled * 0.15;

  if (window.innerWidth > 768) {
    // Only on desktop
    image.style.transform = `translate3d(0, ${rate}px, 0)`;
  }
});
