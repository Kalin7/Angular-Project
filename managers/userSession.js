const { generateToken } = require('../service/token')


function createSessionStorage(user) {
    return {
        token: generateToken(user)
    }   
}

module.exports = {
    createSessionStorage,
}