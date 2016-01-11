/**
 * Created by tinblanc on 12/31/15.
 */

app.directive('ngHeader', function () {
    return {
        restrict: 'A',
        templateUrl: 'header.html',
        link: function ($scope, element, attrs) {
            headerReady();
            $('#order-attrs button').mouseenter(function () {
                if ($(this).hasClass("button-false")) {
                    $(this).addClass("button-false-hover");

                }
            });
        }
    };
});


app.directive('ngFooter', function () {

    return {
        restrict: 'A',
        templateUrl: 'footer.html'
    };

});

