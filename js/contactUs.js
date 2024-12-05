document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";

  this.reset();

  setTimeout(() => {
    successMessage.style.display = "none";
  }, 5000);
});

document.querySelectorAll("input, textarea").forEach((element) => {
  element.addEventListener("focus", function () {
    element.style.transform = "translateY(-2px)";
    element.style.transition = "transform 0.3s";
  });

  element.addEventListener("blur", function () {
    element.style.transform = "translateY(0)";
  });
});
