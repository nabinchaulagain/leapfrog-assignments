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
  this.speed = 1;
  this.laneLineOffset = 0;
  this.player = new Car(true, 1);
  this.obstacles = [];
  setInterval(this.addObstacle.bind(this), OBSTACLE_DELAY);
  this.gameOver = false;
};

/** play the game */
Game.prototype.play = function () {
  if (this.gameOver) {
    return;
  }
  this.clear();
  this.drawLanes();
  this.player.draw(this.ctx);
  this.handleCollision();
  this.drawObstacles();
  this.speed += this.speed * ACCELERATION;
  this.gameAnimationId = requestAnimationFrame(this.play.bind(this));
};

/** clear screen */
Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.fillStyle = '#000';
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
      cancelAnimationFrame(this.gameAnimationId);
      this.gameOver = true;
    }
  }
};
