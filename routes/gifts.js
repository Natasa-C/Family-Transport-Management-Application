const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('gifts/index.ejs');
})

module.exports = router;