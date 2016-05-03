"use strict";

var app = angular.module("flashcardApp");

app.service("FlashcardServices", function ($http) {

    this.getTotalFlashcards = function () {
      return $http.get("/api/flashcards");
    };

    this.flashcardCategories = function (flashcardDecks) {
        var categories = [];
        for (var i = 0; i < flashcardDecks.length; i++) {
            if (categories.indexOf(flashcardDecks[i].category) === -1) {
                categories.push(flashcardDecks[i].category);
            }
        }
        return categories;
    };

    this.getCategoryDeck = function (category) {
        return $http.get(`/api/flashcards/${category}`)
    };

    this.pickRandomFlashcard = function (flashcardDeck) {
        return flashcardDeck[Math.floor(Math.random() * flashcardDeck.length)]
    };

    this.addNewFlashcard = function (newFlashcardData) {
      return $http({
          method: "POST",
          url : "/api/flashcards/",
          data : newFlashcardData
      })
    };

});