<<<<<<< HEAD
require('dotenv').config();
const { verifyToken } = require("../service/token");
const { getTokenFromHeader } = require('../utils/helpers')
const {getArticleById } = require('../managers/Article');
const {getSongById } = require('../managers/Song');
const { getPostById } = require('../managers/Post');

const elementMapper = {
    'article': async function (id) {return await getArticleById(id)},
    'song': async function (id) {return await getSongById(id)},
    'post': async function (id) {return await getPostById(id)}
}

module.exports = {
    hasUser: async (req, res, next) => {
        const token = getTokenFromHeader(req);
        const verified = await verifyToken(token);
        if (!verified) {
            return res.status(401).json({message: 'Invalid token'});
        }
        if (verified == 'jwt expired') {
            return res.status(401).json({message: 'Token already expired'});
        }
        next();        
    },
    
    isAlreadyLoggedIn: (req, res, next) => {
        
        if (req.session.user) {
            return res.status(400).json({message: 'User already logged in'})
        }
        next();
    },

    isAuthor: async (req, res, next) => {
        
        const elementType = req.params.elementType
        const currentUserId = req.params.userId;
        const elementId = req.params.elementId;      
        const element = await elementMapper[elementType](elementId);
        
        if (element.author != currentUserId) {
            if (element.author._id != currentUserId) {
                return res.status(401).json({message: 'Unautorize'});
            }
        }
        next();
    }
=======
require('dotenv').config();
const { verifyToken } = require("../service/token");
const { getTokenFromHeader } = require('../utils/helpers')
const {getArticleById } = require('../managers/Article');
const {getSongById } = require('../managers/Song');
const { getPostById } = require('../managers/Post');

const elementMapper = {
    'article': async function (id) {return await getArticleById(id)},
    'song': async function (id) {return await getSongById(id)},
    'post': async function (id) {return await getPostById(id)}
}

module.exports = {
    hasUser: async (req, res, next) => {
        const token = getTokenFromHeader(req);
        const verified = await verifyToken(token);
        if (!verified) {
            return res.status(401);
        }
        next();        
    },
    
    isAlreadyLoggedIn: (req, res, next) => {
        
        if (req.session.user) {
            return res.status(400).json({message: 'User already logged in'})
        }
        next();
    },

    isAuthor: async (req, res, next) => {
        
        const elementType = req.params.elementType
        const currentUserId = req.params.userId;
        const elementId = req.params.elementId;      
        const element = await elementMapper[elementType](elementId);
        
        if (element.author != currentUserId) {
            if (element.author._id != currentUserId) {
                return res.status(401).json({message: 'Unautorize'});
            }
        }
        next();
    }
>>>>>>> d8de2de05d31f1b3fbbfdbe7dab0f736519a23e6
}