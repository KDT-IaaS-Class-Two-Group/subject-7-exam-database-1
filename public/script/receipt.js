// document.addEventListener("DOMContentLoaded", () => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', '/receipt', true); // GET 방식으로 /receipt 경로에 요청

//   xhr.addEventListener('load', () => {
//     if (xhr.status === 200) {
//       const data = JSON.parse(xhr.responseText);
//       const itemsContainer = document.getElementById('content');
//       let total = 0;
//       data.forEach(item => {
//         const itemDiv = document.createElement('div');
//         itemDiv.classList.add('item');
//         itemDiv.innerHTML = `<span>${item.name}</span><span>${item.price}원</span>`;
//         itemsContainer.appendChild(itemDiv);
//         total += item.price;
//       });

//       const totalP = document.createElement('div');
//       totalP.innerHTML = `<p><span>총금액 :</span><span> ${total}</span></p>`;
//       itemsContainer.appendChild(totalP);

//       // 예시로 사용자가 입력한 금액이 10000원인 경우
//       const userAmount = 10000;
//       const change = userAmount - total;
//       const changeM = document.createElement('div');
//       changeM.textContent = `거스름돈: ${change}원`;
//       itemsContainer.appendChild(changeM);
//     } else {
//       console.error('Error fetching receipt data:', xhr.statusText);
//     }
//   });

//   xhr.send(); // GET 요청 전송
// });

const returnMain = document.getElementById('returnMain');

const receipt = document.getElementById('receipt');

const partition = document.getElementById('partition');

returnMain.addEventListener('click', () => {
  receipt.style.visibility = 'hidden';
  partition.style.visibility = 'hidden';
});
