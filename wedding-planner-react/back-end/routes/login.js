const router = require('express').Router();
const appA = require("../server")
const sessions = require('client-sessions');
const bcrypt = require('bcrypt');
let postData = require('../database/schemas');


//client sessions
appA.app.use(
    sessions({
        cookieName: 'session',
        secret: 'weddingplanningapp',
        duration: 30 * 60 * 1000, //30 minutes
        activeDuration: 5 * 6 * 1000,
        httpOnly: true, //dont let js code access cookies
        secure: true, //only set cookies over https
        emphemeral: true //destroy cookies hen the broser closes
    })
);


//taking session id to be global variable
var sessionId;

//post request for signin
router.route('/').post((req, res) => {
    postData.User.findOne({ email: req.body.email }, (err, user) => {
        var counter = 0;
        if (
            err ||
            !user ||
            !bcrypt.compareSync(req.body.password !== user.password) || counter < 2
        ) {
            //here will be the jquery for the alert
            return res.render(counter++, { error: 'incorrect email/password' });
        }
        if (counter === 2) {
            return res.render("signin");
        }
        req.session.userId = user._id;
        sessionId = req.session.userId;
        res.redirect('/homePage');
    });
});

router.route('/').get((req, res) => {
    res.render('login');
});

module.exports = sessionId;
module.exports = router;