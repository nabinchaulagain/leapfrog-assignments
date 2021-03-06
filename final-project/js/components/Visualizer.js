import Scaler from '../utils/Scaler.js';
import HyperParameterList from './HyperParameterList.js';
import Plot from './Plot.js';
import Matrix from '../utils/Matrix.js';
import ConfusionMatrix from './evaluation/ConfusionMatrix.js';
import { C1_BG_COLOR, C2_BG_COLOR, TILE_SIZE, VIS_ANIM_SPEED } from '../constants.js';
import { accuracy } from '../utils/metrics.js';
import FileManager from './FileManager.js';
import { saveFile } from '../utils/file.js';
import ClassificationReport from './evaluation/ClassificationReport.js';
import AlgorithmChooser from './AlgorithmChooser.js';
import { waitFor } from '../utils/misc.js';
import Instructions from './Instructions.js';
import DataController from './DataController.js';

/** represents a classification algorithm visualizer */
class Visualizer {
  /**
   * @param {HTMLElement} rootElement
   */
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.visContainer = document.createElement('div');
    this.visContainer.classList.add('root-container');
    this.initInstructions();
    this.initChooser();
    this.initHyperParams();
    this.initPlot();
    this.initButtons();
    this.rootElement.appendChild(this.visContainer);
    this.initEvaluation();
    this.addEventListeners();
  }

  /** set this.algorithm to selected algorithm */
  setCurrAlgorithm() {
    this.algorithm = this.chooser.getCurrAlgorithm();
  }

  /** show instructions if neccessary */
  initInstructions() {
    const instructionsBtn = document.createElement('button');
    instructionsBtn.classList.add('show-instructions-btn');
    instructionsBtn.innerHTML = '&#9432;';
    instructionsBtn.addEventListener('click', () => {
      const instructions = new Instructions(this.rootElement);
      instructions.show();
    });
    this.rootElement.appendChild(instructionsBtn);
    //show instructions if opening site for first time
    if (!localStorage.getItem('instructionsShown')) {
      const instructions = new Instructions(this.rootElement);
      instructions.show();
      localStorage.setItem('instructionsShown', true);
    }
  }

  /** initialize algorithm chooser */
  initChooser() {
    this.chooser = new AlgorithmChooser(this.rootElement);
    this.setCurrAlgorithm();
    this.chooser.addChangeListener(() => {
      this.setCurrAlgorithm();
      this.reinitHyperParams();
    });
  }

  /** initialize plot */
  initPlot() {
    this.plot = new Plot(this.visContainer, true);
  }

  /** iniitalize train, upload and download button */
  initButtons() {
    this.visBtn = document.createElement('button');
    this.visBtn.classList.add('vis-btn', 'btn', 'btn-primary');
    this.visBtn.innerHTML = 'Train & Visualize';
    this.visContainer.appendChild(this.visBtn);
    this.dataController = new DataController(
      this.visContainer,
      this.plot,
      this.enableButtons.bind(this),
      this.disableButtons.bind(this)
    ); // generate and clear button
    this.fileManager = new FileManager(this.visContainer); // upload and download button
  }

  /** disable all buttons */
  disableButtons() {
    this.rootElement.querySelectorAll('.btn').forEach((btn) => {
      btn.classList.add('disabled');
      btn.disabled = true;
    });
  }

  /** enable all buttons */
  enableButtons() {
    this.rootElement.querySelectorAll('.btn').forEach((btn) => {
      btn.classList.remove('disabled');
      btn.disabled = false;
    });
  }

  /** download plot data */
  downloadData() {
    saveFile(JSON.stringify(this.dataController.getData()), 'data.json', 'application/json');
  }

  /**
   * handle upload of plot data
   * @param {Object} data - plot data
   */
  async uploadData(data) {
    const { features, labels } = data;
    this.dataController.addPoints(features, labels);
  }
  /**
   * start evaluation of algorithm results
   */
  initEvaluation() {
    this.evaluationContainer = document.createElement('div');
    this.evaluationContainer.classList.add('evaluation-container');
    this.rootElement.appendChild(this.evaluationContainer);
    this.confusionMatrix = new ConfusionMatrix(this.evaluationContainer);
    this.classificationReport = new ClassificationReport(this.evaluationContainer);
    this.evaluationScoresDisplayer = document.createElement('div');
    this.evaluationScoresDisplayer.classList.add('evaluation-scores');
    this.evaluationScoresDisplayer.innerHTML = 'Accuracy: n/a';
    this.evaluationContainer.appendChild(this.evaluationScoresDisplayer);
  }

  /** initialize hyper parameter of selected algorithm */
  initHyperParams() {
    this.hyperParams = new HyperParameterList(this.rootElement, this.algorithm.hyperParamDefinition);
  }

  /** re initliaze hyper parameters of selected algorithm */
  reinitHyperParams() {
    this.hyperParams.container.innerHTML = ''; //empty container
    this.hyperParams.el.innerHTML = ''; //empty ul element
    this.hyperParams.initChildren(this.algorithm.hyperParamDefinition);
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
    this.visBtn.addEventListener('click', async () => {
      if (this.validate()) {
        this.disableButtons();
        await this.visualize();
        this.evaluate();
        this.enableButtons();
      }
    });
    this.fileManager.addDownloadListeners(() => {
      this.downloadData();
    });
    this.fileManager.addUploadListener((text) => {
      this.uploadData(text);
    });
  }

  /** preprocess data, train classifier and visualize boundary */
  async visualize() {
    this.plot.clear();
    this.plot.redraw();
    this.preprocessData();
    this.classifier.train(this.X, this.Y);
    await this.visualizeBoundary();
  }

  /** visualize colored decision boundary */
  async visualizeBoundary() {
    for (let i = 0; i <= this.plot.width - TILE_SIZE; i += TILE_SIZE) {
      for (let j = 0; j <= this.plot.height - TILE_SIZE; j += TILE_SIZE) {
        let feature = [i, j];
        if (this.algorithm.requiresFeatureScaling) {
          feature = [i / this.plot.width, j / this.plot.height]; // scaling between 0-1
        }
        let predColor;
        let intensity = 1;
        if (this.algorithm.outputsProbability) {
          const predProb = this.classifier.predict(feature, false);
          if (predProb > 0.5) {
            intensity = predProb.toFixed(1);
            predColor = C2_BG_COLOR;
          } else {
            intensity = 1 - predProb;
            predColor = C1_BG_COLOR;
          }
        } else {
          const pred = this.classifier.predict(feature);
          predColor = pred === 0 ? C1_BG_COLOR : C2_BG_COLOR;
        }
        predColor = `rgba(${[...predColor, intensity].join(',')})`; //convert array to rgba
        this.plot.drawSquare(i, j, TILE_SIZE, TILE_SIZE, predColor);
      }
      if (i % VIS_ANIM_SPEED === 0) {
        await waitFor(1);
      }
    }
  }

  /** preprocess data for training the algorithm */
  preprocessData() {
    const { features, labels } = this.dataController.getData();
    let points = features;
    if (this.algorithm.requiresFeatureScaling) {
      const scaler = new Scaler([0, 0], [this.plot.width, this.plot.height]);
      points = scaler.scale(features);
    }
    this.classifier = new this.algorithm();
    this.classifier.hyperParams = this.hyperParams.values; //inject hyperparams into classifier
    this.X = new Matrix(points);
    if (this.algorithm.requiresDesignMatrix) {
      this.X = this.X.insertCol(1); // insert 1 at the start of each row to make design matrix
    }
    this.Y = new Matrix([labels]).transpose();
  }

  /** show confusion matrix and other metrics */
  evaluate() {
    let predictions = this.classifier.predictMany(this.X, this.Y);
    predictions = predictions.flatten(); // flatten matrix to array
    if (typeof predictions === 'number') {
      predictions = [predictions]; //if matrix is flattened to number change it to a array
    }
    this.confusionMatrix.update(this.plot.pointLabels, predictions);
    this.classificationReport.update(this.confusionMatrix.matrix);
    const acc = accuracy(predictions, this.plot.pointLabels);
    this.evaluationScoresDisplayer.innerHTML = `Accuracy: ${acc.toFixed(2)}%`;
  }
}

export default Visualizer;
