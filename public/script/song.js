// cartData의 name과 price를 읽어서 장바구니 부분에 아이템을 추가함
const cartData = [
  { name: "GPT식탁", price: 10000 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
  { name: "요술망치", price: 9900 },
];

const cartItemsContainer = document.getElementById("cart-items");
const nowmoneyElement = document.getElementById("nowmoney");

// 소지금 설정 (예시로 10000000원 설정)
let nowmoney = 10000000; // 이 숫자 부분을 db에서 받아와서 변경해주기
nowmoneyElement.textContent = `${nowmoney.toLocaleString()}원`;

// 장바구니에 아이템 추가
cartData.forEach((item) => {
  const itemElement = document.createElement("div");
  itemElement.className = "cart-item";
  itemElement.innerHTML = `<span class="item-name">${
    item.name
  }</span><span class="item-price">${item.price.toLocaleString()}원</span>`;
  cartItemsContainer.appendChild(itemElement);
});

// 소지금 업데이트 함수 (구매 후)
function updateMoney(newAmount) {
  nowmoney = newAmount;
  nowmoneyElement.textContent = `${nowmoney.toLocaleString()}원`;
}

// 장바구니 데이터 전송
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  // 새로고침, 서버로의 데이터 전송을 잠시 막고 계속 작업을 진행할 수 있게 해줌

  // 데이터 처리 로직 (예: 서버로 데이터 전송)
  const formData = new FormData();
  cartData.forEach((item) => {
    formData.append("구매한 물품", `${item.name},${item.price}`);
    // formData.append(key, value) 메서드는 FormData 객체에 키-값 쌍을 추가합니다 items[]가 키의 이름, []는 여러값을 담을 수 있다는 의미
  });

  // 예시로 콘솔에 출력
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  // AJAX 요청 예시 (fetch API)
  fetch("/buy", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Success:", data);
      // 소지금 업데이트 (예시)
      updateMoney(
        nowmoney - cartData.reduce((sum, item) => sum + item.price, 0)
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
