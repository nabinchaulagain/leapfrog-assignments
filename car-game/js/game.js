/**
 * @constructor
 * @param {CanvasRenderingContext2D} ctx - Drawing context of canvas
 * @param {number} width - width of canvas
 * @param {number} height - height of canvas
 */

var Game = function (ctx, width, height) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.ctx.canvas.width = this.width;
  this.ctx.canvas.height = this.height;
  this.addStartListener();
  this.gameStarted = false;
  this.gameOver = false;
};

Game.prototype.gameInit = function () {
  this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
  this.ctx.globalCompositeOperation = 'source-over';
  this.speed = 1;
  this.laneLineOffset = 0;
  this.player = new Car(true, 1);
  this.obstacles = [];
  this.obstacleInterval = setInterval(
    this.addObstacle.bind(this),
    OBSTACLE_DELAY
  );
  this.score = 0;
  this.scoreInterval = setInterval(
    this.updateScore.bind(this),
    SCORE_UPDATE_INTERVAL
  );
  this.gameStarted = true;
  this.gameOver = false;
};

/** play the game */
Game.prototype.play = function () {
  this.gameAnimationId = requestAnimationFrame(this.play.bind(this));
  if (!this.gameStarted) {
    this.showHomeScreen();
    return;
  }
  if (this.gameOver) {
    this.showEndScreen();
    return;
  }
  this.clear();
  this.drawLanes();
  this.player.draw(this.ctx);
  this.handleCollision();
  this.drawObstacles();
  this.showScore();
  this.speed += this.speed * ACCELERATION;
};

/** clear screen */
Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.fillStyle = '#444';
  this.ctx.fillRect(0, 0, this.width, this.height);
};

/** draw obstacles */
Game.prototype.drawObstacles = function () {
  for (var i = 0; i < this.obstacles.length; i++) {
    this.obstacles[i].draw(this.ctx);
    this.obstacles[i].update(this.speed);
    if (this.obstacles[i].isOutOfScreen()) {
      this.obstacles.splice(i, 1);
    }
  }
};

Game.prototype.updateScore = function () {
  this.score++;
  if (this.score > this.highScore) {
    this.highScore = this.score;
    localStorage.setItem('highScore', this.highScore);
  }
};

Game.prototype.showScore = function () {
  this.ctx.fillStyle = '#fff';
  this.ctx.font = '20px Georgia';
  this.ctx.fillText('Score: ' + this.score, 50, 20);
  this.ctx.fillText('High Score: ' + this.highScore, CANVAS_WIDTH - 80, 20);
};

/** add obstacle car*/
Game.prototype.addObstacle = function () {
  if (this.obstacles.length > 2) {
    return;
  }
  for (var i = 0; i < this.obstacles.length; i++) {
    //make sure that there is a big enough distance to get through between 2 cars
    if (this.obstacles[i].y <= 2.5 * CAR_HEIGHT) {
      return;
    }
  }
  var laneIdx = Math.floor(Math.random() * 3);
  var laneIdxSum = laneIdx;
  for (var i = 0; i < this.obstacles.length; i++) {
    laneIdxSum += this.obstacles[i].lane;
  }
  // if there is an obstacle on each lane with this new obstacle, discard it and add another obstacle recursively
  if (laneIdxSum === 3) {
    this.addObstacle();
    return;
  }
  this.obstacles.push(new Car(false, laneIdx, 0));
};

/** draw lanes on canvas */
Game.prototype.drawLanes = function () {
  this.ctx.strokeStyle = '#fff';
  this.ctx.lineWidth = 5;
  this.ctx.setLineDash([60, 20]);
  this.ctx.lineDashOffset = -this.speed * this.laneLineOffset;
  var numLanes = 3;
  for (var i = 1; i <= numLanes - 1; i++) {
    this.ctx.beginPath();
    this.ctx.moveTo((i / numLanes) * this.width, 0);
    this.ctx.lineTo((i / numLanes) * this.width, this.height);
    this.ctx.stroke();
  }
  this.laneLineOffset++;
};

/** handle collision with other balls */
Game.prototype.handleCollision = function () {
  for (var i = 0; i < this.obstacles.length; i++) {
    if (this.player.isColliding(this.obstacles[i])) {
      clearInterval(this.obstacleInterval);
      this.endGame();
    }
  }
};
/** Show home screen*/
Game.prototype.showHomeScreen = function () {
  this.clear();
  this.ctx.font = '40px Georgia';
  this.ctx.fillStyle = '#fff';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('Car Race', CANVAS_WIDTH / 2, 200);
  this.ctx.font = '20px Georgia';
  this.ctx.fillText('Avoid crashing with other cars. ', CANVAS_WIDTH / 2, 250);
  this.ctx.fillText(
    'Press a or left arrow to go left. ',
    CANVAS_WIDTH / 2,
    280
  );
  this.ctx.fillText(
    'Press d or right arrow to go right. ',
    CANVAS_WIDTH / 2,
    310
  );
  this.ctx.font = '30px Georgia';
  this.ctx.fillText('Hit any key to start the game ', CANVAS_WIDTH / 2, 400);
};
/** add keyboard listener to start the game */
Game.prototype.addStartListener = function () {
  var that = this;
  var handleGameStart = function () {
    that.gameInit();
    document.removeEventListener('keydown', handleGameStart);
  };
  document.addEventListener('keydown', handleGameStart);
};

Game.prototype.showEndScreen = function () {
  this.ctx.font = '40px Georgia';
  this.ctx.fillStyle = '#f44';
  this.ctx.textAlign = 'center';
  this.ctx.fillText(
    'Press any key to restart',
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2
  );
  // draw over any existing pixels
  this.ctx.globalCompositeOperation = 'destination-over';
};

/** end the game */
Game.prototype.endGame = function () {
  this.gameOver = true;
  clearTimeout(this.obstacleInterval);
  clearTimeout(this.scoreInterval);
  this.addStartListener();
};
