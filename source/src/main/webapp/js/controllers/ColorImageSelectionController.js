/**
 * Created by windluffy on 23/02/2016.
 */
app.controller('ColorImageSelectionController', ['$scope', '$uibModalInstance', 'items', 'previousSelected', function($scope, $uibModalInstance, items, previousSelected) {

    $scope.items = items;
    $scope.selected = {
        item: previousSelected
    };

    $scope.select = function(item) {
        $scope.selected.item = item;
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);