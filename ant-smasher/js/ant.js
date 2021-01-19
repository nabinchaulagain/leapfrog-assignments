/**
 *  Represents an ant
 * @constructor
 * @param {number} x - x position of center of ant
 * @param {number} y - y position of center of ant
 * @param {number} dx - x direction
 * @param {number} dy - y direction
 *  */
function Ant(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.width = ANT_WIDTH;
  this.height = ANT_HEIGHT;
  this.dx = dx;
  this.dy = dy;
  this.image = new Image();
  this.image.src = "../images/ant.png";
  this.image.style.transform = "rotate(50deg)";
}

/**
 * Draw ant on canvas
 * @param {CanvasRenderingContext2D} ctx
 */
Ant.prototype.draw = function (ctx) {
  // ctx.rotate(30);
  ctx.beginPath();
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  // ctx.setTransform(1, 0, 0, 1, 0, 0);
};

/** update ant position */
Ant.prototype.update = function () {
  this.x += this.dx;
  this.y += this.dy;
};

/** Check and react to wall collision
 * @param {number} width - canvas width
 * @param {number} height - canvas height
 */
Ant.prototype.checkWallCollision = function (width, height) {
  //top collision
  if (this.y <= 0) {
    this.dy = -this.dy;
    this.y = 0;
  }
  //bottom collision
  if (this.y + this.height >= height) {
    this.dy = -this.dy;
    this.y = height - this.height;
  }
  //left collison
  if (this.x <= 0) {
    this.dx = -this.dx;
    this.x = 0;
  }
  //right collision
  if (this.x + this.width >= width) {
    this.dx = -this.dx;
    this.x = width - this.width;
  }
};

/**
 * Returns true if the given ant is colliding with this ant
 * @param {Ant} ant
 * @returns {boolean}
 */
Ant.prototype.isColliding = function (ant) {
  return (
    this.x < ant.x + this.width &&
    this.x + this.width > ant.x &&
    this.y < ant.y + this.height &&
    this.y + this.height > ant.y
  );
};

/**
 *  Check and react to ball collision
 * @param {Array.<Ant>} antList
 */
Ant.prototype.checkAntCollision = function (antList) {
  for (var i = 0; i < antList.length; i++) {
    if (antList[i] === this) {
      continue;
    }
    if (this.isColliding(antList[i])) {
      this.dx = -this.dx;
      this.dy = -this.dy;
      antList[i].dx = -antList[i].dx;
      antList[i].dy = -antList[i].dy;
      while (this.isColliding(antList[i])) {
        this.update();
      }
    }
  }
};
