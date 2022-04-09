<<<<<<< HEAD
require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        id: user._id,
    }

    return jwt.sign(
        payload, 
        process.env.JWT_SECRET_KEY, 
        {expiresIn: '7d'}
    );
}

async function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if (err) {
            return err.message;
        }
        return decoded
    });
}

module.exports = {
    generateToken,
    verifyToken,
=======
require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        id: user._id,
    }

    return jwt.sign(
        payload, 
        process.env.JWT_SECRET_KEY, 
        {expiresIn: 3600 * 24 * 60 * 60}
    );
}

async function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = {
    generateToken,
    verifyToken,
>>>>>>> d8de2de05d31f1b3fbbfdbe7dab0f736519a23e6
};