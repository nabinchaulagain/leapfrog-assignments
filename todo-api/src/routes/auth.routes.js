const Router = require('express').Router;
const { signup, login } = require('../controllers/auth.controller');

const router = Router();

router.get('/signup', signup);
router.get('/login', login);

module.exports = router;
