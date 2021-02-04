import { HYPER_PARAM_TYPES } from '../constants.js';
import { sigmoid, sigmoidPrime } from '../utils/math.js';
import Matrix from '../utils/Matrix.js';
import ClassificationAlgorithm from './ClassificationAlgorithm.js';
import { crossEntropy } from '../utils/metrics.js';

class MultiLayerPerceptron extends ClassificationAlgorithm {
  static requiresFeatureScaling = true;
  static outputsProbability = true;

  static hyperParamDefinition = {
    learningRate: {
      type: HYPER_PARAM_TYPES.NUMBER,
      default: 1,
      range: { min: 0.01, max: 10, step: 0.01 }
    },
    epochs: {
      type: HYPER_PARAM_TYPES.NUMBER,
      default: 100,
      range: { min: 1, max: 10000 }
    },
    hiddenUnits: {
      type: HYPER_PARAM_TYPES.RANGE,
      default: 10,
      range: { min: 2, max: 100 }
    }
  };

  /**
   * returns loss/error/cost of algorithm
   * @param {Matrix} X - features
   * @param {Matrix} Y - labels
   * @returns {number} binary cross entropy loss
   */
  calcCost(X, Y) {
    const [len] = X.shape;
    const preds = this.predictMany(X, false);
    return (-1 / len) * crossEntropy(preds, Y);
  }

  initParams(hiddenUnits) {
    const inputUnits = 2;
    const outputUnits = 1;
    this.w1 = Matrix.randomMatrix(hiddenUnits, inputUnits);
    this.b1 = Matrix.zeros(hiddenUnits, 1);
    this.w2 = Matrix.randomMatrix(outputUnits, hiddenUnits);
    this.b2 = Matrix.zeros(outputUnits, 1);
  }

  /**
   * do forward propagation
   * @param {number[]} x  array of features
   * @returns {Matrix} final layer activations
   */
  forwardProp(x) {
    this.a0 = new Matrix([x]).transpose(); //input layer activations
    this.z1 = this.w1.dot(this.a0).add(this.b1); //hidden layer activity
    this.a1 = this.z1.applyFunc(sigmoid); //hidden layer activations
    this.z2 = this.w2.dot(this.a1).add(this.b2); //output layer activity
    this.a2 = this.z2.applyFunc(sigmoid); //output layer activations
    return this.a2;
  }

  /**
   * returns the prediction of a feature array
   * @param {number[]} x  array of features
   * @param {boolean} outputLabel - wheth to return labels or probabilites when true/false respectively
   * @returns {number} output label or probability of class 0
   */
  predict(x, outputLabel = true) {
    const output = this.forwardProp(x).flatten();
    if (outputLabel) {
      return output > 0.5 ? 1 : 0;
    }
    return output;
  }

  /**
   * fit the parameters through the given data
   * @param {Matrix} X features
   * @param {Matrix} Y labels
   */
  train(X, Y) {
    const { learningRate, epochs, hiddenUnits } = this.hyperParams;
    this.initParams(hiddenUnits);
    for (let i = 0; i < epochs; i++) {
      for (let j = 0; j < X.shape[0]; j++) {
        const feature = X.data[j];
        const label = Y.data[j];
        this.forwardProp(feature);
        const dz2 = this.a2.scalarAddition(-label);
        const dz1 = this.w2.transpose().dot(dz2).multiply(this.z1.applyFunc(sigmoidPrime));
        const dw2 = dz2.dot(this.a1.transpose());
        const dw1 = dz1.dot(this.a0.transpose());
        const db2 = dz2.clone();
        const db1 = dz1.clone();
        this.w2 = this.w2.subtract(dw2.scalarMultiply(learningRate));
        this.w1 = this.w1.subtract(dw1.scalarMultiply(learningRate));
        this.b2 = this.b2.subtract(db2.scalarMultiply(learningRate));
        this.b1 = this.b1.subtract(db1.scalarMultiply(learningRate));
      }
    }
  }

  /**
   * returns predictions of given features
   * @param {Matrix} X - features
   * @param {boolean} outputLabels - whether or not to output labels
   * @returns {Matrix} predictions
   */
  predictMany(X, outputLabels = true) {
    if (outputLabels) {
      return super.predictMany(X);
    }
    const preds = X.data.map((row) => this.predict(row, false));
    return new Matrix([preds]).transpose();
  }
}

export default MultiLayerPerceptron;
