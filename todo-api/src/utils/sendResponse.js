const sendResponse = (res, msg, statusCode = 200) => {
  res.status(statusCode).json(msg);
};

module.exports = sendResponse;
