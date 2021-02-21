const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

const createUser = async ({ username, password }) => {
  const salt = await bcrypt.genSalt(+process.env.HASH_SALT_RDS);
  const passwordEnc = await bcrypt.hash(password, salt);
  const newUsers = await db('users').insert(
    { username, password: passwordEnc },
    ['id', 'username', 'created_at']
  );
  return newUsers[0];
};

const getUserByUsername = async (username) => {
  const users = await db('users')
    .select('username', 'password', 'id', 'created_at')
    .where({ username });
  return users[0];
};

const doesPassMatch = (raw, encrypted) => {
  return bcrypt.compare(raw, encrypted);
};

const createJWT = ({ id, username, created_at }) => {
  return jwt.sign({ id, username, created_at }, process.env.JWT_SECRET);
};

const decodeJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createUser,
  getUserByUsername,
  doesPassMatch,
  createJWT,
  decodeJWT
};
