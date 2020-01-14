require('dotenv').config();
const express = require('express');
const router = express.Router();
const BoxInfo = require('../models/transport');
const fs = require('fs');
const path = '/home/natasa/Personal/Facultate/TEHNICIWEB/FamilyApp/public/transport_data.json'
module.exports = {};

// All transport boxes Route
router.get('/', function(req, res) {
    res.render('transports/index');
})

// New transport boxes Route
router.get('/new', function(req, res) {
    res.render('transports/new', { boxInfo: new BoxInfo() });
})

// Create Box Route
router.post('/', function(req, res) {
    const boxInfo = {
        departure: req.body.departure,
        arrival: req.body.arrival,
        date: req.body.date,
        time: req.body.time,
        from_location: req.body.from_location,
        to_location: req.body.to_location,
        number_of_sits: req.body.number_of_sits,
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

    res.redirect('transports')

    // const boxInfo = new BoxInfo({
    //     departure: req.body.departure,
    //     arrival: req.body.arrival,
    //     date: req.body.date,
    //     time: req.body.time,
    //     from_location: req.body.from_location,
    //     to_location: req.body.to_location,
    //     number_of_sits: req.body.number_of_sits,
    // })

    // boxInfo.save((error, boxInfo) => {
    //     if (error) {
    //         res.render('transports/page_not_found', {
    //             boxInfo: boxInfo,
    //             errorMessage: 'Error Creating Transport'
    //         })
    //     } else {
    //         res.redirect('transports');
    //         // res.redirect(`transports/${boxInfo.id}`
    //     }
    // })
})



module.exports.router = router;