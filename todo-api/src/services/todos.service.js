const db = require('../db');

const selectedFields = ['id', 'title', 'description', 'is_done'];

const createTodo = async ({ title, description }, user_id) => {
  const newTodos = await db('todos').insert(
    {
      title,
      description,
      user_id
    },
    selectedFields
  );
  return newTodos[0];
};

const readTodo = async (id) => {
  const todos = await db('todos')
    .select([...selectedFields, 'user_id'])
    .where({ id, is_deleted: false });
  return todos[0];
};

const readTodos = async (user_id) => {
  const todos = await db('todos')
    .select(selectedFields)
    .where({ is_deleted: false, user_id });
  return todos;
};

const updateTodo = async ({ title, description, is_done }, id) => {
  const todos = await db('todos')
    .update({ title, description, is_done }, selectedFields)
    .where({ id, is_deleted: false });
  return todos[0];
};

const deleteTodo = async (id) => {
  await db('todos').update({ is_deleted: true }).where({ id });
};

module.exports = { createTodo, readTodo, readTodos, updateTodo, deleteTodo };
