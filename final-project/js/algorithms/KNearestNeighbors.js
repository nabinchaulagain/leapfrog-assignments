import { HYPER_PARAM_TYPES } from '../constants.js';
import Matrix from '../utils/Matrix.js';
import { euclideanDistance, manhattanDistance } from '../utils/misc.js';
import ClassificationAlgorithm from './ClassificationAlgorithm.js';

const distanceMetrics = [euclideanDistance, manhattanDistance];

class KNearestNeigbors extends ClassificationAlgorithm {
  static requiresFeatureScaling = true;

  static hyperParamDefinition = {
    k: {
      type: HYPER_PARAM_TYPES.NUMBER,
      default: 1,
      range: { min: 1, max: 19 },
      // validate that value of k is less than total number of points
      dataValidator: (data, val) => {
        if (val > data.length) {
          return 'should be less than total number of points';
        }
      },
    },
    distanceMetric: {
      type: HYPER_PARAM_TYPES.ENUM,
      options: ['Euclidean distance', 'Manhattan distance'],
    },
  };

  /**
   * returns the prediction of features
   * @param {number[]} x  array of features
   * @returns {number} output label
   */
  predict(x) {
    let distances = [];
    for (let i = 0; i < this.X.shape[0]; i++) {
      distances.push({
        distance: this.distanceFn(this.X.data[i], x),
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
   * fit the parameters through the given data
   * @param {Matrix} X features
   * @param {Matrix} Y labels
   */
  train(X, Y) {
    const { k, distanceMetric } = this.hyperParams;
    this.k = k;
    this.distanceFn = distanceMetrics[distanceMetric];
    this.X = X;
    this.Y = Y;
  }
}

export default KNearestNeigbors;
