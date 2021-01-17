/**
 *Get left position of element
 * @param {HTMLElement} element
 * @returns {number} left position of element
 */
var getLeftPosition = function (element) {
  var left = getComputedStyle(element).left;
  return parseInt(left.substring(0, left.length - 2));
};

// constants
var DOT_SIZE = 20;
var DEFAULT_WIDTH = 600;
var DEFAULT_HEIGHT = 400;
var DEFAULT_TRANSITION_TIME = 2000;
var DEFAULT_HOLD_TIME = 1000;

var FR_TIME = 20; // how many ms 1 frame runs for

/**
 * Represents a carousel
 * @constructor
 * @param {HTMLElement} container - main container
 * @param {HTMLElement} wrapper - wrapper containing all the images
 * @param {number} transitionTime - time for automatically transistining from one frame to another
 * @param {number} holdTime - time to hold a image
 * @param {number} width - width of image
 * @param {number} height - height of image
 */
var Carousel = function (
  container,
  wrapper,
  transitionTime,
  holdTime,
  width,
  height
) {
  this.container = container;
  this.wrapper = wrapper;
  this.images = Array.from(wrapper.getElementsByTagName('img'));
  this.imagesNum = this.images.length;
  this.transitionTime = transitionTime || DEFAULT_TRANSITION_TIME;
  this.holdTime = holdTime || DEFAULT_HOLD_TIME;
  this.numberFrames = transitionTime / FR_TIME;
  this.width = width || DEFAULT_WIDTH;
  this.height = height || DEFAULT_HEIGHT;
  this.maxWidth = this.width;
  this.maxHeight = this.height;
  this.ratio = this.height / this.width;
  this.currIdx = 0; // index of currently active image
  this.init();
  this.setCurrDot();
};

/** Initialize container, wrapper, buttons, dots and images */
Carousel.prototype.init = function () {
  var width = this.container.parentNode.clientWidth;
  if (width <= this.maxWidth) {
    this.width = width;
    this.height = this.ratio * width;
  } else {
    this.width = this.maxWidth;
    this.height = this.maxHeight;
  }
  this.wrapper.style.width = this.imagesNum * this.width + 'px';
  this.wrapper.style.height = this.height + 'px';
  this.container.style.width = this.width + 'px';
  this.container.style.height = this.height + 'px';
  this.intializeButtons();
  this.intializeDots();
  this.intializeImages();
};

/** Give styles to images */
Carousel.prototype.intializeImages = function () {
  var that = this;
  this.images.forEach(function (img) {
    img.style.width = that.width + 'px';
    img.style.height = that.height + 'px';
  });
};

/** Add left and right buttons to carousel */
Carousel.prototype.intializeButtons = function () {
  var that = this;
  if (!this.btnLeft) {
    this.btnLeft = document.createElement('button');
  }
  if (!this.btnRight) {
    this.btnRight = document.createElement('button');
  }
  // do operations on both btns
  [this.btnLeft, this.btnRight].forEach(function (btn) {
    btn.innerHTML = '&#x2190;';
    btn.style.position = 'absolute';
    btn.style.background = '#000';
    btn.style.left = '20px';
    btn.style.top = that.height / 2 - 16 + 'px';
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
  if (this.dots && this.dots.length == this.imagesNum) {
    return;
  }
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
    this.dots.push(dot);
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
  this.autoTransititon();
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
      this.autoTransititon();
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
      this.autoTransititon();
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
  console.log(currDotIdx);
  for (var i = 0; i < this.dots.length; i++) {
    if (i == currDotIdx) {
      this.dots[i].style.transform = 'scale(1.2)';
    } else {
      this.dots[i].style.transform = null;
    }
  }
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
  if (this.autoIntervalId) {
    clearInterval(this.autoIntervalId);
  }
  var newPosition = idx * -this.width;
  var currPosition = getLeftPosition(this.wrapper);
  if (this.currIdx > idx) {
    var changeFactor = Math.abs(newPosition - currPosition) / this.numberFrames;
    this.slideLeft(newPosition, changeFactor);
  } else if (this.currIdx < idx) {
    var changeFactor = Math.abs(currPosition - newPosition) / this.numberFrames;
    this.slideRight(newPosition, changeFactor);
  }
  this.currIdx = idx;
};

/** Add event listeners to buttons and dots */
Carousel.prototype.addEventListeners = function () {
  var that = this;
  //attach button click listeners
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
  //attach dot click listeners
  this.dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
      that.slide(i);
    });
  });
  //make responsive
  window.addEventListener('resize', this.init.bind(this));
};

/** Make auto transition */
Carousel.prototype.autoTransititon = function () {
  var that = this;
  that.autoIntervalId = setInterval(function () {
    that.slide((that.currIdx + 1) % that.imagesNum);
  }, this.holdTime);
};
