const bcrypt = require('bcrypt');
const { User } = require('../database/models/User');
const { Article } = require('../database/models/Article');
const { Song } = require('../database/models/Song');
const { Post } = require('../database/models/Post');

const modelMapper = {
    'article': Article,
    'song': Song,
    'post': Post
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
    },
}

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



async function updateByType(dataType, userId, id) {
    return await updateUserMapper[dataType](userId, id)
}

async function updateInfo(userId, data) {
    
    const user = await User.findOneAndUpdate(
        {_id: userId},
        {$set: {imgUrl: data.imgUrl, phone: data.phone, about: data.about}}
    )
    return user;
}

async function getUserById(id) {
    return await User.findById(id)
                .populate({path: 'songs', match: {status: true}})
                .populate({path: 'articles', match: {status: true}})
                .populate({path: 'posts' , match: {status: true}})
}

async function deleteElementByTypeAndId(elementType, elementId) {
    console.log(elementType, elementId);
    return await modelMapper[elementType].findOneAndUpdate({_id: elementId}, {$set: {status: false}});
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
    updateInfo,
    getUserById,
    deleteElementByTypeAndId
};