"use strict";

var mongoose = require("mongoose");

var Flashcard = mongoose.model("Flashcard", {
    question : String,
    answer : String,
    category : String,
    subcategories : Array
});

module.exports = Flashcard;