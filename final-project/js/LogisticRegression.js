function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
class MinMaxScaler {
  constructor(X) {
    this.min = [Number.MAX_VALUE, Number.MAX_VALUE];
    this.max = [Number.MIN_VALUE, Number.MIN_VALUE];
    for (let i = 0; i < X.length; i++) {
      if (X[i][0] < this.min[0]) {
        this.min[0] = X[i][0];
      }
      if (X[i][0] > this.max[0]) {
        this.max[0] = X[i][0];
      }
      if (X[i][1] < this.min[1]) {
        this.min[1] = X[i][1];
      }
      if (X[i][1] > this.max[1]) {
        this.max[1] = X[i][1];
      }
    }
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
      scaled[i] = [
        (x[0] - this.min[0]) / (this.max[0] - this.min[0]),
        (x[1] - this.min[1]) / (this.max[1] - this.min[1]),
      ];
    }
    return scaled;
  }
}

class LogisticRegression {
  constructor() {
    this.m1 = 5;
    this.m2 = 5;
    this.b = 0;
    this.learningRate = 0.1;
  }

  predict(x) {
    return sigmoid(this.m1 * x[0] + this.m2 * x[1] + this.b);
  }

  calcCost(X, Y) {
    let cost = 0;
    for (let i = 0; i < X.length; i++) {
      const prediction = this.predict(X[i]);
      const label = Y[i];
      cost +=
        label * Math.log(prediction) + (1 - label) * Math.log(1 - prediction);
    }
    return (-1 / X.length) * cost;
  }

  predictMany(X) {
    const results = [];
    for (let i = 0; i < X.length; i++) {
      results.push(this.predict(X[i]));
    }
    return results;
  }

  train(X, Y, epochs = 100) {
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
      console.log(`epoch ${i}: ${this.calcCost(X, Y)}`);
      this.m1 -= this.learningRate * dM1;
      this.m2 -= this.learningRate * dM2;
      this.b -= this.learningRate * dB;
    }
  }
}
