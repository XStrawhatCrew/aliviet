/**
 * Created by tinblanc on 12/31/15.
 */

var app = angular.module('BackendApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html'
    }).when('/management', {
        controller: 'OrderAttrsCtrl',
        templateUrl: 'views/management.html'
    }).when('/orders/:id', {
        controller: 'DetailOrderController',
        templateUrl: 'views/detailOrder.html'
    }).otherwise({
        redirectTo: '/'
    });
});