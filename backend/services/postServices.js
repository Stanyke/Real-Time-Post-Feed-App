const { appResponse } = require("../utils/appResponse");
const Post = require("../models/post");
const Comment = require("../models/comment");

class postService {
  pingMe = async () => {
    return { data: { success: true, message: "Pinged" }, statusCode: 200 };
  };

  getPostById = async (id) => {
    return await Post.findById(id);
  };

  createPosts = async (options) => {
    try {
      const { subject, description, username } = options;

      if (!subject || !description || !username) {
        return appResponse(400, "One or more fields are missing");
      }

      const data = { subject, description, username };

      const dataToDb = await Post.create(data);

      return appResponse(201, "Post successfully created", dataToDb._doc);
    } catch (err) {
      return appResponse(500);
    }
  };

  getPosts = async () => {
    try {
      const allPosts = await Post.find();

      return appResponse(200, "All posts", allPosts);
    } catch (err) {
      return appResponse(500);
    }
  };

  getOnePostByIdWithComment = async (postId) => {
      try{
        if (!postId) {
          return appResponse(400, "Post's id is missing");
        }
  
        const postExists = await Post.findOne({ _id: postId }).lean();
  
        if (!postExists) {
          return appResponse(400, "Post with such id was not found");
        }

        let comments = await Comment.find({
          postId: postExists._id,
          parentId: null,
        }).lean();

        if (comments.length) {
          for (let c = 0; c < comments.length; c++) {
            let currentComment = comments[c];
            comments[c]["comments"] = await this.getCommentOfComments(
              currentComment._id
            );
          }
        }
        postExists["comments"] = comments;
  
        return appResponse(200, "Post gotten successfully", postExists);
      } catch (err) {
        return appResponse(500, "Error, possibly because post id is invalid");
      }
  }

  getCommentOfComments = async (commentId) => {
    const comments = await Comment.find({ parentId: commentId }).lean();

    if(comments.length){
        for (let i = 0; i < comments.length; i++) {
            const subComments = await Comment.find({ parentId: comments[i]._id }).lean();
            comments[i].comments = subComments;
            
            if(subComments.length){
                for (let d = 0; d < subComments.length; d++) {
                    const otherComments = await this.getCommentOfComments(subComments[d]._id);
                    subComments[d]["comments"] = otherComments;
                }
            }
        }
    }
    return comments;
  };

  createPostComments = async (postId, options) => {
    try {
      const { parentId, message, username } = options;

      if (!postId) {
        return appResponse(400, "Post's id is missing");
      }

      const postExists = await Post.findOne({ _id: postId });

      if (!postExists) {
        return appResponse(400, "Post with such id was not found");
      }

      const data = { postId, message, parentId, username };

      const dataToDb = await Comment.create(data);

      return appResponse(201, "Comment successfully created", dataToDb._doc);
    } catch (err) {
      return appResponse(500, "Error, possibly because post id is invalid");
    }
  };

  editPostComments = async ({postId, commentId}, {message}) => {
    try{
      if(!postId || !commentId || !message){
        return appResponse(400, "Either post id or comment id or message is missing");
      }

      const postExists = await Post.findOne({ _id: postId });

      if (!postExists) {
        return appResponse(400, "Post with such id was not found");
      }

      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId },
        { $set: { message } },
        { new: true, select: "-__v" }
      );

      if (!updatedComment) {
        return appResponse(400, "Comment with such id was not found");
      }

      return appResponse(200, "Comment successfully deleted", updatedComment);
    } catch (err) {
      return appResponse(500, "Error, possibly because post id or comment id is invalid");
    }
  }

  deletePostComments = async ({postId, commentId}) => {
    try{
      if(!postId || !commentId){
        return appResponse(400, "Either post id or comment id is missing");
      }

      const postExists = await Post.findOne({ _id: postId });

      if (!postExists) {
        return appResponse(400, "Post with such id was not found");
      }

      const commentExist = await Comment.findOneAndDelete({ _id: commentId });

      if (!commentExist) {
        return appResponse(400, "Comment with such id was not found");
      }

      await Comment.deleteMany({ parentId: commentId });

      return appResponse(200, "Comment successfully deleted");
    } catch (err) {
      return appResponse(500, "Error, possibly because post id or comment id is invalid");
    }
  }
}

module.exports = postService;
