<<<<<<< HEAD
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        minLength: [4, 'Title must contain at least 4 characters']
    },

    imgUrl: { 
        type: String, 
        required: true
    },
    
    content: {
        type: String,
        required: true,
        minLength: [10, 'Content must contain at least 10 characters']
    },

    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    posts: {
        type: [mongoose.Schema.Types.ObjectId], ref: 'Post', default: []
    },
    
    status: {
        type: Boolean,
        default: true
    }
})

const Article = mongoose.model('Article', schema);

module.exports = {
    Article
=======
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        minLength: [4, 'Title must contain at least 4 characters']
    },

    imgUrl: { 
        type: String, 
        required: true
    },
    
    content: {
        type: String,
        required: true,
        minLength: [10, 'Content must contain at least 10 characters']
    },

    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    posts: {
        type: [mongoose.Schema.Types.ObjectId], ref: 'Post', default: []
    },
    
    status: {
        type: Boolean,
        default: true
    }
})

const Article = mongoose.model('Article', schema);

module.exports = {
    Article
>>>>>>> d8de2de05d31f1b3fbbfdbe7dab0f736519a23e6
}