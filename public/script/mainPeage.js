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
