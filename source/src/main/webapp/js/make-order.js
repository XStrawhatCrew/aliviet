var WebMakeOrderViewModel = function () {
    self = this;

    self.orderItems = ko.observableArray();


    //Util Method
    self.makeANewProduct = function () {
        var obj = new Object();
        obj.linkSource = "";
        obj.color = "";
        obj.size = "";
        obj.quantity = "";
        obj.price = "";
        obj.notes = "";

        return obj;
    };


    self.makeANewOrder = function () {
        var order = ko.observableArray();
        order.push(self.makeANewProduct());
        return order;
    };

    //    Method data-bind

    self.addOrder = function () {
        self.orderItems.push(self.makeANewOrder());
    };



    self.addProduct = function (orderIndex, data, event) {
        self.orderItems()[orderIndex()].push(self.makeANewProduct());
    };

    self.removeProduct = function (productIndex, data, event, orderIndex) {
        self.orderItems()[orderIndex()].splice(productIndex(), 1);

    };

    self.createOrder = function () {
        var params = {
            'products': self.productItems(),
            'something': "Cai gi do"
        };
        var url = "http://localhost:1412/orderproduct.json";
        $.post(
            url,
            params,
            function (data) {
                console.log(data);
            }
        )
    };

    self.init = function () {
        self.orderItems.push(self.makeANewOrder());
    }();
};