import { C1_COLOR, C2_COLOR, PLOT_POINT_RADIUS } from '../constants.js';

class Plot {
  /**
   * @param {HTMLElement} container
   * @param {boolean} isInteractive
   * @param {number} width
   * @param {number} height
   */
  constructor(container, isInteractive, width = 500, height = 500) {
    this.initCanvas(container, width, height);
    this.ctx = this.canvas.getContext('2d');
    if (isInteractive) {
      this.attachControls();
    }
    this.points = [];
    this.pointLabels = [];
  }

  /**
   * create and initialize properties of canvas
   * @param {HTMLElement} container - container of the canvas
   * @param {number} width - width of canvas
   * @param {number} height - height of canvas
   */
  initCanvas(container, width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('canvas');
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    container.appendChild(this.canvas);
  }

  /**
   *  add scatter points
   * @param {number} x - x co-ordinate
   * @param {number} y - y co-ordinate
   */
  scatter(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, PLOT_POINT_RADIUS, 0, 2 * Math.PI);
    this.ctx.globalCompositeOperation = 'source-over'; //draw over existing content
    this.ctx.fill();
  }

  /**
   * add scatter point
   * @param {number} x - x co-ordinate
   * @param {number} y - y co-ordinate
   * @param {number} cls - 0 or 1 class
   */
  addPoint(x, y, cls) {
    this.ctx.fillStyle = cls === 0 ? C1_COLOR : C2_COLOR;
    this.points.push([x, y]);
    this.pointLabels.push(cls);
    this.scatter(x, y);
  }

  /** react to click events */
  attachControls() {
    this.canvas.addEventListener('contextmenu', (ev) => {
      ev.preventDefault(); //dont show menu
    });
    this.canvas.addEventListener('mousedown', (ev) => {
      const x = ev.clientX - this.canvas.offsetLeft;
      const y = ev.clientY - this.canvas.offsetTop;
      let cls;
      if (ev.button === 0) {
        cls = 0;
      } else if (ev.button === 2) {
        cls = 1;
      } else {
        return;
      }
      this.addPoint(x, y, cls);
    });
  }

  /**
   * @param {number} x - x co-ordinate
   * @param {number} y - y co-ordinate
   * @param {number} w - width
   * @param {number} h - height
   * @param {string} color - square color
   */
  drawSquare(x, y, w, h, color) {
    this.ctx.globalCompositeOperation = 'destination-over'; // draw behind existing content
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  /** clear the plot */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /** redraw scatter plot */
  redraw() {
    for (let i = 0; i < this.points.length; i++) {
      const color = this.pointLabels[i] === 0 ? C1_COLOR : C2_COLOR;
      this.ctx.fillStyle = color;
      this.scatter(this.points[i][0], this.points[i][1]);
    }
  }
}

export default Plot;
