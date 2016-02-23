/**
 * Created by tinblanc on 1/12/16.
 */

app.controller('OrderController', ['$scope', '$rootScope', 'ProductCrawlerService', function ($scope, $rootScope, ProductCrawlerService) {
    $scope.orders = [];
    $scope.isCollapsed = false;
    $scope.inputLink = "";









    $scope.makeANewProductObj = function () {
        var obj = new Object();
        obj.linkSource = "";
        obj.featureImage = "";
        obj.productName = "";
        obj.shopName = "";
        obj.color = "";
        obj.size = "";
        obj.quantity = "";
        obj.price = "";
        obj.notes = "";

        return obj;
    };

    $scope.createOrder = function (isvalid,order) {
        if(!isvalid) return;
        console.log(order);
    };

    $scope.createOrders = function (orders) {
        if($scope.orderForm.$valid){
            console.log(orders);
            $rootScope.orders = orders;

        }else{
            toastr.error("Vui lòng điền đầy đủ những đơn còn trống !");
        }

    };


    $scope.makeANewOrderObj = function () {
        var order = [];
        order.push($scope.makeANewProductObj());
        return order;
    };

    $scope.addProduct = function (isValid, order) {
        //if (!isValid) return;
        //order.push($scope.makeANewProductObj());
        ProductCrawlerService($scope.inputLink).then(
            function (response) {
                var result = response.data;
                var obj = $scope.makeANewProductObj();
                obj.linkSource = $scope.inputLink;
                obj.featureImage = result.feature_image;
                obj.productName = result.product_name;
                obj.shopName = result.shop_name;
            }
        );

    };

    $scope.removeProduct = function (order, indexProduct, indexOrder) {

        if ($scope.orders.length == 1 && $scope.orders[0].length == 1) {
            toastr.error("Bạn cần ít nhất một sản phẩm để đặt hàng", "Không thể xoá");
        } else {
            order.splice(indexProduct, 1);

            if (order.length == 0) {
                $scope.orders.splice(indexOrder, 1);
            }
        }

    };

    $scope.addOrder = function () {
        $scope.orders.push($scope.makeANewOrderObj());
    };


    $scope.init = function () {
        var newOrder = $scope.makeANewOrderObj();
        $scope.orders.push(newOrder);
    };

    $scope.init();


}]);