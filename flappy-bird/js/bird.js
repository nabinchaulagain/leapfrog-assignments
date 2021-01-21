/**
 * Represents a bird
 * @constructor
 */
function Bird() {
  this.x = BIRD_LEFT_OFFSET;
  this.y = PLATFORM_HEIGHT / 2;
  this.sX = 276;
  this.sY = [112, 139, 164, 139]; // source y positions of different bird images in sprite
  this.width = 34;
  this.height = 26;
  this.speed = 0;
  this.gravity = GRAVITY;
  this.lift = LIFT;
  this.frame = 0;
  this.birdPos = 0; // which bird image to use
}
/**
 * show bird
 * @param {CanvasRenderingContext2D} ctx
 */
Bird.prototype.draw = function (ctx) {
  ctx.drawImage(
    sprite,
    this.sX,
    this.sY[this.birdPos],
    this.width,
    this.height,
    this.x,
    this.y,
    this.width,
    this.height
  );
};

/**
 * update bird based on gravity and lift
 * @param {boolean} shouldUpdateImage
 */
Bird.prototype.update = function (shouldUpdateImage) {
  this.speed += this.gravity;
  this.y += this.speed;
  this.frame++;
  if (shouldUpdateImage) {
    this.birdPos = (this.birdPos + 1) % this.sY.length;
  }
};

/** move up */
Bird.prototype.moveUp = function () {
  this.speed -= this.lift;
};
