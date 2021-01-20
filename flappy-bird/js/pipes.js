/**
 * Represents a pair of pipes
 * @constructor */
var Pipes = function () {
  this.bottomSx = 500;
  this.topSx = 554;
  this.x = CANVAS_WIDTH;
  this.width = 55;
  this.sHeight = 400;
  this.topY = 0;
  this.topHeight = random(MIN_PIPE_HEIGHT, MAX_PIPE_HEIGHT);
  this.bottomY = this.topHeight + PIPE_GAP;
  this.bottomHeight = PLATFORM_HEIGHT - this.topHeight - PIPE_GAP;
};

/**
 * show both pipes
 * @param {CanvasRenderingContext2D} ctx
 */
Pipes.prototype.draw = function (ctx) {
  //show top pipe
  ctx.drawImage(
    sprite,
    this.topSx,
    0,
    this.width,
    this.sHeight,
    this.x,
    this.topY,
    this.width,
    this.topHeight
  );
  //show bottom pipe
  ctx.drawImage(
    sprite,
    this.bottomSx,
    0,
    this.width,
    this.sHeight,
    this.x,
    this.bottomY,
    this.width,
    this.bottomHeight
  );
};

/**update pipes to move left */
Pipes.prototype.update = function () {
  this.x--;
};

/** check collision between both pipes and the bird
 * @param {Bird} bird
 * @returns {boolean}
 */
Pipes.prototype.isColliding = function (bird) {
  return (
    //collision with top pipe
    (bird.x < this.x + this.width &&
      bird.x + bird.width > this.x &&
      bird.y < this.topY + this.topHeight &&
      bird.y + bird.height > this.topY) ||
    //collision with bottom pipe
    (bird.x < this.x + this.width &&
      bird.x + bird.width > this.x &&
      bird.y < this.bottomY + this.bottomHeight &&
      bird.y + bird.height > this.bottomY)
  );
};
