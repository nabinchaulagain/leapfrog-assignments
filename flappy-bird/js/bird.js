/**
 * Represents a bird
 * @constructor
 */
function Bird() {
  this.x = BIRD_LEFT_OFFSET;
  this.y = PLATFORM_HEIGHT / 2;
  this.sX = 276;
  this.sY = 112;
  this.width = 34;
  this.height = 26;
  this.speed = 0;
  this.gravity = GRAVITY;
  this.lift = LIFT;
}
/**
 * show bird
 * @param {CanvasRenderingContext2D} ctx
 */
Bird.prototype.draw = function (ctx) {
  ctx.drawImage(
    sprite,
    this.sX,
    this.sY,
    this.width,
    this.height,
    this.x,
    this.y,
    this.width,
    this.height
  );
};

/** update bird based on gravity and lift */
Bird.prototype.update = function () {
  this.speed += this.gravity;
  this.y += this.speed;
};

/** move up */
Bird.prototype.moveUp = function () {
  this.speed -= this.lift;
};
