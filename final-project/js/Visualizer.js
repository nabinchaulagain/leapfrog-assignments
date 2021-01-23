class Visualizer {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.algorithm = LogisticRegression;
    this.canvas = this.rootElement.querySelector('.canvas');
    this.plot = new Plot(this.canvas, true);
    this.addEventListeners();
  }
  addEventListeners() {
    const visualizeBtn = this.rootElement.querySelector('.vis-btn');
    visualizeBtn.addEventListener('click', this.visualizeBoundary.bind(this));
  }

  visualizeBoundary() {
    if (this.plot.points.length < 1) {
      return;
    }
    this.plot.clear();
    const scale = new MinMaxScaler(this.plot.points);
    const pointsScaled = scale.scale(this.plot.points);
    const classifier = new this.algorithm();
    classifier.train(pointsScaled, this.plot.pointLabels, 1000);
    for (let i = 0; i <= this.plot.width - TILE_SIZE; i += TILE_SIZE) {
      for (let j = 0; j <= this.plot.height - TILE_SIZE; j += TILE_SIZE) {
        const x = i;
        const y = j;
        const point = scale.scaleSingle([x, y]);
        const pred = classifier.predict(point);
        this.plot.drawSquare(
          x,
          y,
          TILE_SIZE,
          TILE_SIZE,
          pred > 0.5 ? C2_BG_COLOR : C1_BG_COLOR
        );
      }
    }
    this.plot.redraw();
  }
}
