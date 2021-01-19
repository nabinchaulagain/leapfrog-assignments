/**
 * @constructor
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {number} numAnts
 */
function Simulation(ctx, width, height, numAnts) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.ctx.canvas.width = width;
  this.ctx.canvas.height = height;
  this.numAnts = numAnts;
}
/** Initialize ant list */
Simulation.prototype.init = function () {
  this.antList = [];
  for (var i = 0; i < this.numAnts; i++) {
    var antX = random(ANT_WIDTH, this.width - ANT_WIDTH);
    var antY = random(ANT_HEIGHT, this.height - ANT_HEIGHT);
    var antDirectionX = random(0, 1) == 0 ? -1 : 1;
    var antDirectionY = random(0, 1) == 0 ? -1 : 1;
    var ant = new Ant(antX, antY, antDirectionX, antDirectionY);
    this.antList.push(ant);
  }
};

/** Start simulation */
Simulation.prototype.start = function () {
  this.init();
  this.play();
};

/** Play simulation */
Simulation.prototype.play = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
  for (var i = 0; i < this.antList.length; i++) {
    this.antList[i].checkWallCollision(this.width, this.height);
    this.antList[i].checkAntCollision(this.antList);
    this.antList[i].update();
    this.antList[i].draw(this.ctx);
  }
  requestAnimationFrame(this.play.bind(this));
};

var canvas = document.querySelector(".canvas");
var simulation = new Simulation(
  canvas.getContext("2d"),
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  20
);
simulation.start();
