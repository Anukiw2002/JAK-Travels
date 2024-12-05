// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation delay
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 200);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe all package cards
document.querySelectorAll(".package-card").forEach((card) => {
  observer.observe(card);
});

// Interactive price counter on hover
document.querySelectorAll(".package-card").forEach((card) => {
  const priceElement = card.querySelector(".price");
  const originalText = priceElement.textContent;
  const price = parseInt(originalText.replace(/[^0-9]/g, ""));

  card.addEventListener("mouseenter", () => {
    let currentNumber = 0;
    const interval = setInterval(() => {
      currentNumber += Math.ceil(price / 20);
      if (currentNumber >= price) {
        currentNumber = price;
        clearInterval(interval);
      }
      priceElement.textContent = `From $${currentNumber}`;
    }, 30);
  });

  card.addEventListener("mouseleave", () => {
    priceElement.textContent = originalText;
  });
});

// Add parallax effect to package images
document.querySelectorAll(".package-image").forEach((image) => {
  image.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const img = image.querySelector("img");
    img.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
  });

  image.addEventListener("mouseleave", () => {
    const img = image.querySelector("img");
    img.style.transform = "scale(1)";
  });
});

// Explore button click effect
document.querySelectorAll(".explore-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

document.querySelectorAll(".package-card").forEach((card, index) => {
  card.style.setProperty("--card-index", index);
});
