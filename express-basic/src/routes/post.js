const { Router } = require('express');
const requireEntityExistence = require('../middlewares/requireEntityExistence');
const {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  getPost,
} = require('../controllers/post.controller');

const router = Router();

router.get('/', getPosts);

router.post('/', addPost);

router.patch('/:id', requireEntityExistence('post'), updatePost);

router.delete('/:id', requireEntityExistence('post'), deletePost);

router.get('/:id', requireEntityExistence('post'), getPost);

module.exports = router;
