/**
 *  Represents a ball
 * @constructor
 * @param {number} x - x position of center of ball
 * @param {number} y - y position of center of ball
 * @param {number} radius - radius of ball
 * @param {string} color - color of ball
 * @param {number} dx - x direction
 * @param {number} dy - y direction
 *  */
function Ball(x, y, radius, color, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = dx;
  this.dy = dy;
}

/**
 * Draw ball on canvas
 * @param {CanvasRenderingContext2D} ctx
 */
Ball.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

/** update ball position */
Ball.prototype.update = function () {
  this.x += this.dx;
  this.y += this.dy;
};

/** Check and react to wall collision
 * @param {number} width - canvas width
 * @param {number} height - canvas height
 */
Ball.prototype.checkWallCollision = function (width, height) {
  //top collision or bottom collision
  if (this.y <= this.radius) {
    this.dy = -this.dy;
    this.y = this.radius;
  }
  if (this.y + this.radius >= height) {
    this.dy = -this.dy;
    this.y = height - this.radius;
  }
  //left collison or right collision
  if (this.x <= this.radius) {
    this.dx = -this.dx;
    this.x = this.radius;
  }
  if (this.x + this.radius >= width) {
    this.dx = -this.dx;
    this.x = width - this.radius;
  }
};

/**
 * Returns true if the given ball is colliding with this ball
 * @param {Ball} ball
 * @returns {boolean}
 */
Ball.prototype.isColliding = function (ball) {
  var distCenters = distance(ball.x, this.x, ball.y, this.y);
  var radiiSum = ball.radius + this.radius;
  return distCenters <= radiiSum;
};

/**
 *  Check and react to ball collision
 * @param {Array.<Ball>} ballList
 */
Ball.prototype.checkBallCollision = function (ballList) {
  for (var i = 0; i < ballList.length; i++) {
    if (ballList[i] === this) {
      continue;
    }
    if (this.isColliding(ballList[i])) {
      this.dx = -this.dx;
      this.dy = -this.dy;
      ballList[i].dx = -ballList[i].dx;
      ballList[i].dy = -ballList[i].dy;
      while (this.isColliding(ballList[i])) {
        this.update();
      }
    }
  }
};
