/**
 * Created by windluffy on 06/01/2016.
 */
app.controller('AuthController', ['$scope', '$location', '$rootScope', 'AuthenticationService', function ($scope, $location, $rootScope, AuthenticationService) {
    if ($rootScope.isLoggedIn) {
        $location.path("/");
    }

    $scope.loginRequest = {
        "username": "",
        "password": ""
    };

    $scope.createUserRequest = {
        "user": {
            "username": "",
            "email": "",
            "fullName": "",
            "phoneNumber": "",
            "stockCd": ""
        },
        "password": "",
        "confirmPassword": ""


    };

    $scope.doSignIn = function (isValid) {
        if (!isValid) return;
        AuthenticationService.login(
            $scope.loginRequest,
            function () {
                $rootScope.isLoggedIn = true;
                $location.path("/");
            }, function () {
                toastr.error("Tên đăng nhập hoặc mật khẩu không đúng!", "Lỗi đăng nhập");
            }
        );
    };
    $scope.checked = false;

    $scope.doSignUp = function (isValid) {
        if (!isValid || !$scope.checked) return;
        var data = {
            "user": {
                "username": $scope.createUserRequest.user.username,
                "email": $scope.createUserRequest.user.email,
                "fullName": $scope.createUserRequest.user.fullName,
                "phoneNumber": $scope.createUserRequest.user.phoneNumber,
                "stockCd": $scope.createUserRequest.user.stockCd
            },
            "password": $scope.createUserRequest.password
        };
        $rootScope.user = $scope.createUserRequest.user;

        AuthenticationService.signUp(
            data,
            function () {
                $location.path("/signUpSuccess");
            },
            function (jqXHR) {
                console.log(jqXHR);
                var jsonResponseText = $.parseJSON(jqXHR.data);
                toastr.error(jsonResponseText.applicationMessage, "Lỗi hệ thống! Tạo tài khoản thất bại!", {timeOut: 2000});
                $scope.errorMessage = jsonResponseText.applicationMessage;
            }
        );

    };

    /* Watch Area */

    var showErrorIfExist = function (newValue, data, callback) {
        if (newValue != null && newValue.trim() != '') {
            restBase.user.checkUserExisted(
                data,
                function (response) {
                    callback(response.existed);
                }
            );

        }
    };

    //Watch USERNAME Existed or not
    $scope.$watch('createUserRequest.user.username', function (newValue) {
        var data = {
            "checkType": "username",
            "value": $scope.createUserRequest.user.username
        };

        showErrorIfExist(newValue, data, function (existed) {
            console.log(existed);
            $scope.$apply(function () {
                $scope.messageErrorUsername = existed;
            });
        });
    });

    //Watch EMAIL Existed or not
    $scope.$watch('createUserRequest.user.email', function (newValue) {
        var data = {
            "checkType": "email",
            "value": $scope.createUserRequest.user.email
        };

        showErrorIfExist(newValue, data, function (existed) {
            console.log(existed);
            $scope.$apply(function () {
                $scope.messageErrorEmail = existed;
            });
        });
    });


    /* End Watch Area */
}]);

