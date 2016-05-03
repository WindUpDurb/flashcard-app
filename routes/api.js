"use strict";

var express = require("express");
var router = express.Router();

router.use("/flashcards", require("./flashcards"));

module.exports = router;