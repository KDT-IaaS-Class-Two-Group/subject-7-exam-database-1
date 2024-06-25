document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.item');
  const itemInfo = document.getElementById('Item_Information');

  fetch('./public/script/item.json')
    .then((response) => response.json())
    .then((data) => {
      items.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          const itemName = item.getAttribute('data-name');
          const product = data.find((product) => product.name === itemName);
          itemInfo.innerHTML = `제품명: ${product.name}<br>제품 설명: ${product.description}`;
        });

        item.addEventListener('mouseleave', () => {
          itemInfo.innerHTML = '제품명: <br>제품 설명:';
        });
      });
    });
});

document.addEventListener('DOMContentLoaded', function () {
  // 클릭된 상품을 카운트할 객체
  const cartCounts = {};

  // 모든 .price 버튼들을 가져와서 클릭 이벤트를 추가합니다
  const priceButtons = document.querySelectorAll('.price');
  priceButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // 클릭된 버튼의 부모 요소(.item)에서 data-name 속성을 가져옵니다
      const itemName = this.parentElement.dataset.name;

      // 클릭된 상품의 카운트를 증가시킵니다
      if (cartCounts[itemName]) {
        cartCounts[itemName]++;
      } else {
        cartCounts[itemName] = 1;
      }

      // 장바구니의 해당 상품 카운트를 업데이트합니다
      const cartItemElement = document.querySelector(`#cart-items [data-name="${itemName}"]`);
      if (cartItemElement) {
        cartItemElement.textContent = `${itemName} ${cartItemElement.dataset.price} x ${cartCounts[itemName]}`;
      } else {
        // 장바구니에 추가할 HTML을 생성합니다 (단, 이미 추가된 상품은 더 이상 추가하지 않습니다)
        fetch('item.json')
          .then((response) => response.json())
          .then((data) => {
            const selectedItem = data.find((item) => item.name === itemName);
            if (selectedItem) {
              const cartItemHTML = `<div data-name="${selectedItem.name}" data-price="${selectedItem.price}">${selectedItem.name} ${selectedItem.price} x ${cartCounts[itemName]}</div>`;
              const cartItemsElement = document.getElementById('cart-items');
              cartItemsElement.insertAdjacentHTML('beforeend', cartItemHTML);
            } else {
              console.error(`상품 "${itemName}"을 찾을 수 없습니다.`);
            }
          })
          .catch((error) => console.error('JSON 데이터를 불러오는 중 오류가 발생했습니다:', error));
      }
    });
  });
});

// 마우스 오버 시 이미지 확대
document.querySelectorAll('.hover-zoom').forEach((item) => {
  item.addEventListener('mouseover', function () {
    this.style.transform = 'scale(1.15)'; // 이미지 크기 15% 확대
    this.style.transition = 'transform 0.3s'; // 부드러운 변화를 위한 transition 추가
  });

  // 마우스 아웃 시 원래 크기로 복원
  item.addEventListener('mouseout', function () {
    this.style.transform = 'scale(1)'; // 원래 크기로 복원
    this.style.transition = 'transform 0.3s'; // transition 추가
  });
});
