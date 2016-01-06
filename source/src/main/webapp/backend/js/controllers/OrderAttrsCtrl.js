/**
 * Created by tinblanc on 1/4/16.
 */

app.controller('OrderAttrsCtrl', ['$scope', function ($scope) {
    $scope.orderattributes = [
        {
            title: 'CHƯA MUA',
            value: '',
            status: false
        },
        {
            title: 'ĐÃ ĐẶT CỌC',
            value: '',
            status: false
        },
        {
            title: 'CHỜ DUYỆT',
            value: '',
            status: false
        },
        {
            title: 'ĐANG MUA',
            value: '',
            status: false
        },
        {
            title: 'ĐÃ ĐẶT HÀNG',
            value: '',
            status: false
        },
        {
            title: 'CHỜ THANH TOÁN',
            value: '',
            status: false
        },
        {
            title: 'ĐÃ MUA HÀNG',
            value: '',
            status: false
        },
        {
            title: 'NGƯỜI BÁN GIAO',
            value: '',
            status: false
        },
        {
            title: 'ALIMEX NHẬN',
            value: '',
            status: false
        },
        {
            title: 'ĐÃ KIỂM HÀNG',
            value: '',
            status: false
        },
        {
            title: 'VẬN CHUYỂN',
            value: '',
            status: false
        },
        {
            title: 'CHỜ GIAO HÀNG',
            value: '',
            status: false
        },
        {
            title: 'ĐANG GIAO HÀNG',
            value: '',
            status: false
        },
        {
            title: 'KHÁCH NHẬN HÀNG',
            value: '',
            status: false
        },
        {
            title: 'HỦY BỎ',
            value: '',
            status: false
        }
    ];

    $scope.changeStatus = function (index, event) {
        $scope.orderattributes[index].status = !($scope.orderattributes[index].status);
        var currentStatus = $scope.orderattributes[index].status;
        if(currentStatus) {
            $(event.target).removeClass("button-false-hover")
        }
    };

    $scope.getClassByStatus = function (status) {
        return status ? "button-true" : "button-false";
    };

}]);