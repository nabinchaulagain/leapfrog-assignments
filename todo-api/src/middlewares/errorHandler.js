const sendResponse = require('../utils/sendResponse');

const errorHandler = (err, req, res, next) => {
  sendResponse(res, err.message, err.statusCode);
};

module.exports = errorHandler;
