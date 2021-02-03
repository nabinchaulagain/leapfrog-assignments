import { HYPER_PARAM_TYPES } from '../constants.js';
import Matrix from '../utils/Matrix.js';
import { sigmoid } from '../utils/activations.js';
import { crossEntropy } from '../utils/metrics.js';
import ClassificationAlgorithm from './ClassificationAlgorithm.js';

class LogisticRegression extends ClassificationAlgorithm {
  static requiresDesignMatrix = true;

  static requiresFeatureScaling = true;

  static outputsProbability = true;

  static hyperParamDefinition = {
    learningRate: {
      type: HYPER_PARAM_TYPES.RANGE,
      default: 1,
      range: { min: 0.01, max: 10, step: 0.01 }
    },
    epochs: {
      type: HYPER_PARAM_TYPES.NUMBER,
      default: 1000,
      range: { min: 1, max: 10000 }
    }
  };

  constructor() {
    super();
    this.params = Matrix.zeros(3, 1);
  }

  /**
   * returns the prediction of a feature array
   * @param {number[]} x  array of features
   * @param {boolean} outputLabel - wheth to return labels or probabilites when true/false respectively
   * @returns {number} output label or probability of class 0
   */
  predict(x, outputLabel = true) {
    const xVec = new Matrix([[1, ...x]]);
    let res = xVec.dot(this.params).applyFunc(sigmoid);
    res = res.flatten();
    if (outputLabel) {
      return res > 0.5 ? 1 : 0;
    }
    return res;
  }

  /**
   * returns loss/error/cost of algorithm
   * @param {Matrix} X - features
   * @param {Matrix} Y - labels
   * @returns {number} cross entropy loss
   */
  calcCost(X, Y) {
    const [len] = X.shape;
    const preds = this.predictMany(X, false);
    return (-1 / len) * crossEntropy(preds, Y);
  }

  /**
   * returns predictions of given features
   * @param {Matrix} X - features
   * @param {boolean} outputLabels - whether or not to output labels
   * @returns {Matrix} predictions
   */
  predictMany(X, outputLabels = true) {
    let result = X.dot(this.params).applyFunc(sigmoid);
    if (outputLabels) {
      result = result.applyFunc((pred) => (pred > 0.5 ? 1 : 0));
    }
    return result;
  }

  /**
   * fit the parameters through the given data
   * @param {Matrix} X features
   * @param {Matrix} Y labels
   */
  train(X, Y) {
    const { learningRate, epochs } = this.hyperParams;
    for (let i = 0; i < epochs; i++) {
      const yHat = this.predictMany(X, false);
      const delta = X.transpose().dot(yHat.subtract(Y));
      this.params = this.params.subtract(delta.scalarMultiply(learningRate));
      // console.log(this.calcCost(X, Y));
    }
  }
}

export default LogisticRegression;
