const buildValidator = require('../utils/buildValidator');

const fieldRules = {
  userId: { type: 'number', minVal: 1 },
  title: { type: 'string', minLen: 3, maxLen: 70 },
  body: { type: 'string', minLen: 5, maxLen: 150 },
};

const postValidator = buildValidator(fieldRules);

module.exports = postValidator;
