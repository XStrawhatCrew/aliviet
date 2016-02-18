/**
 * Created by windluffy on 06/01/2016.
 */
app.controller('AuthController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
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
        },
        "password": "",
        "confirmPassword": ""


    };

    $scope.doSignIn = function (isValid) {
        if (!isValid) return;

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
    $scope.checked = false;
    $scope.doSignUp = function (isValid) {
        if(!isValid || !$scope.checked) return;
        var data = {
            "user": {
                "username": $scope.createUserRequest.user.username,
                "email": $scope.createUserRequest.user.email,
                "fullName": $scope.createUserRequest.user.fullName
            },
            "password": $scope.createUserRequest.password
        };
        $rootScope.user = $scope.createUserRequest.user;






        restBase.user.create(
            data,
            function () {
                toastr.success("Tạo tài khoản thành công");
                $scope.$apply(function () {
                    $location.path("/signUpSuccess");

                });
            },
            function (jqXHR, textStatus) {
                var jsonResponseText = $.parseJSON(jqXHR.responseText);

                toastr.error(jsonResponseText.applicationMessage, "Tạo tài khoản thất bại!");

                $scope.errorMessage = jsonResponseText.applicationMessage;
            });


    };
    $scope.checkUsernameExisted = function () {
        //console.log("OK");
        var data = {
            "checkType": "username",
            "value": $scope.createUserRequest.user.username
        };

        if ($scope.createUserRequest.user.username != null) {
            //console.log(data);
            restBase.user.checkUserExisted(
                data,
                function (jqXHR, textStatus) {
                    $scope.messageErrorUsername = false;
                    if (jqXHR.existed == true) {
                        //console.log(jqXHR.existed);
                        $scope.messageErrorUsername = !$scope.messageErrorUsername;
                    } else {
                        $scope.messageErrorUsername = $scope.messageErrorUsername;
                    }
                },
                function () {
                }
            );

        }
    };
    $scope.errorEmail = "";
    $scope.checkEmailExisted = function () {
        //console.log("OK");
        var data = {
            "checkType": "email",
            "value": $scope.createUserRequest.user.email
        };

        if ($scope.createUserRequest.user.email != null) {
            //console.log(data);
            restBase.user.checkUserExisted(
                data,
                function (jqXHR, textStatus) {
                    //console.log(jqXHR.existed);
                    $scope.messageErrorEmail = false;
                    if (jqXHR.existed == true) {
                        $scope.messageErrorEmail = !$scope.messageErrorEmail;
                    } else {
                        $scope.messageErrorEmail = $scope.messageErrorEmail;
                    }
                },
                function () {
                }
            );

        }
    };
}]);

