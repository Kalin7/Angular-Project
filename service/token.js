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
};