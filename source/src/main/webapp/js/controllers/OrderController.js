/**
 * Created by tinblanc on 1/12/16.
 */

app.controller('OrderController', ['$scope', '$rootScope', 'ProductCrawlerService', '$uibModal', function ($scope, $rootScope, ProductCrawlerService, $uibModal) {
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
        obj.package = "";
        obj.quantity = "";
        obj.price = "";
        obj.notes = "";

        return obj;
    };

    $scope.createOrder = function (isvalid, order) {
        if (!isvalid) return;
        console.log(order);
    };

    $scope.createOrders = function () {
        console.log($scope.orders);
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
                obj.sizes = result.sizes;
                obj.packages = result.packages;
                obj.quantity = 1;
                obj.price = 1;

                if ($scope.orders.length == 0) {
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

    $scope.isShowCreateOrdersButton = function () {
        return $scope.orders.length != 0;
    };

    $scope.isShowColorSelection = function (colors) {
        return colors.type == 'text';
    };

    $scope.openColorImageSelection = function (colorImages) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'colorImageSelection.html',
            controller: 'ColorImageSelectionController',
            size: 'sm',
            resolve: {
                items: function () {
                    return colorImages;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
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

    $scope.getShopName = function (order) {
        return order[0].shopName;
    };

    $scope.init = function () {

    };

    $scope.init();
    $scope.checkNumber = function (soluong) {
        if (soluong > 0) {
            return true;
        }
    };
    $scope.checkSize = function (product, size) {
        if (product.sizes.length == 0)
            return false;
        else if (size == "") {
            return true;
        }
    };
    $scope.checkPackage = function (product, package) {
        if (product.packages.length == 0) {
            return false;
        } else if (package == "") {
            return true;
        }
    };
    $scope.checkColor = function (product, color) {
        if (product.colors.length == 0) {
            return false;
        } else if (color == "") {
            return true;
        }
    };



}]);