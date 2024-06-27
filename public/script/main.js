document.addEventListener('DOMContentLoaded', () => {
  const snappersImage = document.querySelector('.snappers-image');
  const itemContainer = document.querySelector('.item-container');
  const historyContainer = document.querySelector('.history');
  const welcomeImage = document.querySelector('.welcome-image');
  const textOverlay = document.querySelector('.text-overlay');
  const itemImages = document.querySelectorAll('.item-container img');
  const decideBuyBtn = document.getElementById('decideBuy');
  const returnMainBtn = document.getElementById('returnMain'); // 추가된 부분
  const receipt = document.getElementById('receipt');

  snappersImage.addEventListener('click', () => {
    itemContainer.classList.toggle('active');
    if (welcomeImage.style.visibility === 'hidden') {
      welcomeImage.style.visibility = 'visible';
      textOverlay.style.visibility = 'visible';
    } else {
      welcomeImage.style.visibility = 'hidden';
      textOverlay.style.visibility = 'hidden';
    }
  });

  document.addEventListener('mousemove', (event) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const thresholdX = windowWidth * 0.8; // 오른쪽 20% 이내
    const thresholdY = windowHeight * 0.8; // 아래쪽 20% 이내

    if (event.clientX > thresholdX || event.clientY > thresholdY) {
      historyContainer.style.transform = 'translateX(0)';
      historyContainer.style.opacity = '1';
      itemContainer.style.width = 'calc(100% - 20%)'; // history의 너비를 제외한 나머지 너비
    } else {
      historyContainer.style.transform = 'translateX(100%)';
      historyContainer.style.opacity = '0';
      itemContainer.style.width = '100%'; // history가 숨겨지면 전체 너비 사용
    }
  });

  // 이미지 확대 기능 추가 및 welcomeImage와 textOverlay 표시/숨김 기능 추가
  itemImages.forEach((img) => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.5)';
      img.style.transition = 'transform 0.3s ease';
      welcomeImage.style.visibility = 'visible';
      textOverlay.style.visibility = 'visible';
    });

    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.transition = 'transform 0.3s ease';
      welcomeImage.style.visibility = 'hidden';
      textOverlay.style.visibility = 'hidden';
    });
  });

  // 결정 버튼 클릭 시 receipt 영역 보이기
  decideBuyBtn.addEventListener('click', () => {
    receipt.style.display = 'block';
    positionReceiptAboveSnappers(); // receipt를 snappersImage 위에 위치시키는 함수 호출
  });

  // returnMain 버튼 클릭 시 receipt 영역 숨기기
  returnMainBtn.addEventListener('click', () => {
    receipt.style.display = 'none';
  });

  // receipt를 snappersImage 위에 위치시키는 함수
  function positionReceiptAboveSnappers() {
    const snappersImageRect = snappersImage.getBoundingClientRect();
    receipt.style.position = 'absolute';
    // 예시로 위치를 조정하는 코드 추가 가능
  }
});
