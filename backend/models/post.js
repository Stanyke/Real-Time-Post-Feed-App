const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    subject: { type: String },
    description: { type: String },
    username: { type: String },
}, { timestamps: true});

const Post = module.exports = mongoose.model('Post', PostSchema);