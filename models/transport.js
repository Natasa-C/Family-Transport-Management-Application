const mongoose = require('mongoose');

const BoxInfoSchema = new mongoose.Schema({
    departure: {

    },
    arrival: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },

    from_location: {
        type: String,
        required: true
    },
    to_location: {
        type: String,
        required: true
    },
    number_of_sits: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('BoxInfo', BoxInfoSchema);