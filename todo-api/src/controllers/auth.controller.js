const {
  createJWT,
  createUser,
  getUserByUsername,
  doesPassMatch
} = require('../services/auth.service');
const sendResponse = require('../utils/sendResponse');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    let errMsg;
    if (!user) {
      errMsg = { username: 'Invalid username' };
    } else if (!(await doesPassMatch(password, user.password))) {
      errMsg = { password: 'Invalid password' };
    }
    if (errMsg) {
      const err = new Error();
      err.statusCode = 401;
      err.message = { error: 'Invalid crendentials', detail: errMsg };
      throw err;
    }
    const token = createJWT(user);
    sendResponse(res, { message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    sendResponse(res, { message: 'Account created', user });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = (req, res, next) => {
  try {
    sendResponse(res, req.user);
  } catch (err) {
    next(err);
  }
};

module.exports = { login, signup, getCurrentUser };
