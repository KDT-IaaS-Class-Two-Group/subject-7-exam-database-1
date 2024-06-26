document.addEventListener("DOMContentLoaded", function () {
  // 클릭된 상품을 카운트할 객체
  let cartCounts = {};
  let totalPrice = 0;

  // 모든 .price 버튼들을 가져와서 클릭 이벤트를 추가합니다
  const priceButtons = document.querySelectorAll(".price");
  priceButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemName = this.parentElement.dataset.name;
      const itemPrice = parseInt(this.textContent.replace(/[^0-9]/g, ""), 10);

      if (cartCounts[itemName]) {
        cartCounts[itemName].count++;
      } else {
        cartCounts[itemName] = { price: itemPrice, count: 1 };
      }

      updateCart();
    });
  });

  function updateCart() {
    const cartItemsElement = document.getElementById("cart-items");
    cartItemsElement.innerHTML = "";

    totalPrice = 0;
    for (const itemName in cartCounts) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.dataset.name = itemName;

      const itemNameElement = document.createElement("span");
      itemNameElement.classList.add("item-name");
      itemNameElement.textContent = itemName;

      const itemPriceElement = document.createElement("span");
      itemPriceElement.classList.add("item-price");
      itemPriceElement.textContent = `${cartCounts[itemName].price}원 x ${cartCounts[itemName].count}`;

      const itemRemoveButton = document.createElement("button");
      itemRemoveButton.textContent = "-";
      itemRemoveButton.addEventListener("click", () => {
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

    document.getElementById("total-price").textContent = `${totalPrice}원`;
  }

  document
    .getElementById("purchase-history")
    .addEventListener("click", function () {
      window.location.href = "gume.html";
    });

  document.getElementById('decideBuy').addEventListener("click", function (event) {
    event.preventDefault();
    const orderData = {
      items: cartCounts,
      total: totalPrice,
    };
    fetch("/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    }).then((response) => {
      if (response.ok) {
        alert("구매가 완료되었습니다.");
        const receipt = document.getElementById('receipt');
        const partition = document.getElementById('partition');
        const receCon = document.getElementById('receiptContent');
        receCon.innerHTML = '';
        let test = '';
        for(key in cartCounts){
          test += `<div>${key} ${cartCounts[key].count}개 ${cartCounts[key].price}원</div>`;
        }
        let totalmoney = document.createElement('div');
        let allmoney = Object.keys(cartCounts);
        let result = allmoney.reduce((sum,item)=>{
          return sum + cartCounts[item].price*cartCounts[item].count;
        },0);
        
        totalmoney.textContent = `합계금액 : ${result}원`;

        receCon.innerHTML = test;
        receCon.appendChild(totalmoney);
        partition.style.visibility = 'visible';
        receipt.style.visibility = 'visible';
      } else {
        alert("구매 중 오류가 발생했습니다.");
      }
    });
  });

  // * Item 이미지에 마우스 오버 시 이미지 확대
  document.querySelectorAll(".hover-zoom").forEach((item) => {
    item.addEventListener("mouseover", function () {
      this.style.transform = "scale(1.15)"; // 이미지 크기 15% 확대
      this.style.transition = "transform 0.3s"; // 부드러운 변화를 위한 transition 추가
    });

    // 마우스 아웃 시 원래 크기로 복원
    item.addEventListener("mouseout", function () {
      this.style.transform = "scale(1)"; // 원래 크기로 복원
      this.style.transition = "transform 0.3s"; // transition 추가
    });
  });
});
