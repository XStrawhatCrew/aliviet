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
    $scope.images = [
        {
            name: 'Slide 1',
            url: 'img/hangcongxuong1.jpg'
        },
        {
            name: 'Slide 2',
            url: 'img/hangcongxuong2.jpg'
        },
        {
            name: 'Slide 3',
            url: 'img/hangcongxuong3.jpg'
        }

    ];
}]);