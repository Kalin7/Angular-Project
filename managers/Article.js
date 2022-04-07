const { Article } = require('../database/models/Article');

async function createArticle(data) {
    const newArticle = await Article.create({
        title: data.title,
        content: data.content,
        imgUrl: data.imgUrl,
        author: data.author
    })

    return newArticle;
}

async function getLimitedArticle() {
    return await Article.find({}).populate('posts');
}

async function getArticlePosts(id) {
    console.log(id);
    return await Article.find({_id: id}).populate('posts');
}

async function addPost(id, postId) {
    await Article.findByIdAndUpdate(id, {$push: {posts: postId}});
}

module.exports = {
    createArticle,
    getLimitedArticle,
    getArticlePosts,
    addPost
};