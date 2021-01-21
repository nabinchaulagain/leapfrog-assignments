var imageLoadWaitInterval = setInterval(function () {
  if (sprite.complete && playBtn.complete) {
    clearInterval(imageLoadWaitInterval);
    window.game = new Game(document.querySelector('.canvas'));
    game.play();
  }
}, 100);
