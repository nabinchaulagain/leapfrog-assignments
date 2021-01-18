/**
 * @constructor
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {number} numBalls
 */
function Simulation(ctx, width, height, numBalls) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.ctx.canvas.width = width;
  this.ctx.canvas.height = height;
  this.numBalls = numBalls;
}
/** Initialize ball list */
Simulation.prototype.init = function () {
  this.ballList = [];
  for (var i = 0; i < this.numBalls; i++) {
    var ballX = random(RADIUS_MAX, this.width - RADIUS_MAX);
    var ballY = random(RADIUS_MAX, this.height - RADIUS_MAX);
    var ballRadius = random(RADIUS_MIN, RADIUS_MAX);
    var ballColor = 'black';
    var ballDirectionX = random(0, 1) == 0 ? -1 : 1;
    var ballDirectionY = random(0, 1) == 0 ? -1 : 1;
    var ball = new Ball(
      ballX,
      ballY,
      ballRadius,
      ballColor,
      ballDirectionX,
      ballDirectionY
    );
    this.ballList.push(ball);
  }
};

/** Start simulation */
Simulation.prototype.start = function () {
  this.init();
  this.play();
};

/** Play animation */
Simulation.prototype.play = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
  for (var i = 0; i < this.ballList.length; i++) {
    this.ballList[i].checkWallCollision(this.width, this.height);
    this.ballList[i].checkBallCollision(this.ballList);
    this.ballList[i].update();
    this.ballList[i].draw(this.ctx);
  }
  requestAnimationFrame(this.play.bind(this));
};

var canvas = document.querySelector('.canvas');
var simulation = new Simulation(
  canvas.getContext('2d'),
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  30
);
simulation.start();
