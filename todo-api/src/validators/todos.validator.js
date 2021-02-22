const { readTodo } = require('../services/todos.service');
const buildValidator = require('../utils/buildValidator');

const fieldRules = {
  title: { type: 'string', minLen: 2, maxLen: 128 },
  description: { type: 'string', minLen: 5, maxLen: 400 }
};

const validateTodoBody = buildValidator(fieldRules);

const validateTodo = (req, res, next) => {
  try {
    validateTodoBody(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

const validateTodoId = async (req, res, next) => {
  try {
    const todoId = +req.params.id;
    if (typeof todoId !== 'number') {
      const err = new Error();
      err.message = { error: 'Invalid todo id' };
      err.statusCode = 400;
      throw err;
    }
    const todo = await readTodo(todoId);
    if (!todo) {
      const err = new Error();
      err.message = { error: 'todo not found' };
      err.statusCode = 404;
      throw err;
    }
    if (todo.user_id !== req.user.id) {
      const err = new Error();
      err.message = { error: 'unauthorized' };
      err.statusCode = 403;
      throw err;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateTodo, validateTodoId };
