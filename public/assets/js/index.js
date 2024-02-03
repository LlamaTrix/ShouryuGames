const carousel = document.querySelector('.home-megaman');
const leftButton = document.querySelector('.carousel__button--left');
const rightButton = document.querySelector('.carousel__button--right');

leftButton.addEventListener('click', () => {
  carousel.scrollLeft -= 400;
});

rightButton.addEventListener('click', () => {
  carousel.scrollLeft += 400;
});