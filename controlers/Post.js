<<<<<<< HEAD
const { createPost, getPostsByArticleId } = require('../managers/Post');
const { errorHandler } = require('../utils/helpers')

module.exports = {
    create: async (req, res) => {
        const data = req.body

        try {
            const post = await createPost(data);
            res.status(201).json(post)
        } catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error);
        }
    },

    getByArticleId: async (req, res) => {
        const id = req.params.articleId;
        
        try {
            const posts = await getPostsByArticleId(id);
            res.status(200).json(posts)
        }catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error);
        }
    }
=======
const { createPost, getPostsByArticleId } = require('../managers/Post');
const { errorHandler } = require('../utils/helpers')

module.exports = {
    create: async (req, res) => {
        const data = req.body

        try {
            const post = await createPost(data);
            res.status(201).json(post)
        } catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error);
        }
    },

    getByArticleId: async (req, res) => {
        const id = req.params.articleId;
        
        try {
            const posts = await getPostsByArticleId(id);
            res.status(200).json(posts)
        }catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error);
        }
    }
>>>>>>> d8de2de05d31f1b3fbbfdbe7dab0f736519a23e6
}