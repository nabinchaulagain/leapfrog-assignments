const Router = require('express').Router;
const { signup, login } = require('../controllers/auth.controller');
const {
  validateUser,
  validateDuplicateUsername
} = require('../validators/user.validator');

const router = Router();

router.post('/signup', validateUser, validateDuplicateUsername, signup);
router.post('/login', login);

module.exports = router;
