/**
 * Created by tinblanc on 12/31/15.
 */

var app = angular.module('BackendApp', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'views/home.html'
    }).when('/management',{
        templateUrl:'views/management.html'
    }).otherwise({
        redirectTo:'/'
    });
});