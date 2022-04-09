const { checkFormData, errorHandler } = require('../utils/helpers.js')
const { createUser, isExistUser, addArticle, 
        updateByType, getUserById, 
        deleteElementByTypeAndId, updateInfo } = require('../managers/User');
const { createSessionStorage } = require('../managers/userSession');




module.exports = {
    
    loginAction: async (req, res) => {
        try {
            checkFormData(req.body);
            let {email, password} = req.body
            const user = await isExistUser(email, password);
            if (!user) {
                throw new Error('Wrong email or password');
            }
            
            req.session.user = createSessionStorage(user);
            return res.status(200).json(req.session.user);
        }catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error)
        }
    },

    registerAction: async (req, res) => {
        try {
            checkFormData(req.body);
            const user = await createUser(req.body)
            req.session.user = createSessionStorage(user);
            return res.status(200).json(req.session.user);
        } catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error)
        }
    },

    updateUserElements: async (req, res) => {
        
        const userId = req.params.id;
        const {dataType, id} = req.body;

        try {
            const user = await updateByType(dataType, userId, id)
            return res.status(201).json(user)
        } catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error)
        }
    },

    updateUserInfo: async (req, res) => {
        const userId = req.params.id;
        const data = {
            imgUrl: req.file.location,
            phone: req.body.phone,
            about: req.body.about
        }
        
        try {
            const updatedUser = await updateInfo(userId, data)
            console.log(updatedUser)
            res.status(200).json(updatedUser)
        }catch (err) {
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

    deleteElement: async (req, res) => {
        try {
            const {elementType, elementId, userId} = req.params;
            console.log(elementType, elementId, userId)
            await deleteElementByTypeAndId(elementType, elementId);
            return res.status(200);
        } catch (err) {
            const error = errorHandler(err);
            res.status(400).json(error)
        }
    }
}