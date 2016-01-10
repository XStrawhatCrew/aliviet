var app = angular.module('HomeApp', ['ngRoute', 'ngTouch']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        })
        .otherwise({
            redirectTo: '/'
        })
});