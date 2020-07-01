const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require('body-parser');
const sessions = require('client-sessions');
const bcrypt = require('bcrypt');
var db = require('../database/index');
var postData = require('../database/schemas');

const app = express();

app.use(express.static('public'));

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//post request for signup
app.post('/signup', (req, res) => {
  let hash = bcrypt.hashSync(req.body.password, 14);
  req.body.password = hash;
  let user = new postData.User(req.body);
  postData.saveUser(user);
  res.redirect('/homePage');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});


//get for singin to see if user is signed in
app.get('/homePage', (req, res, next) => {
  req.session.userId = postData.User._id;
  sessionId = req.session.userId;
  if (!(req.session && req.session.userId)) {
    return res.redirect("/login")
  }
  postData.User.findById(req.session.userId, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    res.render("/homePage");
  })
});


const port = process.env.PORT || 5000;

app.post("/", (req, res) => { });

app.get("/", (req, res) => { });

populateData.saveSt();

const placesRouter = require("./routes/places");
const signUpRouter = require("./routes/signUp");
const dressesRouter = require("./routes/dresses");
const foodRouter = require("./routes/food");
const cardRouter = require("./routes/card");
const loginRouter = require("./routes/login");

app.use("/places", placesRouter);
app.use("/dresses", dressesRouter);
app.use("/food", foodRouter);
app.use("/signup", signUpRouter);
app.use("/cardInvitation", cardRouter);
app.use("/login", loginRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

module.exports = app;
module.exports = sessionId