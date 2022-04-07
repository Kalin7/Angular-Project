const bcrypt = require('bcrypt');
const { User } = require('../database/models/User');


async function createUser(data) {
    const newUser = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
    });
    await newUser.save();
    return newUser;
   
}

const updateUserMapper = {
    'song': async function (userId, songId) {
        return await User.findOneAndUpdate({_id:userId}, {$push: {songs: songId}});
    },
    'article' : async function (userId, articleId) {
        return await User.findOneAndUpdate({_id:userId}, {$push: {articles: articleId}});
    },
    'post' : async function (userId, postId) {
        return await User.findOneAndUpdate({_id:userId}, {$push: {posts: postId}});
    }
}

async function updateByType(dataType, userId, id) {
    console.log(dataType)
    return await updateUserMapper[dataType](userId, id)
}

async function getUserById(id) {
    return await User.findById(id)
                .populate('songs')
                .populate('articles')
                .populate('posts');
}

async function isExistUser(email, password) {
    const user = await User.find({email: email});
    if (user.length == 0) {
        return false;
    }
    const verified = await bcrypt.compare(password, user[0].password);
    if (!verified) {
        return false;
    }
    return user[0];
}

module.exports = {
    createUser,
    isExistUser,
    updateByType,
    getUserById
};