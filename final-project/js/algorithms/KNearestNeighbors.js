import { HYPER_PARAM_TYPES } from '../constants.js';
import Matrix from '../utils/Matrix.js';

function distance(point1, point2) {
  let dist = 0;
  for (let i = 0; i < point1.length; i++) {
    dist += (point2[i] - point1[i]) ** 2;
  }
  return dist;
}

class KNearestNeigbors {
  static hyperParamDefinition = {
    numNeighbors: {
      type: HYPER_PARAM_TYPES.NUMBER,
      default: 3,
      range: { min: 1, max: 50 },
    },
    distanceMetric: {
      type: HYPER_PARAM_TYPES.ENUM,
      options: ['Euclidean distance', 'Manhattan distance'],
    },
  };
  static requiresFeatureScaling = true;

  /**
   * returns the prediction of features
   * @param {number[]} x  array of features
   * @returns {number} output label
   */
  predict(x) {
    let distances = [];
    for (let i = 0; i < this.X.shape[0]; i++) {
      distances.push({
        distance: distance(this.X.data[i], x),
        class: this.Y.data[i][0],
      });
    }
    distances.sort((point1, point2) => point1.distance - point2.distance);
    distances = distances.slice(0, this.k);
    let classes = [];
    let maxClass; // most common class
    let maxClassAppearances = 0;
    for (let i = 0; i < distances.length; i++) {
      const cls = distances[i].class;
      if (classes[cls] === undefined) {
        classes[cls] = 1;
      }
      classes[cls]++;
      if (classes[cls] > maxClassAppearances) {
        maxClassAppearances++;
        maxClass = cls;
      }
    }
    return maxClass;
  }

  /**
   * returns predictions of given features
   * @param {Matrix} X - feature matrix
   * @returns {Matrix} predictions
   */
  predictMany(X) {
    let result = X.data.map((feature) => this.predict(feature));
    return new Matrix([result]).transpose();
  }

  /**
   * fit the parameters through the given data
   * @param {Matrix} X features
   * @param {Matrix} Y labels
   */
  train(X, Y) {
    const { numNeighbors, distanceMetric } = this.hyperParams;
    this.k = numNeighbors;
    this.distanceMetric = distanceMetric;
    this.X = X;
    this.Y = Y;
  }
}

export default KNearestNeigbors;
