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
    console.log(id);
    return await Post.find({article: id}).populate('author');
} 

module.exports = {
    createPost,
    getPostsByArticleId
}