const Snappers_Img = document.getElementById("Snappers_Img");
console.log(Snappers_Img);
// ================================

document.addEventListener("DOMContentLoaded", function () {
  const snappersImg = document.getElementById("Snappers_Img");
  const desk = document.getElementById("desk");
  const container = document.querySelector(".container");

  // Function to show elements with animations
  function showElements() {
    desk.style.transition = "transform 1s, bottom 1s"; // desk의 transition 속성 설정
    container.style.transition = "transform 1s"; // container의 transition 속성 설정
  
    desk.style.transform = "translateY(-5%)";
    desk.style.bottom = "-5%"; // desk의 위치 조정
  
    container.style.transform = "translateX(0)"; // container를 화면 안으로 이동
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
