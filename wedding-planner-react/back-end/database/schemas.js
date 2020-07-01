const mongoose = require("mongoose");
const stuff = require("./stuffData.json");

//creatinf a user schema
let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  guests: Array,
});

//creating wedding stuff schema
let stuffSchema = mongoose.Schema({
  category: String,
  name: String,
  imageUrl: String,
  websiteUrl: String,
  contact: Number,
  location: String,
});

//creating card schema
let cardSchema = mongoose.Schema({
  brideName: String,
  groomName: String,
  placeName: String,
  date: Date,
});

//creating models for the schemas
let User = mongoose.model("User", userSchema, "users");
let Stuff = mongoose.model("Stuff", stuffSchema, "allstuff");
let Card = mongoose.model("Card", cardSchema, "cards");

let save = (users) => { };

let saveSt = () => {
  for (var i = 0; i < stuff.length; i++) {
    var partOfStuff = new Stuff({
      category: stuff[i].category,
      name: stuff[i].name,
      imageUrl: stuff[i].image,
      websiteUrl: stuff[i].website,
      contact: stuff[i].contact,
      location: stuff[i].location,
    });
    partOfStuff.save();
  }
};

module.exports.save = save;
module.exports.saveSt = saveSt;
module.exports.User = User;
module.exports.Stuff = Stuff;
module.exports.Card = Card;
