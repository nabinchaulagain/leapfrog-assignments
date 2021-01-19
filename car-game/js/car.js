/**
 * @constructor
 * @param {boolean} isPlayer
 * @param {number} laneIdx
 * @param {number} y
 */
function Car(isPlayer, laneIdx, y) {
  this.isPlayer = isPlayer;
  this.image = new Image();
  this.image.src = './images/car.png';
  if (laneIdx === undefined) {
    laneIdx = 0;
  }
  this.x = (LANE_WIDTH - CAR_WIDTH) / 2 + LANE_WIDTH * laneIdx;
  this.y = y !== undefined || CANVAS_HEIGHT - CAR_HEIGHT;
  this.lane = laneIdx;
  if (this.isPlayer) {
    this.addControls();
  }
}

/**
 * Draw car on canvas
 * @param {CanvasRenderingContext2D} ctx
 */
Car.prototype.draw = function (ctx) {
  ctx.drawImage(this.image, this.x, this.y, CAR_WIDTH, CAR_HEIGHT);
};

/** Attach controls to car */
Car.prototype.addControls = function () {
  var handleKeyDown = function (ev) {
    if (ev.key === 'ArrowLeft' || ev.key.toLowerCase() === 'a') {
      if (this.lane <= 0) {
        return;
      }
      this.lane--;
      this.x -= LANE_WIDTH;
    }
    if (ev.key === 'ArrowRight' || ev.key.toLowerCase() === 'd') {
      if (this.lane >= 2) {
        return;
      }
      this.lane++;
      this.x += LANE_WIDTH;
    }
  };
  document.addEventListener('keydown', handleKeyDown.bind(this));
};

/**
 * Update car
 */
Car.prototype.update = function (speed) {
  if (this.isPlayer) {
    return;
  }
  this.y += speed;
};

/**
 * checks if car is out of screen or not
 * @returns {boolean} whether or not car is out of screen
 */
Car.prototype.isOutOfScreen = function () {
  return this.y >= CANVAS_HEIGHT;
};

/**checks if given car is colliding with this car
 * @param {Car} car
 * @returns {boolean}
 */
Car.prototype.isColliding = function (car) {
  return (
    this.x < car.x + CAR_WIDTH &&
    this.x + CAR_WIDTH > car.x &&
    this.y < car.y + CAR_HEIGHT &&
    this.y + CAR_HEIGHT > car.y
  );
};
