import ClassificationAlgorithm from '../algorithms/ClassificationAlgorithm.js';
import KNearestNeigbors from '../algorithms/KNearestNeighbors.js';
import LogisticRegression from '../algorithms/LogisticRegression.js';
import MultiLayerPerceptron from '../algorithms/MultiLayerPerceptron.js';
import DecisionTree from '../algorithms/DecisionTree.js';
import RandomForest from '../algorithms/RandomForest.js';
import Adaboost from '../algorithms/Adaboost.js';

const algorithms = {
  'Logistic regression': LogisticRegression,
  'Multi-layer perceptron': MultiLayerPerceptron,
  'K-nearest neighbors': KNearestNeigbors,
  'Decision tree': DecisionTree,
  'Random Forest': RandomForest,
  Adaboost,
};

class AlgorithmChooser {
  /**
   * @param {HTMLElement} root - root element
   */
  constructor(root) {
    const container = document.createElement('div');
    container.classList.add('alg-chooser-container');
    this.initSelect(container);
    root.appendChild(container);
  }

  /**
   * initilize select dropdown and it's options
   * @param {HTMLElement} container
   */
  initSelect(container) {
    this.select = document.createElement('select');
    this.select.id = 'alg-chooser';
    let options = Object.keys(algorithms).map(
      (algName) => `<option value="${algName}">${algName}</option>`
    );
    this.select.innerHTML = options.join(''); // show all option tags one after another

    // const label = document.createElement('label');
    // label.id = 'alg-chooser';
    // label.innerHTML = 'Algorithm';

    // container.appendChild(label);
    container.appendChild(this.select);
  }

  /**
   * add change listener to select element
   * @param {function} listener
   */
  addChangeListener(listener) {
    this.select.addEventListener('change', listener);
  }

  /**
   * returns the currently selected algorithm
   * @returns {ClassificationAlgorithm} currently selected algorithm
   */
  getCurrAlgorithm() {
    return algorithms[this.select.value];
  }
}

export default AlgorithmChooser;
