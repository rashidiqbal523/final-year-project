const express = require('express');
const post_router = express.Router();
const postController = require('../controllers/postController');
const { isLoggedIn, isAdmin, upload } = require('../middleware');
const Post = require('../models/post');


post_router.get('/admin/posts', isLoggedIn, isAdmin, postController.homepage);
post_router.get('/admin/posts/add', isLoggedIn, isAdmin, postController.addPost);
post_router.post('/admin/posts/add', isLoggedIn, isAdmin, upload.single('picture'), postController.postPost);
post_router.get('/admin/posts/menu/:id', isLoggedIn, isAdmin, async(req, res) => {
    const post = await Post.findOne({ _id: req.params.id })
    res.render("menu", {post, locals: {title: "Travel Gateway -- Orders"}})
});
post_router.post('/admin/posts/menu/:id', isLoggedIn, isAdmin, postController.addMenu);
post_router.get('/admin/posts/view/:id', isLoggedIn, isAdmin, postController.view);
post_router.get('/admin/posts/edit/:id', isLoggedIn, isAdmin, postController.edit);
post_router.put('/admin/posts/edit/:id', isLoggedIn, isAdmin, upload.single('picture'),  postController.editPost);
post_router.delete('/admin/posts/edit/:id', isLoggedIn, isAdmin, postController.deletePost);





module.exports = post_router;