/**
 * Created by windluffy on 06/01/2016.
 */
app.controller('AuthController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
    console.log($rootScope.isLoggedIn);
    if ($rootScope.isLoggedIn) {
        $location.path("/");
    }

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

    $scope.doSignIn = function (isValid) {
        if (!isValid) return;

        console.log("OK");
        restBase.user.login(
            $scope.loginRequest.username,
            $scope.loginRequest.password,
            function () {
                $rootScope.isLoggedIn = true;
                $scope.$apply(function () {
                    $location.path("/");
                });
            },
            function (jqXHR, textStatus) {
                toastr.error("Tên đăng nhập hoặc mật khẩu không đúng!", "Lỗi đăng nhập");
            }
        );
    };

    $scope.doSignUp = function () {

    };
}]);
