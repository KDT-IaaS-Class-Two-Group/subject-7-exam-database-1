document.addEventListener('DOMContentLoaded', () => {
  const snappersImage = document.querySelector('img[alt="Snappers Image"]');
  const itemContainer = document.querySelector('.item-container');
  const historyContainer = document.querySelector('.history');

  snappersImage.addEventListener('click', () => {
    itemContainer.classList.toggle('active');
  });

  document.addEventListener('mousemove', (event) => {
    const windowWidth = window.innerWidth;
    const threshold = 20; // 마우스 위치가 오른쪽 끝에서 20px 이내일 때

    if (event.clientX > windowWidth - threshold) {
      historyContainer.style.transform = 'translateX(0)';
      historyContainer.style.opacity = '1';
    } else {
      historyContainer.style.transform = 'translateX(100%)';
      historyContainer.style.opacity = '0';
    }
  });
});
