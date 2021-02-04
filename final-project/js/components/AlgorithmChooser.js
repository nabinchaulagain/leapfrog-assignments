import algorithms from '../algorithms/index.js';

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
    let options = Object.keys(algorithms).map((algName) => `<option value="${algName}">${algName}</option>`);
    this.select.innerHTML = options.join(''); // show all option tags one after another
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
   * @returns {class} currently selected algorithm class
   */
  getCurrAlgorithm() {
    return algorithms[this.select.value];
  }
}

export default AlgorithmChooser;
