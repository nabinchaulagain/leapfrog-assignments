var carouselContainers = document.querySelectorAll('.carousel-container');

var transistionTimes = [1000, 500, 2000, 3000];
var holdTimes = [1000, 500, 1000, 2000];

carouselContainers.forEach(function (carouselContainer, idx) {
  var carousel = new Carousel(
    carouselContainer,
    carouselContainer.querySelector('.carousel-image-wrapper'),
    transistionTimes[idx],
    holdTimes[idx]
  );
  carousel.show();
});
