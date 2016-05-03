"use strict";

var express = require("express");
var router = express.Router();

var Flashcard = require("../models/flashcards");


router.route("/")
    .get(function (request, response) {
        Flashcard.find({}, function (error, flashcards) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send(flashcards);
            }
        });
    })
    .post(function (request, response) {
       var newFlashcard = new Flashcard(request.body);

       newFlashcard.save(function (error, savedFlashcard) {
           if (error) {
               response.status(400).send(error);
           } else {
               response.send(savedFlashcard);
           }
       });
    });

router.route("/:category")
    .get(function (request, response) {
        Flashcard.find({category : request.params.category}, function (error, flashcards) {
            if (error) {
                response.status(400).send(error);
            }
            response.send(flashcards);
        })
    })


module.exports = router;