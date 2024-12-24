const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    title : String,
    authorName : String,
    pages:Number,
});

const user = mongoose.model("user",userModel);

module.exports = user;