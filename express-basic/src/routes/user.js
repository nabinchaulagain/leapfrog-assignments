const { Router } = require('express');
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);

router.post('/', addUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/:id', getUser);

module.exports = router;
