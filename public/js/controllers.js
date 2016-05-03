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

app.controller("addToController", function ($scope, FlashcardServices) {
    console.log("Add To Controller");


    $scope.addNewFlashcard = function (data) {
        var configuredData = data;
        configuredData.subcategories = data.subcategories.split(",");
        console.log(configuredData)
        FlashcardServices.addNewFlashcard(data)
            .then(function (response) {
                $scope.newFlashcardData = null;
                alert("Flashcard has been added");
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    };

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

app.controller("manageFlashcardsController", function ($scope, $state, FlashcardServices) {
    console.log("Manage Flashcards Controller");

    $scope.toEdit = function (flashcardToEdit) {
        $state.go("editFlashcard", {flashcard : flashcardToEdit._id})
    };

    $scope.deleteFlashcard = function (flashcardData) {
        
        FlashcardServices.serverDeleteFlashcard(flashcardData)
            .then(function (response) {
                alert("Flashcard has been deleted.")
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    };
    
    FlashcardServices.getTotalFlashcards()
        .then(function (response) {
            $scope.totalFlashcards = response.data;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });
    
});

app.controller("toEditController", function ($scope, $state, $stateParams, FlashcardServices) {
    console.log("To Edit Controller");

    FlashcardServices.getSingleFlashToEdit($stateParams.flashcard)
        .then(function (response) {
            console.log(response.data);
            $scope.flashcardToEdit = response.data;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
    
});