const id = localStorage.getItem("id");
const name = localStorage.getItem("name");

document.addEventListener("DOMContentLoaded", () => {
  // 기존 코드 유지
  const clickDiv = document.querySelector(".spanppers");
  const itemContainer = document.querySelector(".item-container");
  const historyContainer = document.querySelector(".history");
  const welcomeImage = document.querySelector(".welcome-image");
  const textOverlay = document.querySelector(".text-overlay");
  const itemImages = document.querySelectorAll(".item-container img");
  const decideBuyBtn = document.getElementById("decideBuy");
  const receipt = document.getElementById("receipt");
  const purchaseHis = document.getElementById("purchase-history");
  const nowmoney = document.getElementById("nowmoney");

  clickDiv.addEventListener("click", () => {
    itemContainer.classList.toggle("active");
    if (welcomeImage.style.visibility === "hidden") {
      welcomeImage.style.visibility = "visible";
      textOverlay.style.visibility = "visible";
    } else {
      welcomeImage.style.visibility = "hidden";
      textOverlay.style.visibility = "hidden";
    }
  });

  //첫 소지금 설정
  function updateMoney() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/searchuserAcc");
    xhr.send(JSON.stringify({ id: id }));
    xhr.addEventListener("load", () => {
      const startmoney = JSON.parse(xhr.responseText);
      nowmoney.textContent = `${startmoney.AccBalance}원`;
    });
  }

  updateMoney();

  function pcH(Htext) {
    purchaseHis.removeEventListener("click", handlePurchase, true);
    let firstDiv = document.createElement("div");
    let tagH3 = document.createElement("h3");
    let secondDiv = document.createElement("div");
    let thirdDiv = document.createElement("div");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");

    tagH3.textContent = Htext;

    firstDiv.appendChild(tagH3);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/readHistory");
    xhr.send(JSON.stringify({ id: id }));
    xhr.addEventListener("load", () => {
      let result = JSON.parse(xhr.responseText);
      console.log(result);

      result.forEach((item) => {
        let pTag = document.createElement("p");
        pTag.textContent = `${item.Pname} ${item.Pprice}원 ${item.Quantity}개`;
        secondDiv.appendChild(pTag);
      });
    });

    btn1.setAttribute("id", "returnMain");
    btn1.addEventListener("click", () => {
      purchaseHis.addEventListener("click", handlePurchase, true);
      receipt.style.display = "none";
      receipt.innerHTML = "";
    });
    btn1.textContent = "더 구매할래";

    thirdDiv.appendChild(btn1);

    receipt.appendChild(firstDiv);
    receipt.appendChild(secondDiv);
    receipt.appendChild(thirdDiv);

    receipt.style.display = "block";
    positionReceiptAboveSnappers();
  }

  function handlePurchase() {
    pcH("구매목록");
  }

  purchaseHis.addEventListener("click", handlePurchase, true);

  document.addEventListener("mousemove", (event) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const thresholdX = windowWidth * 0.8; // 오른쪽 20% 이내
    const thresholdY = windowHeight * 0.8; // 아래쪽 20% 이내

    if (event.clientX > thresholdX || event.clientY > thresholdY) {
      historyContainer.style.transform = "translateX(0)";
      historyContainer.style.opacity = "1";
      itemContainer.style.width = "calc(100% - 20%)"; // history의 너비를 제외한 나머지 너비
    } else {
      historyContainer.style.transform = "translateX(100%)";
      historyContainer.style.opacity = "0";
      itemContainer.style.width = "100%"; // history가 숨겨지면 전체 너비 사용
    }
  });

  // 이미지 확대 기능 추가 및 welcomeImage와 textOverlay 표시/숨김 기능 추가
  itemImages.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.5)";
      img.style.transition = "transform 0.3s ease";
      welcomeImage.style.visibility = "visible";
      textOverlay.style.visibility = "visible";
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
      img.style.transition = "transform 0.3s ease";
      welcomeImage.style.visibility = "hidden";
      textOverlay.style.visibility = "hidden";
    });
  });

  // 결정 버튼 클릭 시 receipt 영역 보이기
  decideBuyBtn.addEventListener("click", () => {
    receipt.style.display = "block";
    positionReceiptAboveSnappers(); // receipt를 snappersImage 위에 위치시키는 함수 호출
  });

  const goExit = document.getElementById("goExit");

  // goExit.addEventListener("click", () => {
  //   window.open("/exit.html", "_self");
  // });

  // receipt를 snappersImage 위에 위치시키는 함수
  function positionReceiptAboveSnappers() {
    receipt.style.position = "absolute";
    // 예시로 위치를 조정하는 코드 추가 가능
  }

  // 추가된 부분: Local Storage에서 id와 name 읽어오기

  if (id && name) {
    // id와 name을 페이지에 표시하거나 필요한 작업 수행
    console.log(`ID: ${id}`);
    console.log(`Name: ${name}`);
    document.getElementById("user-id").textContent = `ID: ${id}`;
    document.getElementById("user-name").textContent = `Name: ${name}`;
  } else {
    console.error("ID와 Name을 가져올 수 없습니다.");
  }
});

// ? 뚝딱이 말풍선

