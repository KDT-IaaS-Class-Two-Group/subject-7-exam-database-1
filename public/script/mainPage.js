// Item위에 마우스 오버시 이름과 설명나오는 부분
// AJAX 요청을 통해 서버에서 데이터를 가져오는 함수
function fetchDataFromServer() {
  const url = '/searchItem'; // 서버에서 데이터를 가져올 경로

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
  const items = document.querySelectorAll('.item img'); // 각 item의 img 요소 선택
  items.forEach((item) => {
    item.addEventListener('mouseenter', function () {
      const itemName = this.parentElement.getAttribute('data-name'); // 부모 요소에서 data-name 속성 가져오기
      const selectedItem = data.find((item) => item.name === itemName);
      const itemInfoElement = document.querySelector('#Item-information > div'); // id="Item-information" 안의 div 요소 선택

      if (selectedItem) {
        itemInfoElement.innerHTML = `제품명: ${selectedItem.name}<br>${selectedItem.explain}`;
      } else {
        itemInfoElement.innerHTML = '제품 정보를 찾을 수 없습니다.';
      }
    });

    item.addEventListener('mouseleave', function () {
      const itemInfoElement = document.querySelector('#Item-information > div'); // id="Item-information" 안의 div 요소 선택
      itemInfoElement.innerHTML = ''; // 마우스를 내릴 때 정보를 비웁니다.
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
  let cartCounts = {};
  let totalPrice = 0;

  // 모든 .price 버튼들을 가져와서 클릭 이벤트를 추가합니다
  const priceButtons = document.querySelectorAll('.price');
  priceButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const itemName = this.parentElement.dataset.name;
      const itemPrice = parseInt(this.textContent.replace(/[^0-9]/g, ''), 10);

      if (cartCounts[itemName]) {
        cartCounts[itemName].count++;
      } else {
        cartCounts[itemName] = { price: itemPrice, count: 1 };
      }

      updateCart();
    });
  });

  function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    totalPrice = 0;
    for (const itemName in cartCounts) {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.dataset.name = itemName;

      const itemNameElement = document.createElement('span');
      itemNameElement.classList.add('item-name');
      itemNameElement.textContent = itemName;

      const itemPriceElement = document.createElement('span');
      itemPriceElement.classList.add('item-price');
      itemPriceElement.textContent = `${cartCounts[itemName].price}원 x ${cartCounts[itemName].count}`;

      const itemRemoveButton = document.createElement('button');
      itemRemoveButton.textContent = '-';
      itemRemoveButton.addEventListener('click', () => {
        if (cartCounts[itemName].count > 1) {
          cartCounts[itemName].count--;
        } else {
          delete cartCounts[itemName];
        }
        updateCart();
      });

      cartItem.appendChild(itemNameElement);
      cartItem.appendChild(itemPriceElement);
      cartItem.appendChild(itemRemoveButton);
      cartItemsElement.appendChild(cartItem);

      totalPrice += cartCounts[itemName].price * cartCounts[itemName].count;
    }

    document.getElementById('total-price').textContent = `${totalPrice}원`;
  }

  document.getElementById('purchase-history').addEventListener('click', function () {
    window.location.href = 'gume.html';
  });

  document.getElementById('decideBuy').addEventListener('click', function (event) {
    event.preventDefault();
    const orderData = {
      items: cartCounts,
      total: totalPrice,
    };
    fetch('/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    }).then((response) => {
      if (response.ok) {
        alert('구매가 완료되었습니다.');
      } else {
        alert('구매 중 오류가 발생했습니다.');
        const receipt = document.getElementById('receipt');
        const partition = document.getElementById('partition');
        const receCon = document.getElementById('receiptContent');
        receCon.innerHTML = '';
        let test = '';
        for (key in cartCounts) {
          test += `<div>${key} ${cartCounts[key].count}개 ${cartCounts[key].price * cartCounts[key].count}원</div>`;
        }
        let totalmoney = document.createElement('div');
        let allmoney = Object.keys(cartCounts);
        let result = allmoney.reduce((sum, item) => {
          return sum + cartCounts[item].price * cartCounts[item].count;
        }, 0);

        totalmoney.textContent = `합계금액 : ${result}원`;

        receCon.innerHTML = test;
        receCon.appendChild(totalmoney);
        partition.style.visibility = 'visible';
        receipt.style.visibility = 'visible';
        cartCounts = {};
        totalPrice = 0;
        document.getElementById('cart-items').innerHTML = '';
        document.getElementById('total-price').textContent = `${totalPrice}원`;
      }
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
});
