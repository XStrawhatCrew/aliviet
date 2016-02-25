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

    $scope.isLoadingProduct = false;

    $scope.setLoadingProduct = function (status) {
        if (!status) {
            $scope.inputLink = "";
        }
        $scope.isLoadingProduct = status;
    };

    $scope.addProduct = function () {
        $scope.errorLink = "";
        if ($scope.inputLink == '') return;
        $scope.setLoadingProduct(true);

        ProductCrawlerService($scope.inputLink).then(
            function (response) {
                if (response.data.status) {
                    var result = response.data.data;
                    var obj = $scope.makeANewProductObj();
                    obj.linkSource = $scope.inputLink;
                    obj.featureImage = result.feature_image;
                    obj.productName = result.product_name;
                    obj.shopName = result.shop_name;
                    obj.colors = result.colors;
                    obj.sizes = result.sizes;
                    obj.packages = result.packages;
                    obj.quantity = 1;
                    obj.price = 0;

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
                } else {
                    $scope.errorLink = response.data.errMsg;
                }

                $scope.setLoadingProduct(false);
            },
            function () {
                $scope.errorLink = "Lỗi hệ thống! Refresh lại hoặc thử lại sau!"
                $scope.setLoadingProduct(false);
            }
        );

    };

    $scope.errorLink = "";

    $scope.isShowCreateOrdersButton = function () {
        return $scope.orders.length != 0;
    };

    $scope.isShowColorSelection = function (colors) {
        return colors.type == 'text';
    };

    $scope.openColorImageSelection = function (product, colorImages) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/colorImageSelection.html',
            controller: 'ColorImageSelectionController',
            size: 'sm',
            resolve: {
                items: function () {
                    return colorImages;
                },
                previousSelected: function () {
                    return product.color;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            product.color = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
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
    $scope.removeProduct = function (order, indexOrder, indexProduct) {

        if ($scope.orders.length == 1 && order.length == 1) {
            $scope.orders.splice(indexOrder, 1);
        }
        if ($scope.orders.length == 1 && order.length > 1) {
            order.splice(indexProduct, 1);
        }
        if ($scope.orders.length > 1 && order.length == 1) {
            $scope.orders.splice(indexOrder, 1);
        }
        if ($scope.orders.length > 1 && order.length > 1) {
            order.splice(indexProduct, 1);
        }


    };
    $scope.orderIsNull = false;
    $scope.checkOrderIsNull = function () {
        if ($scope.orders.length == 0) {
            return !$scope.orderIsNull;

        } else {
            return $scope.orderIsNull;
        }

    };
    $scope.sendOneOrder = function (order, indexOrder, indexProduct) {
        //console.log(indexProduct);
        for (i = 0; i < order.length; i++) {
            console.log(order[i]);
        }
        $scope.orders.splice(indexOrder, 1);
    };


}]);