// AJAX 요청을 통해 서버에서 데이터를 가져오는 함수
function fetchDataFromServer() {
  const url = "/searchItem"; // 서버에서 데이터를 가져올 경로

  // AJAX 요청 설정
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  // 요청 완료 후 처리할 콜백 함수
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // 요청이 성공적으로 완료된 경우
      const data = JSON.parse(xhr.responseText); // JSON 형식으로 파싱
      handleData(data); // 데이터 처리 함수 호출
    } else {
      // 요청이 실패한 경우
      console.error("서버에서 데이터를 불러오지 못했습니다.");
    }
  };

  // 네트워크 오류 처리
  xhr.onerror = function () {
    console.error("네트워크 오류로 인해 데이터를 불러오지 못했습니다.");
  };

  // 요청 보내기
  xhr.send();
}

// 받아온 데이터를 처리하는 함수
function handleData(data) {
  // 받아온 데이터를 콘솔에 출력하거나 원하는 방식으로 활용할 수 있습니다.
  console.log("받아온 데이터:", data);

  // 제품명과 설명을 화면에 출력하기
  const items = document.querySelectorAll(".item img"); // 각 item의 img 요소 선택
  const itemInfoElement = document.querySelector(".text-overlay");
  const originalText = itemInfoElement.innerHTML; // 원래 텍스트 저장

  items.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const itemName = this.parentElement.getAttribute("data-name"); // 부모 요소에서 data-name 속성 가져오기
      const selectedItem = data.find((item) => item.name === itemName);

      if (selectedItem) {
        itemInfoElement.innerHTML = `${selectedItem.explain}`;
      } else {
        itemInfoElement.innerHTML = "제품 정보를 찾을 수 없습니다.";
      }
    });

    item.addEventListener("mouseleave", function () {
      itemInfoElement.innerHTML = originalText; // 원래 텍스트로 복원
    });
  });
}

// DOMContentLoaded 이벤트 발생 시 AJAX 요청 수행
document.addEventListener("DOMContentLoaded", function () {
  fetchDataFromServer(); // 페이지 로드 시 데이터 가져오기
});

// * 가격 버튼 클릭시 장바구니에 카운트 되는 부분

document.addEventListener("DOMContentLoaded", function () {
  // 클릭된 상품을 카운트할 객체
  let cartCounts = {};
  let totalPrice = 0;

  // 모든 .price 버튼들을 가져와서 클릭 이벤트를 추가합니다
  const priceButtons = document.querySelectorAll(".price");
  priceButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const itemName = this.parentElement.dataset.name;
      const itemPrice = parseInt(this.textContent.replace(/[^0-9]/g, ""), 10);

      // 중복 체크를 위한 변수
      let productKey;

      // 중복된 itemName이 있는지 체크
      for (let key in cartCounts) {
        if (cartCounts[key].Pname === itemName) {
          productKey = key;
          break;
        }
      }

      if (productKey) {
        cartCounts[productKey].count++;
      } else {
        productKey = `Product${index}`;
        cartCounts[productKey] = {
          Pname: itemName,
          price: itemPrice,
          count: 1,
        };
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
      cartItem.dataset.name = cartCounts[itemName].Pname;

      const itemNameElement = document.createElement("span");
      itemNameElement.classList.add("item-name");
      itemNameElement.textContent = cartCounts[itemName].Pname;

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
    .getElementById("decideBuy")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const orderData = {
        id: id,
        ccount: cartCounts,
        total: totalPrice,
      };
      console.log(orderData);
      fetch("/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }).then((response) => {
        if (response.ok) {
          const cartItemsElement = document.getElementById("cart-items");
          const decide = document.getElementById("decideBuy");
          const receipt = document.getElementById("receipt");
          alert("구매가 완료되었습니다.");
          cartItemsElement.innerHTML = "";
          document.getElementById("total-price").textContent = `0원`;
          let firstDiv = document.createElement("div");
          let tagH3 = document.createElement("h3");
          let secondDiv = document.createElement("div");
          let thirdDiv = document.createElement("div");
          let btn1 = document.createElement("button");
          let btn2 = document.createElement("button");

          tagH3.textContent = "영수증";

          firstDiv.appendChild(tagH3);

          btn1.setAttribute("id", "returnMain");
          btn1.addEventListener("click", () => {
            receipt.style.display = "none";
            receipt.innerHTML = "";
          });
          btn1.textContent = "더 구매할래";

          let innerCon = orderData.ccount;
          let content = "";
          for (key in innerCon) {
            content += `<div>${innerCon[key].Pname} ${innerCon[key].count}개 ${
              innerCon[key].price * innerCon[key].count
            }원</div>`;
          }
          let totalmoney = document.createElement("div");
          let allmoney = Object.keys(innerCon);
          let result = allmoney.reduce((sum, item) => {
            return sum + innerCon[item].price * innerCon[item].count;
          }, 0);

          totalmoney.textContent = `합계금액 : ${result}원`;

          secondDiv.innerHTML = content;
          secondDiv.appendChild(totalmoney);

          btn2.setAttribute("id", "goExit");
          btn2.addEventListener("click", () => {
            window.open("/exit.html", "_self");
          });
          btn2.textContent = "상점나가기";

          thirdDiv.appendChild(btn1);
          thirdDiv.appendChild(btn2);

          receipt.appendChild(firstDiv);
          receipt.appendChild(secondDiv);
          receipt.appendChild(thirdDiv);

          receipt.style.display = "block";
          receipt.style.position = "absolute";

          function updateMoney() {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/searchuserAcc");
            xhr.send(JSON.stringify({ id: id }));
            xhr.addEventListener("load", () => {
              const startmoney = JSON.parse(xhr.responseText);
              nowmoney.textContent = `${startmoney.AccBalance}원`;
            });
          }

          updateMoney();
        } else {
          alert("구매 중 오류가 발생했습니다.");
        }
      });
    });
});
