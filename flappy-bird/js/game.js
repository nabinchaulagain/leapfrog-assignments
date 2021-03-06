/**
 * @constructor
 * @param {HTMLCanvasElement} canvas
 */
var Game = function (canvas) {
  this.canvas = canvas;
  this.canvas.width = CANVAS_WIDTH;
  this.canvas.height = CANVAS_HEIGHT;
  this.ctx = this.canvas.getContext('2d');
  this.gameStarted = false;
  this.gameOver = false;
  this.background = new Background();
  this.ground = new Ground();
  this.initStartScreen();
  this.frames = -1;
  this.bird = new Bird();
  this.bird.gravity = 0; // to avoid the bird from falling down in start screen
};

/** play the game */
Game.prototype.play = function () {
  this.frames++;
  this.animationId = requestAnimationFrame(this.play.bind(this));
  if (!this.gameStarted) {
    this.showStartScreen();
    return;
  }
  if (this.gameOver) {
    this.showGameOverScreen();
    return;
  }
  this.draw();
};

/** start the game */
Game.prototype.initGame = function () {
  this.frames = 0;
  this.pipes = [];
  this.bird = new Bird();
  this.attachControls();
  this.score = 0;
  this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
  this.gameStarted = true;
  this.gameOver = false;
};

/** draw the game objects */
Game.prototype.draw = function () {
  this.clearScreen();
  this.background.draw(this.ctx);
  this.ground.draw(this.ctx);
  this.handleCollisons();
  this.drawPipes();
  this.bird.draw(this.ctx);
  this.bird.update(this.frames % BIRD_UPDATE_TIME === 0);
  this.ground.update();
  this.updateScore();
  if (this.frames % PIPE_SPAWN_TIME === 0) {
    this.addPipes();
  }
  this.showScore();
};

/** draw pipes */
Game.prototype.drawPipes = function () {
  for (var i = 0; i < this.pipes.length; i++) {
    //if pipes moves out of screen, remove it
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

/** Control the bird through clicks */
Game.prototype.attachControls = function () {
  var handleClick = function () {
    this.bird.moveUp();
  };
  this.gameClickHandler = handleClick.bind(this);
  this.canvas.addEventListener('click', this.gameClickHandler);
};
/** Remove bird controls through clicks*/
Game.prototype.detachControls = function () {
  this.canvas.removeEventListener('click', this.gameClickHandler);
};

/** Handle collisions */
Game.prototype.handleCollisons = function () {
  var isCollision = this.ground.isColliding(this.bird) || this.bird.y < 0; // true if car moves down too much or up too much
  if (!isCollision) {
    for (var i = 0; i < this.pipes.length; i++) {
      if (this.pipes[i].isColliding(this.bird)) {
        isCollision = true;
        break;
      }
    }
  }
  if (isCollision) {
    this.endGame();
  }
};
/**Initiaize the start screen */
Game.prototype.initStartScreen = function () {
  var that = this;
  var gameStartHandler = function (ev) {
    var x = ev.clientX - that.canvas.offsetLeft;
    var y = ev.clientY - that.canvas.offsetTop;
    //if clicked on play button
    if (
      x >= playBtnPos.dX &&
      x <= playBtnPos.dX + playBtnPos.dWidth &&
      y >= playBtnPos.dY &&
      y <= playBtnPos.dY + playBtnPos.dHeight
    ) {
      that.canvas.removeEventListener('click', gameStartHandler);
      that.initGame();
    }
  };
  this.canvas.addEventListener('click', gameStartHandler);
};

/** Show start screen */
Game.prototype.showStartScreen = function () {
  this.clearScreen();
  this.background.draw(this.ctx);
  this.ground.draw(this.ctx);
  this.bird.draw(this.ctx);
  this.bird.update(this.frames % BIRD_UPDATE_TIME == 0);
  this.ctx.drawImage(
    sprite,
    START_SC.sX,
    START_SC.sY,
    START_SC.width,
    START_SC.height,
    START_SC.dX,
    START_SC.dY,
    START_SC.width,
    START_SC.height
  );
  //draw play btn
  this.ctx.drawImage(
    playBtn,
    playBtnPos.sX,
    playBtnPos.sY,
    playBtnPos.sWidth,
    playBtnPos.sHeight,
    playBtnPos.dX,
    playBtnPos.dY,
    playBtnPos.dWidth,
    playBtnPos.dHeight
  );
};

/** end game */
Game.prototype.endGame = function () {
  this.detachControls();
  clearInterval(this.scoreUpdateInterval);
  var that = this;
  this.restartListener = function (ev) {
    var x = ev.clientX - that.canvas.offsetLeft;
    var y = ev.clientY - that.canvas.offsetTop;
    if (x >= 160 && x <= 240 && y >= 265 && y <= 290) {
      that.canvas.removeEventListener('click', that.restartListener);
      that.initGame();
    }
  };
  this.canvas.addEventListener('click', this.restartListener);
  this.gameOver = true;
};

/** show game over screen */
Game.prototype.showGameOverScreen = function () {
  this.ctx.drawImage(
    sprite,
    END_SC.sX,
    END_SC.sY,
    END_SC.width,
    END_SC.height,
    END_SC.dX,
    END_SC.dY,
    END_SC.width,
    END_SC.height
  );
  this.ctx.fillStyle = '#fff';
  this.ctx.font = '32px Teko';
  this.ctx.strokeStyle = '#000';
  this.ctx.fillText(this.score, 270, 188);
  this.ctx.strokeText(this.score, 270, 188);
  this.ctx.fillText(this.highScore, 270, 230);
  this.ctx.strokeText(this.highScore, 270, 230);
};

/** update score if just passed pipe */
Game.prototype.updateScore = function () {
  var didPassPipe = false;
  for (var i = 0; i < this.pipes.length; i++) {
    if (this.pipes[i].x === this.bird.x) {
      didPassPipe = true;
      break;
    }
  }
  if (didPassPipe) {
    this.score++;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore);
    }
  }
};

/** show score */
Game.prototype.showScore = function () {
  this.ctx.fillStyle = '#fff';
  this.ctx.strokeStyle = '#000';
  this.ctx.font = '50px Teko';
  this.ctx.fillText(this.score, CANVAS_WIDTH / 2, 40);
  this.ctx.strokeText(this.score, CANVAS_WIDTH / 2, 40);
};
