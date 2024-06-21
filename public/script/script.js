const root = document.querySelector('#root');

const startBu = document.querySelector('#start');
// console.log(startBu);
const exitBu = document.querySelector('#exit');
// console.log(exitBu);

startBu.addEventListener('click', () => {
  let div = document.createElement('div');
  div.innerHTML = '<a href="./public/html/mainPage.html">게임시작</a>';
  root.appendChild(div);
});
