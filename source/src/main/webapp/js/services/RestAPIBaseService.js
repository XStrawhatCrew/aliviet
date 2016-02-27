/**
 * Created by windluffy on 26/02/2016.
 */
app.service('RestAPIBaseService', ['$scope', '$http', 'CookieUtilService', function ($scope, $http, cookie) {

    /***
     * Hash @str using SHA256 code
     * @param str
     * @returns {*}
     */
    $scope.hash = function (str) {
        var hash = CryptoJS.SHA256(str);
        return hash.toString();
    };

    $scope.get_iso_date = function () {
        var d = new Date();

        function pad(n) {
            return n < 10 ? '0' + n : n
        }

        return d.getUTCFullYear() + '-'
            + pad(d.getUTCMonth() + 1) + '-'
            + pad(d.getUTCDate()) + 'T'
            + pad(d.getUTCHours()) + ':'
            + pad(d.getUTCMinutes()) + ':'
            + pad(d.getUTCSeconds()) + 'Z'
    };

    $scope.makeRandomString = function () {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    };

    /***
     * Push http method (GET, POST, PUT, ...) with Auth Header to Server
     * Magic do not touch!
     */
    $scope.magic = function (url, method, data) {
        var nonce = $scope.makeRandomString();
        var time = $scope.get_iso_date();
        var token = cookie.get('token');
        var userId = cookie.get('userId');

        var preHashStr = token + ':' + url + ',' + method + ',' + time + ',' + nonce;
        var authorization = userId + ':' + $scope.hash(preHashStr);

        return $http({
            'url': url,
            'method': method,
            'data': data,
            'headers': {
                'Authorization': authorization,
                'x-java-rest-date': time,
                'nonce': nonce,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    };

    $scope.get = function(url, data) {
        return $scope.magic(url, 'GET', data);
    };

    $scope.post = function(url, data) {
        return $scope.magic(url, 'POST', data);
    };

    $scope.put = function(url, data) {
        return $scope.magic(url, 'PUT', data);
    };

    $scope.delete = function(url, data) {
        return $scope.magic(url, 'delete', data);
    };
}]);