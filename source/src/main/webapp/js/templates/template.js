app.directive('ngHeader' , function(){
	return{
		templateUrl: 'js/templates/headerSection.html',
		link: function($scope, element, attrs) {
			// Trigger when number of children changes,
			// including by directives like ng-repeat
			var watch = $scope.$watch(function() {
				return element.children().length;
			}, function() {
				// Wait for templates to render
				$scope.$evalAsync(function() {
					$("#loginlogout-btn").click(showLogin);
				});
			});
		}
	};
});

app.directive('ngFooter',function(){
	return{
		templateUrl:'js/templates/footerSection.html'
	};
});


