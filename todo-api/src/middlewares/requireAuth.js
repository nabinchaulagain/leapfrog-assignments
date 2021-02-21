const sendResponse = require('../utils/sendResponse');

const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    sendResponse(res, { error: 'You need to be logged in' }, 401);
  }
};

module.exports = requireAuth;
