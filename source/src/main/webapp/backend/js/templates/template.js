/**
 * Created by tinblanc on 12/31/15.
 */

app.directive('ngHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/templates/headerBackend.html',
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
        restrict: 'E',
        templateUrl: 'js/templates/footerBackend.html'
    };

});

