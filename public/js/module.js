"use strict";

var app = angular.module("flashcardApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("home", {
            url : "/",
            templateUrl : "/html/home.html",
            controller : "homeController"
        })
        .state("flashcardDecks", {
            url : "/flashcardDecks",
            templateUrl : "/html/flashcardDecks.html",
            controller : "deckController"
        })
        .state("flashcardCategor", {
            url : "/flashcardDecks/:category",
            templateUrl : "/html/flashcardCategory.html",
            controller : "categoryController"
        })
        .state("addTo", {
            url : "/addTo",
            templateUrl : "/html/addTo.html",
            controller : "addToController"
        })

    $urlRouterProvider.otherwise("/");
});

