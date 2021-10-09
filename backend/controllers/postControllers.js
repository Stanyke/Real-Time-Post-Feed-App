const postService = require('../services/postServices');

module.exports = function postController() {
    const postServiceInstance = new postService();

    //Get ping me
    this.pingMe = async (req, res) => {
        const data = await postServiceInstance.pingMe();
        return res.status(data.statusCode).json(data.data);
    }

    //Make a post
    this.createPosts = async (req, res) => {
        const data = await postServiceInstance.createPosts(req.body);
        return res.status(data.statusCode).json(data.data);
    }

    //Get all available posts
    this.getPosts = async (req, res) => {
        const data = await postServiceInstance.getPosts(req.query);
        return res.status(data.statusCode).json(data.data);
    }

    //Get one post with all of its comments
    this.getOnePostByIdWithComment = async (req, res) => {
        const data = await postServiceInstance.getOnePostByIdWithComment(req.params.postId,);
        return res.status(data.statusCode).json(data.data);
    }

    //Add a comment to a post
    this.createPostComments = async (req, res) => {
        const options = {...req.body}
        const data = await postServiceInstance.createPostComments(req.params.postId, options);
        return res.status(data.statusCode).json(data.data);
    }

    this.editPostComments = async (req, res) => {
        const data = await postServiceInstance.editPostComments(req.params, req.body);
        return res.status(data.statusCode).json(data.data);
    }

    //Delete post comment by id
    this.deletePostComments = async (req, res) => {
        const data = await postServiceInstance.deletePostComments(req.params);
        return res.status(data.statusCode).json(data.data);
    }
}