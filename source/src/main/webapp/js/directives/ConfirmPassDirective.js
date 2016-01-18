/**
 * Created by Windows7 on 1/18/2016.
 */
app.directive('compareTo', function () {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: '=compareTo'

        },
        link: function (scope, elm, attrs, ngModel) {
            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };
            ngModel.$watch('otherModelValue', function () {
                ngModel.$validate();
            });


        }

    };
});