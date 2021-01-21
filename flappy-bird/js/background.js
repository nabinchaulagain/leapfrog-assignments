/** @constructor */
var Background = function () {
  this.sourceX = 0;
  this.sourceY = 0;
  this.width = 275;
  this.height = 225;
  this.destX = 0;
  this.destY = CANVAS_HEIGHT - this.height;
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Background.prototype.draw = function (ctx) {
  ctx.drawImage(
    sprite,
    this.sourceX,
    this.sourceY,
    this.width,
    this.height,
    this.destX,
    this.destY,
    this.width,
    this.height
  );
  // draw from width to canvas width to cover full screen
  ctx.drawImage(
    sprite,
    this.sourceX,
    this.sourceY,
    CANVAS_WIDTH - this.width,
    this.height,
    this.destX + this.width,
    this.destY,
    CANVAS_WIDTH - this.width,
    this.height
  );
};
