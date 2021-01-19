/**
 * @constructor
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {number} numAnts
 * @param {HTMLElement} scoreboard
 */
function Game(ctx, width, height, numAnts, scoreboard) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.ctx.canvas.width = width;
  this.ctx.canvas.height = height;
  this.orgNumAnts = numAnts;
  this.numAnts = numAnts;
  this.scoreBoard = scoreboard;
}
/** Initialize ant list */
Game.prototype.init = function () {
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

/** Start Game */
Game.prototype.start = function () {
  this.init();
  this.play();
  this.handleAntClick();
};

/** Play Game */
Game.prototype.play = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.showScore();
  for (var i = 0; i < this.antList.length; i++) {
    this.antList[i].checkWallCollision(this.width, this.height);
    this.antList[i].checkAntCollision(this.antList);
    this.antList[i].update();
    this.antList[i].draw(this.ctx);
  }
  requestAnimationFrame(this.play.bind(this));
};
/** Check and handle click on any ant */
Game.prototype.handleAntClick = function () {
  var handler = function (ev) {
    var x = ev.clientX - ev.target.offsetLeft;
    var y = ev.clientY - ev.target.offsetTop;
    for (var i = 0; i < this.numAnts; i++) {
      var ant = this.antList[i];
      //if clicked on ant, remove it
      if (
        x >= ant.x &&
        x <= ant.x + ant.width &&
        y >= ant.y &&
        y <= ant.y + ant.height
      ) {
        this.antList.splice(i, 1);
        this.numAnts--;
      }
    }
  };
  this.ctx.canvas.addEventListener("click", handler.bind(this));
};
/** Show score on scoreboard */
Game.prototype.showScore = function () {
  this.scoreBoard.innerHTML =
    "Ants smashed: " + (this.orgNumAnts - this.numAnts);
};

var canvas = document.querySelector(".canvas");
var game = new Game(
  canvas.getContext("2d"),
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  20,
  document.querySelector(".scoreboard")
);
game.start();
