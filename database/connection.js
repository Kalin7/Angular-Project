<<<<<<< HEAD
require('dotenv').config();
const mongoose = require('mongoose');


module.exports =  async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Database connected...')
}
=======
require('dotenv').config();
const mongoose = require('mongoose');


module.exports =  async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Database connected...')
}
>>>>>>> d8de2de05d31f1b3fbbfdbe7dab0f736519a23e6
    