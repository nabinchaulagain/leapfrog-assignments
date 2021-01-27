import { HYPER_PARAM_TYPES } from './constants.js';
import Matrix from './Matrix.js';

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export class MinMaxScaler {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  scaleSingle(x) {
    return [
      (x[0] - this.min[0]) / (this.max[0] - this.min[0]),
      (x[1] - this.min[1]) / (this.max[1] - this.min[1]),
    ];
  }
  scale(X) {
    const scaled = [];
    for (let i = 0; i < X.length; i++) {
      const x = X[i];
      scaled[i] = this.scaleSingle(x);
    }
    return scaled;
  }
}

class LogisticRegression {
  static requiresDesignMatrix = true;

  static requiresFeatureScaling = true;

  static hyperParamDefinition = {
    learningRate: {
      type: HYPER_PARAM_TYPES.NUMBER,
      default: 0.1,
      range: { min: 0.001, max: 50 },
    },
    epochs: {
      type: HYPER_PARAM_TYPES.NUMBER,
      default: 1000,
      range: { min: 1, max: 10000 },
    },
  };

  constructor() {
    this.params = Matrix.randomMatrix(3, 1);
  }

  predict(x, outputLabel = true) {
    const xVec = new Matrix([[1, ...x]]);
    let res = xVec.dot(this.params).applyFunc(sigmoid);
    res = res.flatten();
    if (outputLabel) {
      return res > 0.5 ? 1 : 0;
    }
    return res;
  }

  calcCost(X, Y) {
    const [len] = X.shape;
    const preds = this.predictMany(X, false);
    return (-1 / len) * crossEntropy(preds, Y);
  }

  predictMany(X, outputLabels = true) {
    let result = X.dot(this.params).applyFunc(sigmoid);
    if (outputLabels) {
      result = result.applyFunc((pred) => (pred > 0.5 ? 1 : 0));
    }
    return result;
  }

  train(X, Y) {
    const { learningRate, epochs } = this.hyperParams;
    for (let i = 0; i < epochs; i++) {
      const yHat = this.predictMany(X, false);
      const delta = X.transpose().dot(yHat.subtract(Y));
      this.params = this.params.subtract(delta.scalarMultiply(learningRate));
    }
  }
}

export default LogisticRegression;
