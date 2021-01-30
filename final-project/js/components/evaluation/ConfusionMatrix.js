import { CONF_MAT_COL_SCHEME } from '../../constants.js';
import Matrix from '../../utils/Matrix.js';
import HeatMap from '../Heatmap.js';

class ConfusionMatrix {
  /**
   * @param {HTMLElement} root - root element
   */
  constructor(root) {
    this.initData();
    this.initHeatmap(root);
  }

  /**
   * initialize heatmap
   * @param {HTMLElement} root - root element
   */
  initHeatmap(root) {
    const rowLabels = ['Actually red', 'Actually green'];
    const colLabels = ['Predicted Red', 'Predicted Green'];
    this.heatmap = new HeatMap(root, colLabels, rowLabels);
    this.heatmap.addClass('confusion-matrix');
    this.heatmap.render(this.matrix, this.min, this.max, CONF_MAT_COL_SCHEME);
  }

  /** initialize data regarding the confusion matrix */
  initData() {
    this.min = 0;
    this.matrix = Matrix.zeros(2, 2);
    this.max = 0;
  }

  /**
   * update the data based on labels and predictions
   * @param {number[]} labels - actual classes
   * @param {number[]} predictions - predicted classes
   */
  update(labels, predictions) {
    this.initData(); //reset any previous existing data
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const prediction = predictions[i];
      this.matrix.data[prediction][label]++;
    }
    this.min = Math.max(...this.matrix.min()); //get min value from entire matrix
    this.max = Math.max(...this.matrix.max()); //get max value from entire matrix
    this.heatmap.render(this.matrix, this.min, this.max, CONF_MAT_COL_SCHEME);
  }
}

export default ConfusionMatrix;
