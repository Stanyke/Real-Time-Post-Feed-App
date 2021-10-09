const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    postId: { type: String },
    parentId: { type: String, default: null },
    message: { type: String },
    username: { type: String },
}, { timestamps: true});

const Comment = module.exports = mongoose.model('Comment', CommentSchema);