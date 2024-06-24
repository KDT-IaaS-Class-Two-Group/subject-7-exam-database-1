const Snappers_Img = document.getElementById("Snappers_Img");
console.log(Snappers_Img);
// ================================

document.addEventListener("DOMContentLoaded", function () {
  const snappersImg = document.getElementById("Snappers_Img");
  const desk = document.getElementById("desk");
  const container = document.querySelector(".container");

  // Function to show elements with animations
  function showElements() {
    desk.style.transition = "transform 1s";
    container.style.transition = "transform 1s";

    desk.style.transform = "translateY(-5%)";
    container.style.transform = "translateX(-2%)";
  }

  // Event listener for Snappers_Img click
  snappersImg.addEventListener("click", showElements);

  // Event listener for mouse over Snappers_Img
  snappersImg.addEventListener("mouseover", function () {
    snappersImg.style.cursor = "pointer";
  });

  // Reset the transformation to default when mouse leaves
  snappersImg.addEventListener("mouseout", function () {
    snappersImg.style.cursor = "default";
  });
});
