/**
 * Created by windluffy on 06/01/2016.
 */
function restBase() {

}

/***
 * root url of resources
 * @type {string}
 */
restBase.rootURL = "http://localhost:8080/rest/";

/* **************** Cookies ************** */
/**
 * Holds cookie methods
 */
restBase.cookie = {};

/**
 * Get the value of a cookie.
 * @param name of the cookie{string}
 * @return value of the cookie {string}
 */
restBase.cookie.get = function (name) {
    var pairs = document.cookie.split(";");
    var cookie = {};
    for (var i in pairs) {
        var parts = pairs[i].split("=");
        cookie[parts[0].trim()] = parts[1].trim();
    }
    return cookie[name];
};


/**
 * Delete a cookie
 * @param name {string}
 */
restBase.cookie.remove = function (name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

/**
 * set a cookie
 * @param name {string}
 * @param value {string}
 */
restBase.cookie.set = function (name, value) {
    document.cookie = name + '=' + value;
};
/* **************** End Cookies ************** */

/* **************** Ajax Method ************** */
/**
 * Wrap the API so we can proxy calls while testing.
 */
restBase.get = function (resource, data, success, error) {
    var url = restBase.rootURL + resource;
    var time = restBase.get_iso_date();
    var nonce = restBase.makeRandomString();
    var string_to_hash = restBase.cookie.get('token') + ':' + url + ',GET,' + time + "," + nonce;
    var authorization = restBase.cookie.get('userId') + ':' + restBase.hash(string_to_hash);

    var request = $.ajax({
        url: url,
        type: "GET",
        data: data,
        headers: {
            'Authorization': authorization,
            'x-java-rest-date': time,
            'nonce': nonce
        },
        dataType: "json"
    });

    request.done(success);

    request.fail(error);

};

/**
 * Wrap the API so we can proxy calls while testing.
 */
restBase.post = function (resource, data, success, error) {
    var url = restBase.rootURL + resource;
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json", // send as JSON
        data: JSON.stringify(data),
        dataType: "json",
        success: success,
        error: error
    });
};

/**
 * Post with authentication
 */
restBase.postAuth = function (resource, data, success, error) {
    var url = restBase.rootURL + resource;
    var time = restBase.get_iso_date();
    var nonce = restBase.makeRandomString();
    var string_to_hash = restBase.cookie.get('token') + ':' + url + ',POST,' + time + "," + nonce;
    var authorization = restBase.cookie.get('userId') + ':' + restBase.hash(string_to_hash);

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json", // send as JSON
        data: JSON.stringify(data),
        headers: {
            'Authorization': authorization,
            'x-java-rest-date': time,
            'nonce': nonce
        },
        dataType: "json",
        success: success,
        error: error
    });

};


/**
 * Wrap the API so we can proxy calls while testing.
 */
restBase.put = function (resource, data, success, error) {
    var url = restBase.rootURL;
    var time = restBase.get_iso_date()
    var nonce = restBase.makeRandomString()
    var string_to_hash = restBase.cookie.get('token') + ':' + url + ',PUT,' + time + "," + nonce;
    var authorization = restBase.cookie.get('userId') + ':' + restBase.hash(string_to_hash);

    $.ajax({
        url: url,
        type: "PUT",
        contentType: "application/json", // send as JSON
        data: JSON.stringify(data),
        headers: {
            'Authorization': authorization,
            'x-java-rest-date': time,
            'nonce': nonce
        },
        dataType: "json",
        success: success,
        error: error
    })


};

/**
 * Return the current time as an ISO 8061 Date
 * @return {string} 2012-06-30T12:00:00+01:00
 */
restBase.get_iso_date = function () {
    var d = new Date();

    function pad(n) {
        return n < 10 ? '0' + n : n
    }

    return d.getUTCFullYear() + '-'
        + pad(d.getUTCMonth() + 1) + '-'
        + pad(d.getUTCDate()) + 'T'
        + pad(d.getUTCHours()) + ':'
        + pad(d.getUTCMinutes()) + ':'
        + pad(d.getUTCSeconds()) + 'Z';
};

restBase.makeRandomString = function () {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
};

/**
 * SHA256, then base64 encode a string
 * @param {string}
 * @return {string}
 */
restBase.hash = function (string) {
    var hash = CryptoJS.SHA256(string);
    return hash.toString(CryptoJS.enc.Base64);
};
/* **************** End Ajax Method ************** */

/* **************** User Resource **************** */
restBase.user = {};

/**
 * Log the user in
 * @param {string}
 * @param {string}
 * @param {function} Callback. First parameter is error, if any.
 */
restBase.user.login = function (username, password, success, fail) {

    restBase.post(
        'user/login',
        {
            "username": username,
            "password": password
        },
        function (response) {
            restBase.cookie.set('token', response.token);
            restBase.cookie.set('userId', response.userId);
            restBase.cookie.set('username', username);
            if (success) {
                success();
            }

        },
        function (jqXHR, textStatus) {
            console.log("Error");
            if (fail) {
                fail(jqXHR, textStatus);
            }
        })

};

/***
 * Check the user has Logged in;
 * @returns {boolean}
 */
restBase.user.isLoggedIn = function () {
    if (restBase.cookie.get('username')) {
        return true;
    }
    return false;
};

/***
 * Do logout the user
 */
restBase.user.logout = function () {
    restBase.cookie.remove('token');
    restBase.cookie.remove('userId');
    restBase.cookie.remove('username');
};

restBase.user.create = function (createUserRequest, success, error) {
    restBase.post(
        'user',
        createUserRequest,
        function (response) {
            restBase.cookie.set('token', response.token);
            restBase.cookie.set('userId', response.userId);
            restBase.cookie.set('username', response.username);
            if (success) {
                success();
            }
        },
        function (jqXHR, textStatus) {
            if (error) {
                error(jqXHR, textStatus);
            }
        }
    );
};
restBase.user.checkUserExisted = function (checkUserExisted, success, error) {
    restBase.post(
        'userStatus',
        checkUserExisted,
        success,
        error
    );

};

/* **************** End User Resource **************** */