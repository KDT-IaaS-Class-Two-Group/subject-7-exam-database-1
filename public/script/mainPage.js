//* Item위에 마우스 오버시 이름과 설명나오는 부분
// AJAX 요청을 통해 서버에서 데이터를 가져오는 함수
function fetchDataFromServer() {
  const url = '/searchItem';

  // AJAX 요청 설정
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  // 요청 완료 후 처리할 콜백 함수
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // 요청이 성공적으로 완료된 경우
      const data = JSON.parse(xhr.responseText); // JSON 형식으로 파싱
      handleData(data); // 데이터 처리 함수 호출
    } else {
      // 요청이 실패한 경우
      console.error('서버에서 데이터를 불러오지 못했습니다.');
    }
  };

  // 네트워크 오류 처리
  xhr.onerror = function () {
    console.error('네트워크 오류로 인해 데이터를 불러오지 못했습니다.');
  };

  // 요청 보내기
  xhr.send();
}

// 받아온 데이터를 처리하는 함수
function handleData(data) {
  // 받아온 데이터를 콘솔에 출력하거나 원하는 방식으로 활용할 수 있습니다.
  console.log('받아온 데이터:', data);

  // 제품명과 설명을 화면에 출력하기
  const items = document.querySelectorAll('.item');
  items.forEach((item) => {
    item.addEventListener('mouseenter', function () {
      const itemName = this.getAttribute('data-name');
      const selectedItem = data.find((item) => item.name === itemName);
      const itemInfoElement = document.getElementById('Item_Information');

      if (selectedItem) {
        itemInfoElement.innerHTML = `제품명: ${selectedItem.name}<br>제품 설명: ${selectedItem.explain}`;
      } else {
        itemInfoElement.innerHTML = '제품 정보를 찾을 수 없습니다.';
      }
    });
  });
}

// DOMContentLoaded 이벤트 발생 시 AJAX 요청 수행
document.addEventListener('DOMContentLoaded', function () {
  fetchDataFromServer(); // 페이지 로드 시 데이터 가져오기
});

// * 가격 버튼 클릭시 장바구니에 카운트 되는 부분

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

// * Item 이미지에 마우스 오버 시 이미지 확대
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
