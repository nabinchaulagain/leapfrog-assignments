/**
 * convert camel case string to word
 * @param {string} str
 * @returns {string} word
 */
export const camelCaseToWord = (str) => {
  let formatted = str.replace(/([A-Z])/g, ' $1'); // add a space before each capital letter
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1); // capitalize first word
  return formatted;
};

/**
 * convert string array to sentence
 * @param {string[]} arr - array of strings
 */
export const strArrayToSentence = (arr) => {
  if (arr.length === 1) {
    return arr[0];
  }
  return [arr.slice(0, arr.length - 1).join(', '), arr[arr.length - 1]].join(
    ' and '
  ); // join all but last element by a comma into an array and join that array with the last element with 'and'
};

/**
 *  generate random number in range
 * @param {number} min - mininum
 * @param {numer} max - maximum
 * @returns {number} random number
 */
export const random = (min, max) => Math.random() * (max - min) + min;

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
  return dist;
};
