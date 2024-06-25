document.addEventListener('DOMContentLoaded', () => {
  const snappersImage = document.querySelector('.clickable-image');
  const itemContainer = document.querySelector('.item-container');

  snappersImage.addEventListener('click', () => {
    itemContainer.classList.toggle('active');
  });
});
