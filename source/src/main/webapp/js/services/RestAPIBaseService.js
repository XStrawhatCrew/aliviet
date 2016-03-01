/**
 * Created by windluffy on 26/02/2016.
 */
app.service('RestAPIBaseService', ['$http', 'CookieUtilService', function ($http, cookie) {

    /***
     * Hash @str using SHA256 code
     * @param str
     * @returns {*}
     */
    this.hash = function (str) {
        var hash = CryptoJS.SHA256(str);
        return hash.toString();
    };

    this.get_iso_date = function () {
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

    this.makeRandomString = function () {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    };

    /***
     * Push http method (GET, POST, PUT, ...) with Auth Header to Server
     * Magic do not touch!
     */
    this.magic = function (url, method, data) {
        url = baseURL + url;
        var nonce = this.makeRandomString();
        var time = this.get_iso_date();
        var token = cookie.get('token');
        var userId = cookie.get('userId');

        var preHashStr = token + ':' + url + ',' + method + ',' + time + ',' + nonce;
        var authorization = userId + ':' + this.hash(preHashStr);
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

    this.get = function(url, data) {
        return this.magic(url, 'GET', data);
    };

    this.post = function(url, data) {
        return this.magic(url, 'POST', data);
    };

    this.put = function(url, data) {
        return this.magic(url, 'PUT', data);
    };

    this.delete = function(url, data) {
        return this.magic(url, 'delete', data);
    };
}]);