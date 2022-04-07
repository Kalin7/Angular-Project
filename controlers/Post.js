const { createPost, getPostsByArticleId } = require('../managers/Post');
const { errorHandler } = require('../utils/helpers')

module.exports = {
    create: async (req, res) => {
        
        try {
            const post = await createPost(req.body);
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
}