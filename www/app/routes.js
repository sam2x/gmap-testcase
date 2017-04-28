"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/main");

    $stateProvider.state("main", {
        url: "/main",
        templateUrl: "app/components/main/main.html",
        title: "Google-Map TestCase",
        controller: "MainController",
        controllerAs: "main"
    });
    $stateProvider.state("map", {
        url: "/map",
        templateUrl: "app/components/map/map.html",
        title: "Map",
        controller: "MapController",
        controllerAs: "map"
    });
}]);
