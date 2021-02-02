import { EPSILON, HYPER_PARAM_TYPES } from '../constants.js';
import ClassificationAlgorithm from './ClassificationAlgorithm.js';

class DecisionStump {
  constructor(polarity, votingPower, featIdx, thresh) {
    this.polarity = polarity;
    this.votingPower = votingPower;
    this.featIdx = featIdx;
    this.thresh = thresh;
  }

  predict(x) {
    let prediction = 1;
    if (x[this.featIdx] <= this.thresh) {
      prediction = -1;
    }
    return prediction * this.polarity;
  }
}

/** Represents a adaboost classifier */
class Adaboost extends ClassificationAlgorithm {
  static hyperParamDefinition = {
    stumps: {
      type: HYPER_PARAM_TYPES.RANGE,
      range: { min: 2, max: 40 },
      default: 20,
    },
  };

  prepLabels(Y) {
    return Y.map((y) => (y[0] === 0 ? -1 : 1));
  }
  /**
   * fit the parameters through the given data
   * @param {Matrix} X features
   * @param {Matrix} Y labels
   */
  train(X, Y) {
    const [numSamples, numFeatures] = X.shape;
    const labels = this.prepLabels(Y.data);
    let weights = Array(numSamples).fill(1 / numSamples);
    const { stumps } = this.hyperParams;
    this.stumps = [];
    for (let x = 0; x < stumps; x++) {
      let bestFeatureIdx;
      let bestFeaturePolarity;
      let bestFeatureThresh;
      let minError = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < numFeatures; i++) {
        const features = X.data.map((x) => x[i]);
        for (const feature of features) {
          const predictions = this.predictFromThresh(features, feature);
          let polarity = 1;
          let error = this.calcError(predictions, labels, weights);
          if (error >= 0.5) {
            error = 1 - error;
            polarity = -1;
          }
          if (error < minError) {
            bestFeatureIdx = i;
            bestFeaturePolarity = polarity;
            bestFeatureThresh = feature;
            minError = error;
          }
        }
      }
      let votingPower =
        (1 / 2) * Math.log((1 - minError + EPSILON) / (minError + EPSILON));
      votingPower = isNaN(votingPower) ? 0 : votingPower;
      const stump = new DecisionStump(
        bestFeaturePolarity,
        votingPower,
        bestFeatureIdx,
        bestFeatureThresh
      );
      const predictions = X.data.map((x) => stump.predict(x));
      weights = this.updateWeights(weights, predictions, labels, votingPower);
      this.stumps.push(stump);
    }
  }

  updateWeights(weights, preds, labels, votingPower) {
    const newWeights = [...weights];
    let sumWeights = 0;
    for (let i = 0; i < newWeights.length; i++) {
      const newWt = weights[i] * Math.exp(-votingPower * preds[i] * labels[i]);

      newWeights[i] = newWt;
      sumWeights += newWt;
    }
    for (let i = 0; i < newWeights.length; i++) {
      newWeights[i] = newWeights[i] / sumWeights;
    }
    return newWeights;
  }

  /**
   *
   * @param {nummber[]} features
   * @param {number} threshold
   */
  predictFromThresh(features, threshold) {
    return features.map((feature) => (feature <= threshold ? -1 : 1));
  }

  calcError(predictions, labels, weights) {
    let error = 0;
    for (let i = 0; i < predictions.length; i++) {
      if (predictions[i] !== labels[i]) {
        error += weights[i];
      }
    }
    return error;
  }

  predict(x) {
    let prediction = 0;
    for (const stump of this.stumps) {
      prediction += stump.votingPower * stump.predict(x);
    }
    return prediction < 0 ? 0 : 1;
  }
}

export default Adaboost;
