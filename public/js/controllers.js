"use strict";

var app = angular.module("flashcardApp");

app.controller("homeController", function ($scope, FlashcardServices) {
   console.log("Home Controller");

});

app.controller("deckController", function ($scope, FlashcardServices) {
    console.log("Flashcard Decks Controller");

    FlashcardServices.getTotalFlashcards()
        .then(function (response) {
            console.log(response.data);
            var categories = FlashcardServices.flashcardCategories(response.data);
            $scope.availableFlashcardDecks = categories;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });
});

app.controller("categoryController", function ($scope, FlashcardServices, $stateParams) {
    console.log("Category Controller");

    FlashcardServices.getCategoryDeck($stateParams.category)
        .then(function (response) {
            //begin with creating the flashcard game; data is available 
            console.log("flashcards : ", response.data);
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

});