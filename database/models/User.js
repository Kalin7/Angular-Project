
const mongoose = require('mongoose');
const { isEmail } = require('validator')
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');


const namePattern = /^[a-zA-Z]+$/;
const passwordPattern = /^(\w+){6}$/;

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        minlength: [2, 'First name must be at least 2 characters'],
        validate: {
            validator: (value) => {
                return namePattern.test(value)
            },
            message: 'First name must contains only English letters'
        }
    },

    lastName: {
        type: String,
        trim: true,
        require: true,
        minlength: [2, 'Last name must be at least 2 characters'],
        validate: {
            validator: (value) => {
                return namePattern.test(value)
            },
            message: 'Last name must contains only English letters'
        }
    },

    email: { 
        type: String,
        require: true,
        trim: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email address'],
    },

    password: {
        type: String,
        require: true,
        trim: true,
        minlength: [6, 'Password must be at least 6 characters']
    },

    imgUrl: {
        type: String,
        default: '',
    },
    
    phone: { 
        type: String,
        default: '',
    },

    about: { 
        type: String,
        default: '',
    },

    songs : {
        type: [mongoose.Schema.Types.ObjectId], ref: 'Song', default: []
    },

    articles: {
        type: [mongoose.Schema.Types.ObjectId], ref: 'Article', default: []
    },

    posts: {
        type: [mongoose.Schema.Types.ObjectId], ref: 'Post', default: []
    },

    status: {
        type: Boolean,
        default: true
    }

});


schema.plugin(uniqueValidator)

schema.pre('save', async function () {
    let {password} = this
    this.password = await bcrypt.hash(password, 10); 
}) 

const User = mongoose.model('User', schema);



module.exports = { User }
