import { CLF_REPORT_COL_SCHEME } from '../../constants.js';
import Matrix from '../../utils/Matrix.js';
import { harmonicMean } from '../../utils/math.js';
import Heatmap from '../Heatmap.js';

class ClassificationReport {
  /**
   * @param {HTMLElement} root
   */
  constructor(root) {
    this.data = Matrix.zeros(2, 3);
    this.heatmap = new Heatmap(root, ['Red', 'Green'], ['Precision', 'Recall', 'f1-score']);
    this.heatmap.addClass('classification-report');
    this.heatmap.render(this.data, 0, 1, CLF_REPORT_COL_SCHEME);
  }

  /**
   * update the reports based on confusion matrix
   * @param {Matrix} confMatrix - confusion matrix
   */
  update(confMatrix) {
    this.data = Matrix.zeros(2, 3);
    const truePositives = confMatrix.data[0][0];
    const falsePositives = confMatrix.data[0][1];
    const falseNegatives = confMatrix.data[1][0];
    const trueNegatives = confMatrix.data[1][1];
    const { data } = this.data;

    data[0][0] = truePositives / (truePositives + falsePositives); //precision of class 0
    data[0][1] = truePositives / (truePositives + falseNegatives); //recall of class 0
    data[0][2] = harmonicMean(data[0][0], data[0][1]); // f1-score of class 0

    data[1][0] = trueNegatives / (trueNegatives + falseNegatives); // precision of class 1
    data[1][1] = trueNegatives / (trueNegatives + falsePositives); // recall of class 1
    data[1][2] = harmonicMean(data[1][0], data[1][1]); //f1-score of class 1
    this.data = this.data.applyFunc((num) => (isNaN(num) || num == 0 ? 0 : num.toFixed(2)));
    this.heatmap.render(this.data, 0, 1, CLF_REPORT_COL_SCHEME);
  }
}

export default ClassificationReport;
