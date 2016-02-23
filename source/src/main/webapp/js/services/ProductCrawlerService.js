/**
 * Created by windluffy on 23/02/2016.
 */
app.factory("ProductCrawlerService", ['$http', function ($http) {
    return function(link) {
        var req = {
            'method': 'POST',
            'url': 'http://ext.aliviet.vn/crawler/product_crawler.php',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'data': {
                'link': link
            }
        };
        return $http(req);
    }
}]);