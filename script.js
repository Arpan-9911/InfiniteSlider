const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];
const wrapper = document.querySelector(".wrapper");

let isDragging = false, startX, startScrollLeft, autoplayInterval;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
});
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const infiniteScroll = () => {
  if(carousel.scrollLeft === 0){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2*carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
}

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    carousel.scrollLeft += firstCardWidth;
  }, 3000);
}

wrapper.addEventListener('mouseenter', () => {
  clearInterval(autoplayInterval);
});

wrapper.addEventListener('mouseleave', () => {
  startAutoplay();
});

startAutoplay();
carousel.addEventListener("scroll", infiniteScroll);