var carouselContainers = document.querySelectorAll('.carousel-container');

carouselContainers.forEach(function (carouselContainer) {
  var carousel = new Carousel(
    carouselContainer,
    carouselContainer.querySelector('.carousel-image-wrapper'),
    2000,
    1000
  );
  carousel.show();
});
