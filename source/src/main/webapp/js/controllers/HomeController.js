/**
 * Created by windluffy on 10/01/2016.
 */
app.controller('HomeController', ['$scope', '$swipe', function ($scope, $swipe) {
    $scope.$on('$viewContentLoaded', function (ele) {

    });
    $scope.showMenu = false;

    $scope.toggleMenu = function () {
        $scope.showMenu = $scope.showMenu ? false : true;
    };
}]);