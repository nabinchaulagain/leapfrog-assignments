class Visualizer {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.algorithm = LogisticRegression;
    this.canvas = this.rootElement.querySelector('.canvas');
    this.plot = new Plot(this.canvas, true);
    this.initEvaluation();
    this.addEventListeners();
  }

  initEvaluation() {
    this.evaluationContainer = document.createElement('div');
    this.evaluationContainer.classList.add('evaluation-container');
    this.rootElement.appendChild(this.evaluationContainer);
    this.confusionMatrix = new ConfusionMatrix(this.evaluationContainer);
    this.confusionMatrix.render();
    this.evaluationScoresDisplayer = document.createElement('div');
    this.evaluationScoresDisplayer.classList.add('evaluation-scores');
    this.evaluationScoresDisplayer.innerHTML = 'Accuracy: n/a';
    this.evaluationContainer.appendChild(this.evaluationScoresDisplayer);
  }

  addEventListeners() {
    const visualizeBtn = this.rootElement.querySelector('.vis-btn');
    visualizeBtn.addEventListener('click', () => {
      this.visualizeBoundary();
      this.evaluate();
    });
  }

  visualizeBoundary() {
    if (this.plot.points.length < 1) {
      return;
    }
    this.plot.clear();
    this.scaler = new MinMaxScaler([0, 0], [this.plot.width, this.plot.height]);
    const pointsScaled = this.scaler.scale(this.plot.points);
    this.classifier = new this.algorithm();
    this.classifier.train(pointsScaled, this.plot.pointLabels, 1000);
    for (let i = 0; i <= this.plot.width - TILE_SIZE; i += TILE_SIZE) {
      for (let j = 0; j <= this.plot.height - TILE_SIZE; j += TILE_SIZE) {
        const x = i / this.plot.width;
        const y = j / this.plot.height;
        const pred = this.classifier.predict([x, y]);
        this.plot.drawSquare(
          i,
          j,
          TILE_SIZE,
          TILE_SIZE,
          pred > 0.5 ? C2_BG_COLOR : C1_BG_COLOR
        );
      }
    }
    this.plot.redraw();
  }

  evaluate() {
    const pointsScaled = this.scaler.scale(this.plot.points);
    const predictions = this.classifier.predictMany(pointsScaled, true);
    this.confusionMatrix.update(this.plot.pointLabels, predictions);
    const acc = accuracy(predictions, this.plot.pointLabels);
    this.evaluationScoresDisplayer.innerHTML = `Accuracy: ${acc.toFixed(2)}%`;
  }
}
