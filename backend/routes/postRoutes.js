const postController = require('../controllers/postControllers');
const router = require('express').Router();

module.exports = function () {
    const postCtrl = new postController();

    router.get('/ping', postCtrl.pingMe);
    router.post('/posts', postCtrl.createPosts);
    router.get('/posts', postCtrl.getPosts);
    router.get('/posts/:postId', postCtrl.getOnePostByIdWithComment);
    router.post('/posts/:postId/comments', postCtrl.createPostComments);
    router.patch('/posts/:postId/comments/:commentId', postCtrl.editPostComments);
    router.delete('/posts/:postId/comments/:commentId', postCtrl.deletePostComments);

    return router;
}