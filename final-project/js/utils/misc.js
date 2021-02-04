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
  return [arr.slice(0, arr.length - 1).join(', '), arr[arr.length - 1]].join(' and '); // join all but last element by a comma into an array and join that array with the last element with 'and'
};

/**
 * index array with list of indices
 * @param {number[]} arr - array to index
 * @param {number[]} idxArr - array containing indices to access arr
 * @returns {number} array of indexed values
 */
export const lookupArray = (arr, idxArr) => {
  const res = [];
  for (let i = 0; i < idxArr.length; i++) {
    const index = idxArr[i];
    res.push(arr[index]);
  }
  return res;
};

/**
 * returns a promise that resolves after given time
 * @param {number} time - how many milliseconds to wait for
 * @returns {Promise} a promise that resolves after 'time' milliseconds
 */
export const waitFor = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
