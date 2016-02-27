/**
 * Created by windluffy on 26/02/2016.
 * Provide methods to manage cookie
 */
app.service("CookieUtilService", [function () {
    this.get = function (name) {
        var pairs = document.cookie.split(";");
        var cookie = {};
        for (var i in pairs) {
            var parts = pairs[i].split("=");
            cookie[parts[0].trim()] = parts[1].trim();
        }
        return cookie[name];
    };

    this.set = function (name, value) {
        document.cookie = name + '=' + value;
    };

    this.remove = function (name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
}]);