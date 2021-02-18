const buildValidator = require('../utils/buildValidator');

const fieldRules = {
  username: { type: 'string', minLen: 2, maxLen: 20 },
  email: { type: 'string', minLen: 6, maxLen: 80 },
};

const userValidator = buildValidator(fieldRules);

module.exports = userValidator;
