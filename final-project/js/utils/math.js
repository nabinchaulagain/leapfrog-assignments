/**
 * @param {number} x
 * @returns sigmoid activation of x
 */
export function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

/**
 * @param {number} x
 * @returns derivative of sigmoid of x
 */
export function sigmoidPrime(x) {
  return sigmoid(x) * sigmoid(1 - x);
}

/**
 * calculate harmonic mean of two values
 * @param {number} val1
 * @param {number} val2
 * @returns {number} harmonic mean between val1 and val2
 */
export const harmonicMean = (val1, val2) => (2 * val1 * val2) / (val1 + val2);

/**
 * returns manhattan distance between 2 points
 * @param {number[]} point1 - array of co-ordinates
 * @param {number[]} point2 - array of co-ordinates
 * @returns {number} manhattan distance
 */
export const manhattanDistance = (point1, point2) => {
  let dist = 0;
  for (let i = 0; i < point1.length; i++) {
    dist += Math.abs(point2[i] - point1[i]);
  }
  return dist;
};

/**
 * returns euclidean distance between 2 points
 * @param {number[]} point1 - array of co-ordinates
 * @param {number[]} point2 - array of co-ordinates
 * @returns {number} euclidean distance
 */
export const euclideanDistance = (point1, point2) => {
  let dist = 0;
  for (let i = 0; i < point1.length; i++) {
    dist += (point2[i] - point1[i]) ** 2;
  }
  dist = Math.sqrt(dist);
  return dist;
};

/**
 * get most common element in array
 * @param {number[]} arr
 * @returns {number} mode of arr
 */
export const mode = (arr) => {
  const vals = {};
  let mostCommonVal;
  let mostCommonValCount = Number.MIN_VALUE;
  for (const val of arr) {
    if (!vals[val]) {
      vals[val] = 0;
    }
    vals[val]++;
    if (vals[val] > mostCommonValCount) {
      mostCommonValCount = vals[val];
      mostCommonVal = val;
    }
  }
  return mostCommonVal;
};
