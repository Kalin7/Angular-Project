<<<<<<< HEAD
const mongoose  = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [2, 'Title must by at least 2 characters']
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: [5, 'Description must be at least 5 characters'],
    },

    songUrl: {
        type: String, 
        required:true,
    },

    
    rating: {
        type: Number,
        default: 0,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    status: {
        type: Boolean,
        default: true
    }

});

const Song = mongoose.model('Song', schema);

module.exports = {
    Song
=======
const mongoose  = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [2, 'Title must by at least 2 characters']
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: [5, 'Description must be at least 5 characters'],
        maxlength: [50, 'Description must be at most 50 characters']
    },

    songUrl: {
        type: String, 
        required:true,
    },

    
    rating: {
        type: Number,
        default: 0,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    status: {
        type: Boolean,
        default: true
    }

});

const Song = mongoose.model('Song', schema);

module.exports = {
    Song
>>>>>>> d8de2de05d31f1b3fbbfdbe7dab0f736519a23e6
}
