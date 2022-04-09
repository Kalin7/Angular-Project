<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const cors = require('cors');
const dbConnection = require('./database/connection');

const router = require('./controlers/Router');



startApp();
async function startApp() {

    await dbConnection();

    const app = express();
    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));
    
    app.set('view engine', 'hbs');
    app.set('/views', 'views');
   
    app.use(cors({
        allowOrigin: ['*'],
        'Access-Control-Allow-Headers': ['Authorization', 'X-Authorization', 'Content-Type']
    }));
    
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(router);
    
    app.listen(3000, () => {
        console.log('Server listen on port 3000');
    })
=======
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const cors = require('cors');
const dbConnection = require('./database/connection');

const router = require('./controlers/Router');



startApp();
async function startApp() {

    await dbConnection();

    const app = express();
    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));
    
    app.set('view engine', 'hbs');
    app.set('/views', 'views');
   
    app.use(cors({
        allowOrigin: ['*'],
        'Access-Control-Allow-Headers': ['Authorization', 'X-Authorization', 'Content-Type']
    }));
    
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(router);
    
    app.listen(3000, () => {
        console.log('Server listen on port 3000');
    })
>>>>>>> d8de2de05d31f1b3fbbfdbe7dab0f736519a23e6
}