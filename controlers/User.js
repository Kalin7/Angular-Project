const { checkFormData, errorHandler } = require('../utils/helpers.js')
const { createUser, isExistUser, addArticle, updateByType, getUserById } = require('../managers/User');
const { createSessionStorage } = require('../managers/userSession');
const { generateToken } = require('../service/token')



module.exports = {
    
    loginAction: async (req, res) => {
        try {
            checkFormData(req.body);
            let {email, password} = req.body
            const user = await isExistUser(email, password);
            if (!user) {
                throw new Error('Wrong email or password');
            }
            
            const token = createSessionStorage(user);
            console.log(token)
            return res.status(200).json(token);
        }catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error)
        }
    },

    registerAction: async (req, res) => {
        try {
            checkFormData(req.body);
            const user = await createUser(req.body)
            const token = createSessionStorage(user);
            console.log(token)
            return res.status(200).json(token);
        } catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error)
        }
    },

    logout: (req, res) => {
        console.log(res.locals.user);
        res.json(res.locals.user);
        // console.log(req.session.user.token)
        // const deleted = req.session.user;
        // delete req.session.user;
        // res.status(200).json(deleted);
    },

    updateUser: async (req, res) => {
        const userId = req.params.id;
        const {type, id} = req.body;

        try {
            const user = await updateByType(type, userId, id)
            return res.status(201).json(user)
        } catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error)
        }
    },

    getUser: async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await getUserById(userId);
            return res.status(200).json(user)
        } catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error)
        }
    },
}