require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const async = require('async');

const MongoClient = require('mongodb').MongoClient;
const url = process.env.mongo_host;

const database_name = process.env.database_name;
const transport_data_collection = process.env.transport_data_collection;

const indexRouter = require('./routes/index').router;
const transportRouterFunc = require('./routes/transport');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));


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
        app.db.config = await app.db.collection("config");

        // try {
        //     await app.db[transport_data_collection].createIndex({ id: 1 });
        //     console.log('Successfully created index on id field.');

        // }
        // catch (error) {
        //     console.error(`Failed to create index: ${error}`);
        //     return 0;
        // }

        return 1;
    },

    route_manager: ['mongo_connect', async function(results) {
        if (results.mongo_connect == 0)
            return 0;

        app.use('/', indexRouter);
        app.use('/transports', transportRouterFunc(app, transport_data_collection));

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