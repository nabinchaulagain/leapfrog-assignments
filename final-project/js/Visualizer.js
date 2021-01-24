class Visualizer {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.algorithm = LogisticRegression;
    this.canvas = this.rootElement.querySelector('.canvas');
    this.plot = new Plot(this.canvas, true);
    this.confusionMatrix = new ConfusionMatrix(this.rootElement);
    this.confusionMatrix.render();
    this.addEventListeners();
  }
  addEventListeners() {
    const visualizeBtn = this.rootElement.querySelector('.vis-btn');
    visualizeBtn.addEventListener('click', () => {
      this.visualizeBoundary();
      const pointsScaled = this.scaler.scale(this.plot.points);
      this.confusionMatrix.update(
        this.plot.pointLabels,
        this.classifier.predictMany(pointsScaled, true)
      );
    });
  }

  visualizeBoundary() {
    if (this.plot.points.length < 1) {
      return;
    }
    this.plot.clear();
    this.scaler = new MinMaxScaler(this.plot.points);
    const pointsScaled = this.scaler.scale(this.plot.points);
    this.classifier = new this.algorithm();
    this.classifier.train(pointsScaled, this.plot.pointLabels, 1000);
    for (let i = 0; i <= this.plot.width - TILE_SIZE; i += TILE_SIZE) {
      for (let j = 0; j <= this.plot.height - TILE_SIZE; j += TILE_SIZE) {
        const x = i;
        const y = j;
        const point = this.scaler.scaleSingle([x, y]);
        const pred = this.classifier.predict(point);
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
