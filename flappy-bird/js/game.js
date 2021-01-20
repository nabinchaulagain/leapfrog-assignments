/**
 * @constructor
 * @param {HTMLCanvasElement} canvas
 */
var Game = function (canvas) {
  this.canvas = canvas;
  this.canvas.width = CANVAS_WIDTH;
  this.canvas.height = CANVAS_HEIGHT;
  this.ctx = this.canvas.getContext('2d');
  this.background = new Background();
  this.ground = new Ground();
  this.frames = 0;
  this.pipes = [];
  this.bird = new Bird();
  this.attachControls();
};

/** play the game */
Game.prototype.play = function () {
  this.frames++;
  this.draw();
  this.animationId = requestAnimationFrame(this.play.bind(this));
};

/** draw the game objects */
Game.prototype.draw = function () {
  this.clearScreen();
  this.ctx.beginPath();
  this.background.draw(this.ctx);
  this.ground.draw(this.ctx);
  this.drawPipes();
  this.bird.draw(this.ctx);
  this.bird.update();
  this.ground.update();
  if (this.frames % PIPE_SPAWN_TIME === 0) {
    this.addPipes();
  }
};

/** draw pipes */
Game.prototype.drawPipes = function () {
  for (var i = 0; i < this.pipes.length; i++) {
    if (this.pipes[i].x <= -this.pipes[i].width) {
      this.pipes.splice(i, 1);
      continue;
    }
    this.pipes[i].draw(this.ctx);
    this.pipes[i].update();
  }
};

/** add pipes */
Game.prototype.addPipes = function () {
  this.pipes.push(new Pipes());
};

/** clear screen */
Game.prototype.clearScreen = function () {
  this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  this.ctx.beginPath();
  this.ctx.fillStyle = '#5EC1CA';
  this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

/** Control the game through */
Game.prototype.attachControls = function () {
  var handleClick = function () {
    this.bird.moveUp();
  };
  this.gameClickHandler = handleClick.bind(this);
  this.canvas.addEventListener('click', this.gameClickHandler);
};
