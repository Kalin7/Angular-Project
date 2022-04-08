const { Article } = require('../database/models/Article');

async function createArticle(data) {
    const newArticle = await Article.create({
        title: data.title,
        content: data.content,
        imgUrl: data.imgUrl,
        author: data.author
    });

    return newArticle;
};

async function getLimitedArticle() {
    return await Article.find({status: true}).populate({path: 'posts', match: {status: true}});
};

async function getAllArticles() {
    await Article.find({status: true}).populate({path: 'posts', match: {status: true}});
    return await Article.find({status: true}).populate({path: 'posts', match: {status: true}});
};

async function getArticleById(id) {
    return await Article.findById(id).where({status: true});
}
async function getArticlePosts(id) {
    return await Article.findById(id, {status: true}).populate({path: 'posts', match: {status: true}});
};

async function addPost(id, postId) {
    await Article.findByIdAndUpdate(id, {$push: {posts: postId}});
};

async function deleteArticle(id) {
    await Article.findByIdAndUpdate(id, {$set: {status: false}})
};

module.exports = {
    createArticle,
    getLimitedArticle,
    getAllArticles,
    getArticlePosts,
    getArticleById,
    addPost,
    deleteArticle
};