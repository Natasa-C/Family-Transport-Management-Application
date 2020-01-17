const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('meetings/index');
})

module.exports = router;