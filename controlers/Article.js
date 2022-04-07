const { errorHandler, checkFormData } = require('../utils/helpers')
const { createArticle, getLimitedArticle, addPost } = require('../managers/Article');

module.exports = {
    create: async (req, res) => {
        const data = {
            title: req.body.title,
            content: req.body.content,
            imgUrl: req.file.location,
            author: req.body.author
        }
        try {
            checkFormData(data);
            const article = await createArticle(data);
            res.status(201).json(article)
        } catch (err) {
            const error = errorHandler(err)
            res.status(400).json(error)
        }
    },

    getArticles: async (req, res) => {
        console.log(req)
        try {
            const articles = await getLimitedArticle();
            res.status(200).json(articles)
        }catch (err) {
            const error = errorHandler(err)
            res.status(400).json(error)
        }
    },

    getPostsByArticleId: async (req, res) => {
       
        try {
            const id = req.params.id;
            
            const posts = await getArticlePosts(id);
           
            res.status(200).json(posts)
        }catch (err) {
            const error = errorHandler(err)
            res.status(400).json(error)
        }
    },

    updateArticle: async (req, res) => {
        
        const artId = req.params.id;
        const id =  req.body.id;
        try {
            const article = await addPost(artId, id)
            res.status(200).json(article)
        }catch (err) {
            const error = errorHandler(err)
            res.status(400).json(error)
        }
    }
}