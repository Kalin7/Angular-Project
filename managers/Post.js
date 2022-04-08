const { Post } = require('../database/models/Post');

async function createPost(data) {
    const post = await Post.create({
        content: data.content,
        author: data.author,
        article: data.article
    })
    return post;
}


async function getPostsByArticleId(id) {
    return await Post.find({article: id, status: true}).populate({path: 'author', match: {status: true}});
} 
async function getPostById(id) {
    return await Post.findOne({_id: id, status: true});
}
module.exports = {
    createPost,
    getPostsByArticleId,
    getPostById
}