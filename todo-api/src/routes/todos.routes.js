const Router = require('express').Router;
const todoController = require('../controllers/todos.controller');
const {
  validateTodo,
  validateTodoId
} = require('../validators/todos.validator');

const router = Router();

router.get('/', todoController.getTodos);

router.post('/', validateTodo, todoController.addTodo);

router.patch('/:id', validateTodo, validateTodoId, todoController.editTodo);

router.delete('/:id', validateTodoId, todoController.removeTodo);

router.get('/:id', validateTodoId, todoController.getTodo);

module.exports = router;
