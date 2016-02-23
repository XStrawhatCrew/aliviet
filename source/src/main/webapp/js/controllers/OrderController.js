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

    $scope.createOrder = function (isvalid, order) {
        if (!isvalid) return;
        console.log(order);
    };

    $scope.createOrders = function (orders) {
        if ($scope.orderForm.$valid) {
            console.log(orders);
            $rootScope.orders = orders;

        } else {
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
                obj.colors = result.colors;

                if($scope.orders.length == 0) {
                    $scope.orders.push([]);
                    $scope.orders[0].push(obj);
                } else if ($scope.orders.length == 1 && $scope.orders[0].length == 0) {
                    $scope.orders[0].push(obj);
                } else {
                    var indexOrder = $scope.getIndexOrderSameShop(obj.shopName);
                    console.log("indexOrder:" + indexOrder);
                    if (indexOrder == -1) {
                        var newOrder = [];
                        newOrder.push(obj);
                        $scope.orders.push(newOrder);
                    } else {
                        $scope.orders[indexOrder].push(obj);
                    }
                }
                console.log($scope.orders);

            }
        );

    };

    $scope.isShowColorSelection = function(colors) {
        return colors.type == 'text';
    };

    $scope.getIndexOrderSameShop = function (shopName) {
        for (var i = 0; i < $scope.orders.length; i++) {
            for (var j = 0; j < $scope.orders[i].length; j++) {
                if (shopName == $scope.orders[i][j].shopName) {
                    return i;
                }
            }
        }
        return -1;
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

    $scope.getShopName = function(order) {
        return order[0].shopName;
    };

    $scope.init = function () {

    };

    $scope.init();


}]);