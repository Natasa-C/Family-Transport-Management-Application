const express = require("express");
const uuidV1 = require('uuid/v1');
const router = express.Router();

module.exports = function(app, collection) {
    router.get('/', (req, res) => {
        res.render("register/register", { title: "Register in here" });
    })

    router.post('/', async(req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;

        if (username && password && email) {
            if (await app.db[collection].findOne({
                    'type': 'email',
                    'value': email
                })) {
                res.render("register/register", { title: "Email address already exists" });
            } else {
                if (await app.db[collection].findOne({
                        'type': 'username',
                        'value': username
                    })) {
                    res.render("register/register", { title: "Username already in use" });
                } else {
                    let id = uuidV1()

                    await app.db[collection].insertOne({
                        'id': id,
                        'type': 'username',
                        'value': username
                    })

                    await app.db[collection].insertOne({
                        'id': id,
                        'type': 'email',
                        'value': email
                    })

                    await app.db[collection].insertOne({
                        'id': id,
                        'type': 'password',
                        'value': password
                    })

                    res.redirect('/login');
                }
            }
            res.end();
        } else {
            res.send('Please enter username and password');
            res.end();
        }
    })

    return router;
}