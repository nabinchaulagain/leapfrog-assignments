const { Router } = require('express');
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUser,
} = require('../controllers/user.controller');
const requireEntityExistence = require('../middlewares/requireEntityExistence');

const router = Router();

router.get('/', getUsers);

router.post('/', addUser);

router.patch('/:id', requireEntityExistence('user'), updateUser);

router.delete('/:id', requireEntityExistence('user'), deleteUser);

router.get('/:id', requireEntityExistence('user'), getUser);

module.exports = router;
