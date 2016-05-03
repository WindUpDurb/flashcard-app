"use strict";

var express = require("express");
var router = express.Router();
var path = require("path");
var pathToHTML = path.join(__dirname, "../views/index.html");

router.get("/", function (request, response) {
    response.sendfile(pathToHTML);
});

module.exports = router;