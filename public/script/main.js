document.addEventListener('DOMContentLoaded', () => {
  const snappersImage = document.querySelector('.snappers-image');
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
      itemContainer.style.width = `calc(100% - 20%)`; // history의 너비를 제외한 나머지 너비
    } else {
      historyContainer.style.transform = 'translateX(100%)';
      historyContainer.style.opacity = '0';
      itemContainer.style.width = '100%'; // history가 숨겨지면 전체 너비 사용
    }
  });
});
