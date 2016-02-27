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
            setCredentials(result.userId, result.token, loginRequest.username);
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
            setCredentials(result.userId, result.token, createUserRequest.user.username);
            success();
        }, function (jqXHR) {
            fail(jqXHR);
        });
    };

    this.logout = function () {
        clearCredentials();
    };

    var setCredentials = function (userId, token, username) {
        CookieUtilService.set('token', token);
        CookieUtilService.set('userId', userId);
        CookieUtilService.set('username', username);
    };

    var clearCredentials = function () {
        CookieUtilService.remove('token');
        CookieUtilService.remove('userId');
        CookieUtilService.remove('username');
    }
}]);