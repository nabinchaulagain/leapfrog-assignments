import { HYPER_PARAM_TYPES } from '../constants.js';
import { lookupArray } from '../utils/misc.js';
import { mode } from '../utils/math.js';
import ClassificationAlgorithm from './ClassificationAlgorithm.js';

/**
 * returns true if array contains all values that are the same
 * @param {number[]} Y
 * @returns {boolean} does array contain all same values
 */
const isPure = (Y) => {
  const label = Y[0];
  for (let i = 1; i < Y.length; i++) {
    if (label !== Y[i]) {
      return false;
    }
  }
  return true;
};

/**
 * returns entropy of a data distribution
 * @param {number[]} Y
 * @returns {number} impurity of distribution
 */
const entropy = (Y) => {
  const pos = Y.filter((y) => y === 0).length;
  const neg = Y.filter((y) => y === 1).length;
  const total = pos + neg;
  let probPos = pos / total;
  let probNeg = neg / total;
  return -((probPos > 0 ? probPos * Math.log2(probPos) : 0) + (probNeg > 0 ? probNeg * Math.log2(probNeg) : 0));
};

/** Represents a single node of decision tree */
class DecisionNode {
  /**
   * @param {DecisionNode} left - left node
   * @param {DecisionNode} right - right node
   * @param {number} threshold - threshold value that represents next step
   * @param {number} featIdx - column index
   * @param {number} label - label of node (only has value if this is leaf node)
   */
  constructor(left, right, threshold, featIdx, label) {
    this.left = left;
    this.right = right;
    this.threshold = threshold;
    this.featIdx = featIdx;
    this.label = label;
  }

  /** @returns {boolean} is this node a leaf/pure/non-internal node*/
  isLeaf() {
    return this.label !== null && this.label !== undefined;
  }
}

/** Represents a binary decision tree */
class DecisionTree extends ClassificationAlgorithm {
  static hyperParamDefinition = {
    minSamples: {
      type: HYPER_PARAM_TYPES.RANGE,
      range: {
        min: 0,
        max: 10
      },
      default: 2
    },
    maxDepth: {
      type: HYPER_PARAM_TYPES.RANGE,
      range: {
        min: 1,
        max: 10
      },
      default: 2
    }
  };

  /**
   * predicts class of x
   * @param {number[]} x - feature
   * @param {DecisionNode} curr - node that is being visited currently
   * @returns {number} predicted label
   */
  predict(x, curr) {
    curr = curr || this.root;
    if (curr.isLeaf()) {
      return curr.label;
    }
    if (x[curr.featIdx] <= curr.threshold) {
      return this.predict(x, curr.left);
    }
    return this.predict(x, curr.right);
  }

  /**
   * fit the parameters through the given data
   * @param {Matrix} X features
   * @param {Matrix} Y labels
   */
  train(X, Y) {
    const { minSamples, maxDepth } = this.hyperParams;
    this.minSamples = minSamples;
    this.maxDepth = maxDepth;
    this.root = this.expand(X.data, Y.transpose().data[0]);
  }

  /**
   * expand tree recursively by branching it out to left and right nodes
   * @param {number[][]} X - features
   * @param {number[]} Y - labels
   * @param {number} depth - current depth of tree
   */
  expand(X, Y, depth = 0) {
    const numSamples = X.length;
    if (numSamples <= this.minSamples || isPure(Y) || depth >= this.maxDepth) {
      return new DecisionNode(null, null, null, null, mode(Y)); //expand to leaf node
    }
    const { featureIdx, threshold } = this.getBestSplit(X, Y);
    const column = X.map((x) => x[featureIdx]);

    const { leftIdxs, rightIdxs } = this.splitData(threshold, column);
    const left = this.expand(lookupArray(X, leftIdxs), lookupArray(Y, leftIdxs), depth + 1);
    const right = this.expand(lookupArray(X, rightIdxs), lookupArray(Y, rightIdxs), depth + 1);
    return new DecisionNode(left, right, threshold, featureIdx, null);
  }

  /**
   * returns best column and threshold to split the tree by
   * @param {number[][]} X - features
   * @param {number[]} Y - labels
   * @returns {Object} object containing best feature index and threshold value
   */
  getBestSplit(X, Y) {
    let bestInfGain = Number.MIN_VALUE;
    let threshold; //threshold for best information gain
    let featureIdx; //index of feature
    const featuresLen = X[0].length;
    for (let i = 0; i < featuresLen; i++) {
      const column = X.map((x) => x[i]);
      for (const colVal of column) {
        const infGain = this.calcInfGain(colVal, column, Y);
        if (infGain > bestInfGain) {
          bestInfGain = infGain;
          threshold = colVal;
          featureIdx = i;
        }
      }
    }
    return { featureIdx, threshold };
  }

  /**
   * returns information gain after splitting tree
   * @param {number} threshold - threshold for split
   * @param {number} col - column to split by
   * @param {number[]} Y - labels
   * @returns information gain
   */
  calcInfGain(threshold, col, Y) {
    const entropyParent = entropy(Y);
    const { leftIdxs, rightIdxs } = this.splitData(threshold, col);
    const leftSize = leftIdxs.length;
    const rightSize = rightIdxs.length;
    const totalSize = leftSize + rightSize;
    const entropyLeftChild = entropy(lookupArray(Y, leftIdxs));
    const entropyRightChild = entropy(lookupArray(Y, rightIdxs));
    const entropyAvg = (leftSize / totalSize) * entropyLeftChild + (rightSize / totalSize) * entropyRightChild;
    return entropyParent - entropyAvg;
  }

  /**
   * returns left and right indices of a split
   * @param {number} threshold
   * @param {number[]} col
   * @returns {Object} object containing left indices and right indices
   */
  splitData(threshold, col) {
    const leftIdxs = [];
    const rightIdxs = [];
    for (let i = 0; i < col.length; i++) {
      if (col[i] <= threshold) {
        leftIdxs.push(i);
      } else {
        rightIdxs.push(i);
      }
    }
    return { leftIdxs, rightIdxs };
  }
}

export default DecisionTree;
