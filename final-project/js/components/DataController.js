import { UPLOAD_ANIM_TIME } from '../constants.js';
import { waitFor } from '../utils/misc.js';
import { genRandomDataset } from '../utils/random.js';

class DataController {
  /**
   * @param {HTMLElement} root
   * @param {Plot} plot
   */
  constructor(root, plot) {
    this.root = root;
    this.plot = plot;
    this.initEl();
    this.addEventListeners();
  }

  /** initiliaze buttons */
  initEl() {
    const container = document.createElement('div');
    container.classList.add('data-control-btns');
    this.generateBtn = document.createElement('button');
    this.clearBtn = document.createElement('button');
    [this.generateBtn, this.clearBtn].forEach((btn) => {
      btn.classList.add('btn', 'btn-yellow');
      container.appendChild(btn);
    });
    this.clearBtn.classList.remove('btn-yellow');
    this.clearBtn.classList.add('btn-red');
    this.generateBtn.innerHTML = 'Generate dataset';
    this.clearBtn.innerHTML = 'Clear';
    this.root.appendChild(container);
  }

  /**
   * add number of points to plot
   * @param {number[][]} features - 2d array of points
   * @param {number[]} labels - array of 0's and 1's indicating point class
   * @returns {Promise}
   */
  async addPoints(features, labels) {
    for (let i = 0; i < features.length; i++) {
      this.plot.addPoint(...features[i], labels[i]);
      await waitFor(UPLOAD_ANIM_TIME);
    }
  }

  /** add event listeners to buttons */
  addEventListeners() {
    this.generateBtn.addEventListener('click', async () => {
      const { features, labels } = await genRandomDataset();
      this.clearData();
      this.addPoints(features, labels);
    });
    this.clearBtn.addEventListener('click', this.clearData.bind(this));
  }

  /** clear plot and data */
  clearData() {
    this.plot.clear();
    this.plot.points = [];
    this.plot.pointLabels = [];
  }

  /**returns data on plot
   * @returns {Object} object with features and labels properties
   */
  getData() {
    return { features: this.plot.points, labels: this.plot.pointLabels };
  }
}

export default DataController;
