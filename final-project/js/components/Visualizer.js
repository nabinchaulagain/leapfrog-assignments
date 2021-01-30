import LogisticRegression from '../algorithms/LogisticRegression.js';
import Scaler from '../utils/Scaler.js';
import HyperParameterList from './HyperParameterList.js';
import Plot from './Plot.js';
import Matrix from '../utils/Matrix.js';
import ConfusionMatrix from './ConfusionMatrix.js';
import { C1_BG_COLOR, C2_BG_COLOR, TILE_SIZE } from '../constants.js';
import { accuracy } from '../utils/metrics.js';
import FileManager from './FileManager.js';
import { saveFile } from '../utils/file.js';
import ClassificationReport from './ClassificationReport.js';

/** represents a classification algorithm visualizer */
class Visualizer {
  /**
   * @param {HTMLElement} rootElement
   */
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.algorithm = LogisticRegression;
    this.initHyperParams();
    this.visContainer = document.createElement('div');
    this.visContainer.classList.add('root-container');
    this.initPlot();
    this.initButtons();
    this.initEvaluation();
    this.addEventListeners();
  }

  /** initialize plot */
  initPlot() {
    this.plot = new Plot(this.visContainer, true);
    this.rootElement.appendChild(this.visContainer);
  }

  /** iniitalize train, upload and download button */
  initButtons() {
    this.visBtn = document.createElement('button');
    this.visBtn.innerHTML = 'Train & Visualize';
    this.visContainer.appendChild(this.visBtn);
    this.fileManager = new FileManager(this.visContainer);
  }

  /** download plot data */
  downloadData() {
    saveFile(
      JSON.stringify({
        features: this.plot.points,
        labels: this.plot.pointLabels,
      }),
      'data.json',
      'application/json'
    );
  }

  /**
   * handle upload of plot data
   * @param {Object} data - plot data
   */
  uploadData(data) {
    const { features, labels } = data;
    for (let i = 0; i < features.length; i++) {
      this.plot.addPoint(...features[i], labels[i]);
    }
  }
  /**
   * start evaluation of algorithm results
   */
  initEvaluation() {
    this.evaluationContainer = document.createElement('div');
    this.evaluationContainer.classList.add('evaluation-container');
    this.rootElement.appendChild(this.evaluationContainer);
    this.confusionMatrix = new ConfusionMatrix(this.evaluationContainer);
    this.classificationReport = new ClassificationReport(
      this.evaluationContainer
    );
    this.evaluationScoresDisplayer = document.createElement('div');
    this.evaluationScoresDisplayer.classList.add('evaluation-scores');
    this.evaluationScoresDisplayer.innerHTML = 'Accuracy: n/a';
    this.evaluationContainer.appendChild(this.evaluationScoresDisplayer);
  }

  /** initialize hyper parameter of given algorithm */
  initHyperParams() {
    this.hyperParams = new HyperParameterList(
      this.rootElement,
      this.algorithm.hyperParamDefinition
    );
  }
  /**
   *  returns whether everything is valid
   *  @returns {boolean} - are plot points and hyperparams valid
   */
  validate() {
    if (this.plot.points.length < 1 || this.hyperParams.hasErrors()) {
      return false;
    }
    this.hyperParams.validateData(this.plot.points);
    if (this.hyperParams.hasErrors()) {
      return false;
    }
    return true;
  }

  /** add event listeners to buttons */
  addEventListeners() {
    this.visBtn.addEventListener('click', () => {
      if (this.validate()) {
        this.visualizeBoundary();
        this.evaluate();
      }
    });
    this.fileManager.addDownloadListeners(() => {
      this.downloadData();
    });
    this.fileManager.addUploadListener((text) => {
      this.uploadData(text);
    });
  }

  /** visualize colored decision boundary */
  visualizeBoundary() {
    this.plot.clear();
    let points = this.plot.points;
    if (this.algorithm.requiresFeatureScaling) {
      const scaler = new Scaler([0, 0], [this.plot.width, this.plot.height]);
      points = scaler.scale(this.plot.points);
    }
    this.classifier = new this.algorithm();
    this.classifier.hyperParams = this.hyperParams.values; //inject hyperparams into classifier
    this.X = new Matrix(points);
    if (this.algorithm.requiresDesignMatrix) {
      this.X = this.X.insertCol(1); // insert 1 at the start of each row to make design matrix
    }
    this.Y = new Matrix([this.plot.pointLabels]).transpose();
    this.classifier.train(this.X, this.Y);
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
          pred == 1 ? C2_BG_COLOR : C1_BG_COLOR
        );
      }
    }
    this.plot.redraw();
  }

  /** show confusion matrix and other metrics */
  evaluate() {
    let predictions = this.classifier.predictMany(this.X, this.Y);
    predictions = predictions.flatten(); // flatten matrix to array
    this.confusionMatrix.update(this.plot.pointLabels, predictions);
    this.classificationReport.update(this.confusionMatrix.matrix);
    const acc = accuracy(predictions, this.plot.pointLabels);
    this.evaluationScoresDisplayer.innerHTML = `Accuracy: ${acc.toFixed(2)}%`;
  }
}

export default Visualizer;