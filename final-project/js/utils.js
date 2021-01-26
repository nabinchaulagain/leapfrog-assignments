/** convert camel case string to word */
const camelCaseToWord = (str) => {
  let formatted = str.replace(/([A-Z])/g, ' $1');
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  return formatted;
};
