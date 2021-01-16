var getLeftPosition = function (element) {
  var left = getComputedStyle(element).left;
  return parseInt(left.substring(0, left.length - 2));
};

var DOT_SIZE = 20;
var IMG_WIDTH = 600;
var IMG_HEIGHT = 400;
var FR_TIME = 20; // how many ms 1 frame runs for
var ANIM_TIME = 1000; // how long 1 slide animation lasts for in ms
var NUM_FRAMES = ANIM_TIME / FR_TIME;
/**
 * Represents a carousel
 * @constructor
 * @param {HTMLElement} container - The main container
 * @param {HTMLElement} wrapper - The wrapper containing all the images
 */
var Carousel = function (container, wrapper) {
  this.container = container;
  this.wrapper = wrapper;
  this.imagesNum = wrapper.getElementsByTagName('img').length;
  this.wrapper.style.width = this.imagesNum * IMG_WIDTH + 'px';
  this.intializeButtons();
  this.intializeDots();
  this.currIdx = 0; // index of currently active image
  this.setCurrDot();
};

/** Add left and right buttons to carousel */
Carousel.prototype.intializeButtons = function () {
  this.btnLeft = document.createElement('button');
  this.btnRight = document.createElement('button');
  // do operations on both btns
  [this.btnLeft, this.btnRight].forEach(function (btn) {
    btn.innerHTML = '&#x2190;';
    btn.style.position = 'absolute';
    btn.style.background = '#000';
    btn.style.left = '20px';
    btn.style.top = '190px';
    btn.style.fontSize = '16px';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '100%';
    btn.style.padding = '10px';
    btn.style.cursor = 'pointer';
  });
  //override unique things for right btn
  this.btnRight.innerHTML = '&#x2192;';
  this.btnRight.style.left = null;
  this.btnRight.style.right = '20px';
};

/** Add dots */
Carousel.prototype.intializeDots = function () {
  this.dots = [];
  for (var i = 0; i < this.imagesNum; i++) {
    var dot = document.createElement('div');
    dot.style.width = DOT_SIZE + 'px';
    dot.style.height = DOT_SIZE + 'px';
    dot.style.display = 'inline-block';
    dot.style.background = '#fff';
    dot.style.cursor = 'pointer';
    dot.style.borderRadius = '100%';
    dot.style.marginRight = i === this.imagesNum - 1 ? 0 : DOT_SIZE + 'px'; // give margin right dot_size to all dots except last one
    dot.style.left = this.dots.push(dot);
  }
};

/** Show the carousel */
Carousel.prototype.show = function () {
  this.container.appendChild(this.btnLeft);
  this.container.appendChild(this.btnRight);
  var buttonsContainer = document.createElement('div');
  buttonsContainer.style.position = 'absolute';
  buttonsContainer.style.width = '100%';
  buttonsContainer.style.bottom = '0';
  buttonsContainer.style.textAlign = 'center';
  for (var i = 0; i < this.dots.length; i++) {
    buttonsContainer.appendChild(this.dots[i]);
  }
  this.container.appendChild(buttonsContainer);
  this.addEventListeners();
};

/** Slide to show image on right
 * @param {number} newPosition - new left position of wrapper to slide to
 * @param {number} changeFactor - how much to move on each frame
 */
Carousel.prototype.slideRight = function (newPosition, changeFactor) {
  var currPos = getLeftPosition(this.wrapper);
  var animate = function () {
    if (currPos <= newPosition) {
      this.setCurrDot();
      this.wrapper.style.left = newPosition + 'px'; //fix when new position is not exactly divisible by change factor.
      clearInterval(this.intervalId);
      return;
    }
    currPos -= changeFactor;
    this.wrapper.style.left = currPos + 'px';
  };
  this.intervalId = setInterval(animate.bind(this), FR_TIME);
};

/** Slide to show image on left
 * @param {number} newPosition - new left position of wrapper to slide to
 * @param {number} changeFactor - how much to move on each frame
 */
Carousel.prototype.slideLeft = function (newPosition, changeFactor) {
  var currPos = getLeftPosition(this.wrapper);
  var animate = function () {
    if (currPos >= newPosition) {
      this.setCurrDot();
      this.wrapper.style.left = newPosition + 'px'; //fix when new position is not exactly divisible by change factor.
      clearInterval(this.intervalId);
      return;
    }
    currPos += changeFactor;
    this.wrapper.style.left = currPos + 'px';
  };
  this.intervalId = setInterval(animate.bind(this), FR_TIME);
};

/** expand the current dot
 */
Carousel.prototype.setCurrDot = function () {
  var currDotIdx = this.currIdx;
  this.dots.forEach(function (dot, idx) {
    if (idx === currDotIdx) {
      dot.style.transform = 'scale(1.2)';
    } else {
      dot.style.transform = null;
    }
  });
};

/** Slide to index
 * @param {number} idx - index of image to slide to
 */
Carousel.prototype.slide = function (idx) {
  if (this.currIdx === idx) {
    return;
  }
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
  var newPosition = idx * -IMG_WIDTH;
  var currPosition = getLeftPosition(this.wrapper);
  if (this.currIdx > idx) {
    var changeFactor = Math.abs(newPosition - currPosition) / NUM_FRAMES;
    this.slideLeft(newPosition, changeFactor);
  } else if (this.currIdx < idx) {
    var changeFactor = Math.abs(currPosition - newPosition) / NUM_FRAMES;
    this.slideRight(newPosition, changeFactor);
  }
  this.currIdx = idx;
};

/** Add event listeners to buttons and dots */
Carousel.prototype.addEventListeners = function () {
  var that = this;
  this.btnLeft.addEventListener('click', function () {
    if (that.currIdx == 0) {
      that.slide(that.imagesNum - 1);
    } else {
      that.slide(that.currIdx - 1);
    }
  });
  this.btnRight.addEventListener('click', function () {
    that.slide((that.currIdx + 1) % that.imagesNum);
  });
  this.dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
      that.slide(i);
    });
  });
};
