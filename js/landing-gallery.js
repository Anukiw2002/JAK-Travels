document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;
  let autoPlayInterval;

  // Function to show specific slide
  function showSlide(n) {
    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Reset to first slide if at end
    currentSlide = n >= slides.length ? 0 : n < 0 ? slides.length - 1 : n;

    // Add active class to current slide and dot
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  // Function for next slide
  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  // Function for previous slide
  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Event Listeners
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      resetAutoPlay();
    });
  });

  // Auto play functionality
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoPlay();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoPlay();
    }
  });

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const slideshow = document.querySelector(".slideshow-container");

  slideshow.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slideshow.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoPlay();
    }
  }

  // Start the slideshow
  startAutoPlay();
});
