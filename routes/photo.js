const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('photo/index.ejs');
})

module.exports = router;