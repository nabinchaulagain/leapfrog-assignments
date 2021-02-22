const {
  createTodo,
  updateTodo,
  deleteTodo,
  readTodo,
  readTodos
} = require('../services/todos.service');
const sendResponse = require('../utils/sendResponse');

const addTodo = async (req, res, next) => {
  try {
    const todo = await createTodo({ ...req.body }, req.user.id);
    sendResponse(res, todo);
  } catch (err) {
    next(err);
  }
};

const editTodo = async (req, res, next) => {
  try {
    const todoEdited = await updateTodo({ ...req.body }, +req.params.id);
    sendResponse(res, todoEdited);
  } catch (err) {
    next(err);
  }
};

const removeTodo = async (req, res, next) => {
  try {
    await deleteTodo(+req.params.id);
    sendResponse(res, { msg: 'Deletion successful' });
  } catch (err) {
    next(err);
  }
};

const getTodo = async (req, res, next) => {
  try {
    const todo = await readTodo(+req.params.id);
    sendResponse(res, todo);
  } catch (err) {
    next(err);
  }
};

const getTodos = async (req, res, next) => {
  try {
    const todos = await readTodos(req.user.id);
    sendResponse(res, todos);
  } catch (err) {
    next(err);
  }
};

module.exports = { addTodo, editTodo, getTodo, getTodos, removeTodo };
