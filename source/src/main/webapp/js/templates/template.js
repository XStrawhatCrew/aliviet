//app.directive('ngHeader' , function(){
//	return{
//		templateUrl: 'js/templates/headerSection.html',
//		link: function($scope, element, attrs) {
//
//
//			// Trigger when number of children changes,
//			// including by directives like ng-repeat
//			var watch = $scope.$watch(function() {
//				return element.children().length;
//			}, function() {
//				// Wait for templates to render
//				$scope.$evalAsync(function() {
//					$("#loginlogout-btn").click(showLogin);
//					document.getElementById("btn-show-modal").click();
//					jPMenu();
//				});
//			});
//		}
//	};
//});

app.directive('ngHeader', function () {
	return{

		restrict:'A',
		templateUrl: 'header.html',
		link: function($scope, element, attrs){
			$("#loginlogout-btn").click(showLogin);
			document.getElementById("btn-show-modal").click();
		}


	};
});

app.directive('loginArea', function(){
	return{
		restrict:'A',
		templateUrl: 'loginlogoutarea.html'
	};
});


app.directive('ngFooter',function(){
	return{
		restrict:'A',
		templateUrl:'footer.html'
	};
});



