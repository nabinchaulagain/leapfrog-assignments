/** @constructor */
var Ground = function () {
  this.sourceX = 277;
  this.sourceY = 0;
  this.width = 223;
  this.height = 112;
  this.x = 0;
  this.y = CANVAS_HEIGHT - this.height;
  this.unitSize = 10; // size of 1 the small quadrilateral in the ground
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Ground.prototype.draw = function (ctx) {
  ctx.drawImage(
    sprite,
    this.sourceX,
    this.sourceY,
    this.width,
    this.height,
    this.x,
    this.y,
    this.width,
    this.height
  );
  // draw from width to canvas width to cover full screen
  ctx.drawImage(
    sprite,
    this.sourceX,
    this.sourceY,
    this.width,
    this.height,
    this.x + this.width,
    this.y,
    this.width,
    this.height
  );
};

/** update the ground's position to seem like it is moving */
Ground.prototype.update = function () {
  this.x = (this.x - 1) % this.unitSize;
};

/**
 * checks if bird is colliding with the ground
 * @param {Bird} bird
 * @returns {boolean}
 */
Ground.prototype.isColliding = function (bird) {
  return (
    bird.x < this.x + this.width &&
    bird.x + bird.width > this.x &&
    bird.y < this.y + this.height &&
    bird.y + bird.height > this.y
  );
};
