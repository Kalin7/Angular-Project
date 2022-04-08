const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    content: {
        type: String,
        required: true,
        minLength: [5, 'Content must contain at least 5 characters']
    },

    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    article: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Article'
    },

    status: {
        type: Boolean,
        default: true,
    }

})

const Post = mongoose.model('Post', schema);

module.exports = {
    Post
}