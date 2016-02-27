/**
 * Created by windluffy on 12/01/2016.
 */
app.directive('authNav', ['$rootScope', 'AuthenticationService', function ($rootScope, AuthenticationService) {
    return {
        restrict: 'E',
        scope: {
            isLoggedIn: '='
        },
        templateUrl: 'views/authNav.html',
        link: function (scope, elem, attrs) {
            scope.$watch('isLoggedIn', function (newValue, oldValue) {
                if (newValue) {
                    scope.username = restBase.cookie.get('username');
                }
            });

            scope.signOut = function () {
                $rootScope.isLoggedIn = false;
                AuthenticationService.logout();
            };
        }
    }
}]);