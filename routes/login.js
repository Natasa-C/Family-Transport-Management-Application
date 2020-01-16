const express = require("express");
const router = express.Router();

module.exports = function(app, collection, mySession) {
    router.get('/', (req, res) => {
        res.render("login/login.ejs", { title: "Log in here" });
    })

    router.post('/', async function(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        if (username && password) {
            let dbUsername = await app.db[collection].findOne({
                'type': 'username',
                'value': username
            })

            if (dbUsername) {
                let dbPassword = await app.db[collection].findOne({
                    'type': 'password',
                    'id': dbUsername.id
                })

                if (dbPassword.value == password) {
                    // valid user authentication
                    mySession.loggedIn = true;
                    req.session.username = username;
                    res.redirect('/index');
                } else {
                    // incorrect password
                    res.render("login/login", { title: "Invalid password" });
                }
            } else {
                // user does not exist
                res.render("login/login", { title: "User does not exist" });
            }
            res.end();
        } else {
            res.send('Please enter username and password');
            res.end();
        }
    })

    return router;
}