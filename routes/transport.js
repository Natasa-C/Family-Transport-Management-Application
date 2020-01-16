require('dotenv').config();
const express = require('express');
const router = express.Router();
const BoxInfo = require('../models/transport');
const fs = require('fs');
const async = require('async');
const path = '/home/natasa/Personal/Facultate/TEHNICIWEB/FamilyApp/public/transport_data.json';


module.exports = function transportFunc(app, collection) {
    // All transport boxes Route
    router.get('/', async function(req, res) {
        let data;

        let prom = new Promise((resolve, reject) => {
            app.db[collection].find({}).toArray()
                .then(result => {
                    if (result) {
                        data = result;
                    } else {
                        data = -1;
                    }
                    resolve(data);
                })
                .catch(function(error) {
                    console.error(`Failed to find document: ${error}`);
                    reject();
                })
        });
        await prom;

        res.render('transports/index', { info: data });
    })

    // New transport boxes Route
    router.get('/new', function(req, res) {
        res.render('transports/new', { boxInfo: new BoxInfo() });
    })

    // Create Box Route
    router.post('/', async function(req, res) {
        const boxInfo = {
            departure: req.body.departure,
            arrival: req.body.arrival,
            date: req.body.date,
            time: req.body.time,
            from_location: req.body.from_location,
            to_location: req.body.to_location,
            number_of_sits: req.body.number_of_sits,
            comeing: ''
        }

        if (fs.existsSync(path)) {
            var obj = fs.readFileSync(path, function(err, data) {
                if (err) {
                    res.render('transports/page_not_found');
                }
            });
            var vector = JSON.parse(obj);
            vector.push(boxInfo);
            var text = JSON.stringify(vector);
            fs.writeFileSync(path, text);
        }

        let prom = new Promise((resolve, reject) => {
            app.db[collection].insertOne(boxInfo)
                .then(result => {
                    resolve();
                })
                .catch(function(error) {
                    console.error(`Failed to insert item: ${error}`);
                    reject();
                })
        });
        await prom;

        res.render('transports/submitted')
    })

    return router;
}