require('dotenv').config();
const mongoose = require('mongoose');


module.exports =  async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Database connected...')
}
    