const { Router } = require('express');
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

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

router.get('/:id', getPost);

module.exports = router;
