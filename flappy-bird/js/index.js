//wait for images to load before starting the game
var imageLoadWaitInterval = setInterval(function () {
  //if both images are loaded
  if (sprite.complete && playBtn.complete) {
    clearInterval(imageLoadWaitInterval);
    var game = new Game(document.querySelector('.canvas'));
    game.play();
  }
}, 100);
