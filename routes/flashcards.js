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
    })


router.route("/:category")
    .get(function (request, response) {
        Flashcard.find({category : request.params.category}, function (error, flashcards) {
            if (error) {
                response.status(400).send(error);
            }
            response.send(flashcards);
        })
    })
    .delete(function (request, response) {
        console.log("params: ", request.params.category);

        Flashcard.findByIdAndRemove(request.params.category, function (error) {
         if (error) {
         response.status(400).send(error);
         }
         response.send("Flashcard has been deleted");
         })

    })

router.get("/toEdit/:flashcard", function (request, response) {
    console.log(request.params);
        Flashcard.findById(request.params.flashcard, function (error, flashcard) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send(flashcard);
            }
        });
});

module.exports = router;