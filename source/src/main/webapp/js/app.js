var app = angular.module('HomeApp', ['ngAnimate', 'ngRoute', 'ui.bootstrap', 'ngTouch' ])
    .run(function ($rootScope) {
        $rootScope.isLoggedIn = restBase.user.isLoggedIn();
        $rootScope.orders = [];
        $rootScope.user;

        $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {

            window.scrollTo(0, 0);

        });
    });

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        })
        .when('/create-orders-link', {
            controller: 'OrderController',
            templateUrl: 'views/createOrders.html'
        })
        .when('/signIn', {
            controller: 'AuthController',
            templateUrl: 'views/signIn.html'
        })
        .when('/signUp', {
            controller: 'AuthController',
            templateUrl: 'views/signUp.html'
        })
        .when('/success', {
            controller: 'OrderSuccessController',
            templateUrl: 'views/orderSuccess.html'
        })
        .when('/signUpSuccess', {
            controller: 'AuthController',
            templateUrl: 'views/signUpSuccess.html'
        })
        .otherwise({
            redirectTo: '/'
        })
});

//Global Variables
var baseURL = "http://localhost:8080/rest";