const { getUserByUsername } = require('../services/auth.service');
const buildValidator = require('../utils/buildValidator');

const fieldRules = {
  username: { type: 'string', minLen: 2, maxLen: 20 },
  password: { type: 'string', minLen: 5, maxLen: 20 }
};

const validateUserBody = buildValidator(fieldRules);

const validateUser = (req, res, next) => {
  try {
    validateUserBody(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

const validateDuplicateUsername = async (req, res, next) => {
  try {
    const user = await getUserByUsername(req.body.username);
    if (user) {
      throw new Error();
    }
    next();
  } catch (err) {
    err.message = {
      error: 'duplicate username',
      detail: {
        username: 'username is already taken'
      }
    };
    err.statusCode = 409;
    next(err);
  }
};

module.exports = { validateUser, validateDuplicateUsername };
