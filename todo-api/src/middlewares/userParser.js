const { decodeJWT, getUserByUsername } = require('../services/auth.service');
const sendResponse = require('../utils/sendResponse');

const userParser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next();
    return;
  }
  try {
    const decoded = decodeJWT(token);
    if (await getUserByUsername(decoded.username)) {
      req.user = decoded;
      next();
      return;
    }
    throw new Error();
  } catch (err) {
    sendResponse(res, { message: 'Invalid auth token' }, 401);
  }
};

module.exports = userParser;
