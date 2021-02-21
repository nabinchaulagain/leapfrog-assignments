const Router = require('express').Router;
const authController = require('../controllers/auth.controller');
const {
  validateUser,
  validateDuplicateUsername
} = require('../validators/user.validator');

const router = Router();

router.post(
  '/signup',
  validateUser,
  validateDuplicateUsername,
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
