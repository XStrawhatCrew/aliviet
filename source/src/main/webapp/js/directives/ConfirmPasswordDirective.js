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
                console.log("modelValue=" + modelValue);
                console.info(modelValue == scope.otherModelValue);
                return modelValue == scope.otherModelValue;
            };
            scope.$watch('otherModelValue', function () {
                console.log(scope.otherModelValue);
                ngModel.$validate();
            });


        }

    };
});