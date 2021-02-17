const model = require('../models/model');
const sendResponse = require('../utils/sendResponse');

const getUsers = async (req, res) => {
  const users = await model.read('user');
  sendResponse(res, 200, users);
};

const getUser = async (req, res) => {
  const user = await model.readOne('user', parseInt(req.params.id));
  sendResponse(res, 200, user);
};

const addUser = async (req, res) => {
  const newUser = await model.create('user', req.body);
  sendResponse(res, 200, newUser);
};

const updateUser = async (req, res) => {
  const user = { id: parseInt(req.params.id), ...req.body };
  const updatedUser = await model.update('user', user);
  sendResponse(res, 200, updatedUser);
};

const deleteUser = async (req, res) => {
  await model.delete('user', parseInt(req.params.id));
  sendResponse(res, 200, { msg: 'Deleted successfully' });
};

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };
