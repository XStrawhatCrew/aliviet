/**
 * Created by windluffy on 27/02/2016.
 */
app.service('OrdersService', ['RestAPIBaseService', function (RestAPIBaseService) {
    this.push = function (createOrdersRequest) {
        return RestAPIBaseService.post(
            '/orders',
            createOrdersRequest
        );
    };

    this.getNextSEQ = function() {
        return RestAPIBaseService.get(
            '/orders/seq', null
        );
    }
}]);