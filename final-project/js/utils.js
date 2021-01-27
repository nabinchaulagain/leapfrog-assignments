/** convert camel case string to word */
export const camelCaseToWord = (str) => {
  let formatted = str.replace(/([A-Z])/g, ' $1');
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  return formatted;
};

/** convert string array to sentence*/
export const strArrayToSentence = (arr) => {
  if (arr.length === 1) {
    return arr[0];
  }
  return [arr.slice(0, arr.length - 1).join(', '), arr[arr.length - 1]].join(
    ' and '
  );
};

/** generate random number in range */
export const random = (min, max) => Math.random() * (max - min) + min;
