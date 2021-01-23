class Plot {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {boolean} isInteractive
   * @param {number} width
   * @param {number} height
   */
  constructor(canvas, isInteractive, width = 500, height = 500) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    if (isInteractive) {
      this.attachControls();
    }
    this.points = [];
    this.pointLabels = [];
  }

  /**
   *  add scatter points
   * @param {number} x - x co-ordinate
   * @param {number} y - y co-ordinate
   */
  scatter(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, PLOT_POINT_RADIUS, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  /** react to click events */
  attachControls() {
    this.canvas.addEventListener('contextmenu', (ev) => {
      ev.preventDefault(); //dont show menu
    });
    this.canvas.addEventListener('mousedown', (ev) => {
      const x = ev.clientX - this.canvas.offsetLeft;
      const y = ev.clientY - this.canvas.offsetTop;
      this.points.push([x, y]);
      if (ev.button === 0) {
        this.ctx.fillStyle = C1_COLOR;
        this.pointLabels.push(0);
      } else if (ev.button === 2) {
        this.ctx.fillStyle = C2_COLOR;
        this.pointLabels.push(1);
      } else {
        return;
      }
      this.scatter(x, y);
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
    this.ctx.globalCompositeOperation = 'source-over';

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
