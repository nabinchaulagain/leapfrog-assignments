const model = require('../models/model');
const sendResponse = require('../utils/sendResponse');
const postValidator = require('../validators/postValidator');

const getPosts = async (req, res) => {
  let posts;
  if (req.query.userId) {
    posts = await model.readWhere('post', 'userId', parseInt(req.query.userId));
  } else {
    posts = await model.read('post');
  }
  sendResponse(res, 200, posts);
};

const getPost = async (req, res) => {
  const post = await model.readOne('post', parseInt(req.params.id));
  sendResponse(res, 200, post);
};

const addPost = async (req, res, next) => {
  try {
    postValidator(req.body);
    const newPost = await model.create('post', req.body);
    sendResponse(res, 200, newPost);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    postValidator(req.body);
    const post = { id: parseInt(req.params.id), ...req.body };
    const updatedPost = await model.update('post', post);
    sendResponse(res, 200, updatedPost);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res) => {
  await model.delete('post', parseInt(req.params.id));
  sendResponse(res, 200, { msg: 'Deleted successfully' });
};

module.exports = { getPosts, getPost, addPost, updatePost, deletePost };
