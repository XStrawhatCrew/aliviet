/**
 * Created by Windows7 on 2/22/2016.
 */
app.controller("DetailOrderController", ["$scope", "$rootScope", "$routeParams", function ($scope, $rootScope, $routeParams) {
    $scope.detailOrder = $rootScope.listOrder[$routeParams.id];
    console.log($scope.detailOrder);

}]);
