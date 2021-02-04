import { HYPER_PARAM_TYPES } from '../constants.js';
import Matrix from '../utils/Matrix.js';
import { randomInt } from '../utils/random.js';
import { mode } from '../utils/math.js';
import ClassificationAlgorithm from './ClassificationAlgorithm.js';
import DecisionTree from './DecisionTree.js';

/**
 * randomly select features and labels from the dataset (data might be repeated)
 * @param {Matrix} X - features
 * @param {Matrix} Y - labels
 * @returns {Object} - object containing bootstrapped features and labels
 */
function bootstrapDataset(X, Y) {
  const bootstrappedX = [];
  const bootstrappedY = [];
  const [dataSize] = X.shape;
  for (let i = 0; i < dataSize; i++) {
    const randomIdx = randomInt(0, dataSize - 1);
    bootstrappedX.push(X.data[randomIdx]);
    bootstrappedY.push(Y.data[randomIdx]);
  }
  return { xNew: new Matrix(bootstrappedX), yNew: new Matrix(bootstrappedY) };
}

/** represents a random forest classifier */
class RandomForest extends ClassificationAlgorithm {
  static hyperParamDefinition = {
    ...DecisionTree.hyperParamDefinition,
    trees: {
      type: HYPER_PARAM_TYPES.RANGE,
      range: { min: 3, max: 51 },
      default: 10
    }
  };

  /**
   * fit the parameters through the given data
   * @param {Matrix} X features
   * @param {Matrix} Y labels
   */
  train(X, Y) {
    const { minSamples, maxDepth, trees } = this.hyperParams;
    this.trees = [];
    for (let i = 0; i < trees; i++) {
      const dt = new DecisionTree();
      dt.hyperParams = { minSamples, maxDepth }; //injecting hyperparams
      const { xNew, yNew } = bootstrapDataset(X, Y);
      dt.train(xNew, yNew);
      this.trees.push(dt);
    }
  }

  /**
   * returns prediction label that is mode of prediction of all trees
   * @param {number[]} x - feature array
   */
  predict(x) {
    const treePreds = this.trees.map((tree) => tree.predict(x));
    return mode(treePreds);
  }
}

export default RandomForest;
