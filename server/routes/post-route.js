const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/upload-middleware');

const adminMiddleware = require('../middlewares/admin-middleware');
const {createPost, fetchAllPosts, fetchDetailPost, editPost, deletePost} = require('../controllers/post-controller');

router.post('/create', adminMiddleware, uploadMiddleware.single('image'), createPost)
router.get('/fetch-all', fetchAllPosts)
router.get('/fetch-detail/:id', fetchDetailPost)
router.put('/edit/:id', adminMiddleware, editPost)
router.delete('/delete/:id', adminMiddleware, deletePost)

module.exports = router;