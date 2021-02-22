const Router = require('express').Router;
const authController = require('../controllers/auth.controller');
const {
  validateUser,
  validateDuplicateUsername
} = require('../validators/user.validator');
const requireAuth = require('../middlewares/requireAuth');

const router = Router();

router.post(
  '/signup',
  validateUser,
  validateDuplicateUsername,
  authController.signup
);

router.post('/login', authController.login);

router.get('/', requireAuth, authController.getCurrentUser);

module.exports = router;
