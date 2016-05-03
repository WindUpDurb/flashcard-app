"use strict";

var app = angular.module("flashcardApp");

app.controller("homeController", function () {
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

    $scope.flipFlashcard = function () {
        if ($scope.flashcardFace === $scope.currentFlashcard.question) {
            $scope.flashcardFace = $scope.currentFlashcard.answer;
        } else {
            $scope.flashcardFace = $scope.currentFlashcard.question;

        }
    };

    $scope.nextFlashcard = function () {
        console.log("Working")
        $scope.currentFlashcard = FlashcardServices.pickRandomFlashcard($scope.deckOfFlashcards);
        $scope.flashcardFace = $scope.currentFlashcard.question;
    };

    FlashcardServices.getCategoryDeck($stateParams.category)
        .then(function (response) {
            $scope.deckOfFlashcards = response.data;
            $scope.currentFlashcard = FlashcardServices.pickRandomFlashcard($scope.deckOfFlashcards);
            $scope.flashcardFace = $scope.currentFlashcard.question;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

});