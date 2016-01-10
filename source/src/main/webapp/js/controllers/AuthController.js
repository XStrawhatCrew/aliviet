/**
 * Created by windluffy on 06/01/2016.
 */
app.controller('AuthController', ['$scope', function ($scope) {
    $scope.loginRequest = {
        "username": "",
        "password": ""
    };

    $scope.createRequest = {
        "username": "",
        "email": "",
        "password": "",
        "re_password": ""
    };

    $scope.doSignIn = function () {
        console.log("loginClicked");
        restBase.user.login(
            $scope.loginRequest.username,
            $scope.loginRequest.password,
            function () {
                $("#divAuthOrUser").html('<a id="loginlogout-btn"  href="#">' + $scope.loginRequest.username + '</a>');
            },
            function (jqXHR, textStatus) {
                toastr.error("Tên đăng nhập hoặc mật khảu không đúng!", "Lỗi đăng nhập");
            });
    };

    $scope.doSignUp = function () {

    };
}]);