require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const async = require('async');
const session = require("express-session");

const MongoClient = require('mongodb').MongoClient;
const url = process.env.mongo_host;

const database_name = process.env.database_name;
const transport_data_collection = process.env.transport_data_collection;
const users_data_collection = process.env.users_data_collection;

const indexRouter = require('./routes/index');
const transportRouterFunc = require('./routes/transport');
const loginRouterFunc = require('./routes/login');
const registerRouterFunc = require('./routes/register');
const logoutRouterFunc = require('./routes/logout');
const giftsRouter = require('./routes/gifts');
const meetingsRouter = require('./routes/meetings');
const moviesRouter = require('./routes/movies');
const photoRouter = require('./routes/photo');
const polaroidRouter = require('./routes/polaroid');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

let mySession = { loggedIn: false };

async.auto({
    mongo_connect: async function() {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await client.connect();
            console.log('Successfully connected to database!');
        } catch (error) {
            console.error('Error occured while connecting to database: ', error);
            return 0;
        }

        app.db = await client.db(database_name);
        app.client = await client;
        app.db[transport_data_collection] = await app.db.collection(transport_data_collection);
        app.db[users_data_collection] = await app.db.collection(users_data_collection);
        app.db.config = await app.db.collection("config");

        return 1;
    },

    route_manager: ['mongo_connect', async function(results) {
        if (results.mongo_connect == 0)
            return 0;

        app.use('/index', checkAuthentificated, indexRouter);
        app.use('/transports', checkAuthentificated, transportRouterFunc(app, transport_data_collection));
        app.use('/login', checkNotAuthentificated, loginRouterFunc(app, users_data_collection, mySession));
        app.use('/register', checkNotAuthentificated, registerRouterFunc(app, users_data_collection));
        app.use('/meetings', checkAuthentificated, meetingsRouter);
        app.use('/movies', checkAuthentificated, moviesRouter);
        app.use('/gifts', checkAuthentificated, giftsRouter);
        app.use('/photo', checkAuthentificated, photoRouter);
        app.use('/polaroid', checkAuthentificated, polaroidRouter);
        app.use('/logout', checkAuthentificated, logoutRouterFunc(mySession));

        app.use((req, res) => {
            res.status(404);
            res.render('404/404.ejs', { style: '404.css', scriptJs: '' });
        })

        return 1;
    }],

    start: ['route_manager', async function(results) {
        if (results.route_manager == 0)
            return 0;

        app.listen(process.env.PORT);

        return 1;
    }]

    // mongo_close: ['start', async function(results) {
    //     if (results.mongo_connect != 0) {
    //         if (app.client != undefined) {
    //             await app.client.close();
    //         }
    //         console.log('Successfully closed the database!');
    //     }
    //     return 1;
    // }],

}, function(err, results) {
    console.log('err = ', err);
    console.log('Finished everything!');
});

function checkAuthentificated(req, res, next) {
    if (mySession.loggedIn) {
        return next();
    } else
        res.redirect('/login');
}

function checkNotAuthentificated(req, res, next) {
    if (mySession.loggedIn) {
        return res.render("inSession");
    } else
        next();
}