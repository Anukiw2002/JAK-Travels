document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  let lastScrollY = window.scrollY;

  // Parallax effect on scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const speed = 0.5;
    const offset = (scrollY - lastScrollY) * speed;

    if (scrollY <= hero.offsetHeight) {
      hero.style.backgroundPositionY = `${offset}px`;
    }

    lastScrollY = scrollY;
  });

  // Add click animation to CTA button
  const ctaButton = document.querySelector(".cta-button");
  ctaButton.addEventListener("click", function (e) {
    e.preventDefault();
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 200);
  });
});

fetch("/html/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;
  });
