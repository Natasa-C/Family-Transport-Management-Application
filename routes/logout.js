const express = require("express");
const router = express.Router();

module.exports = function(mySession) {
    router.get('/', (req, res) => {
        res.render('logout/logout');
    })

    router.post('/', (req, res) => {
        req.session.destroy();
        mySession.loggedIn = false;
        res.redirect('/login');
    })
    return router;
}