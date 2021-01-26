function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
class MinMaxScaler {
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
  constructor() {
    this.m1 = Math.random();
    this.m2 = Math.random();
    this.b = 0;
  }

  static hyperParamDefinition() {
    return {
      learningRate: {
        type: HYPER_PARAM_TYPES.NUMBER,
        default: 0.1,
        range: { min: 0.001, max: 5 },
      },
      epochs: {
        type: HYPER_PARAM_TYPES.NUMBER,
        default: 1000,
        range: { min: 1, max: 10000 },
      },
    };
  }

  predict(x) {
    return sigmoid(this.m1 * x[0] + this.m2 * x[1] + this.b);
  }

  calcCost(X, Y) {
    return (-1 / X.length) * crossEntropy(this.predictMany(X), Y);
  }

  predictMany(X, outputLabels = false) {
    const results = [];
    for (let i = 0; i < X.length; i++) {
      const prediction = this.predict(X[i]);
      results.push(outputLabels ? (prediction > 0.5 ? 1 : 0) : prediction);
    }
    return results;
  }

  train(X, Y) {
    const { learningRate, epochs } = this.hyperParams;
    for (let i = 0; i < epochs; i++) {
      let dM1 = 0;
      let dM2 = 0;
      let dB = 0;
      for (let j = 0; j < X.length; j++) {
        const prediction = this.predict(X[j]);
        dM1 += (prediction - Y[j]) * X[j][0];
        dM2 += (prediction - Y[j]) * X[j][1];
        dB += prediction - Y[j];
      }
      // console.log(`epoch ${i}: ${this.calcCost(X, Y)}`);
      this.m1 -= learningRate * dM1;
      this.m2 -= learningRate * dM2;
      this.b -= learningRate * dB;
    }
  }
}
