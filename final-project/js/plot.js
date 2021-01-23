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
    this.ctx = this.canvas.getContext("2d");
    if (isInteractive) {
      this.attachControls();
    }
  }

  /** add scatter points */
  scatter(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, Plot.pointRadius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  /** react to click events */
  attachControls() {
    this.canvas.addEventListener("contextmenu", (ev) => {
      ev.preventDefault(); //dont show menu
    });
    this.canvas.addEventListener("mousedown", (ev) => {
      const x = ev.clientX - this.canvas.offsetLeft;
      const y = ev.clientY - this.canvas.offsetTop;
      if (ev.button === 0) {
        this.ctx.fillStyle = "#f00";
      } else if (ev.button === 2) {
        this.ctx.fillStyle = "#0f0";
      }
      this.scatter(x, y);
    });
  }
}

Plot.pointRadius = 5;
