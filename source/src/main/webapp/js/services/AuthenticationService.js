/**
 * Created by windluffy on 26/02/2016.
 */
app.service('AuthenticationService', ['$http', 'CookieUtilService', function ($http, CookieUtilService) {
    this.login = function (loginRequest, success, fail) {
        $http({
            url: baseURL + '/user/login',
            method: 'POST',
            data: loginRequest,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            var result = response.data;
            CookieUtilService.set('token', result.token);
            CookieUtilService.set('userId', result.userId);
            CookieUtilService.set('username', result.username);
            success();
        }, function () {
            fail();
        });
    };

    this.signUp = function (createUserRequest, success, fail) {
        $http({
            url: baseURL + '/user',
            method: 'POST',
            data: createUserRequest,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            var result = response.data;
            CookieUtilService.set('token', result.token);
            CookieUtilService.set('userId', result.userId);
            CookieUtilService.set('username', result.username);
            success();
        }, function(jqXHR) {
            fail(jqXHR);
        });
    }
}]);