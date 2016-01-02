/**
 * Created by tinblanc on 12/31/15.
 */

app.directive('ngHeader', function(){
    return{
        restrict: 'E',
        templateUrl:'js/templates/headerBackend.html',
        link: function ($scope, element, attrs) {
            headerReady();
        }
    };
});


app.directive('ngFooter', function(){

    return{
        restrict: 'E',
        templateUrl:'js/templates/footerBackend.html'
    };

});

