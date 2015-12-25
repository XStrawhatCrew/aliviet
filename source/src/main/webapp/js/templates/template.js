app.directive('ngHeader' , function(){
	return{
		templateUrl: 'js/templates/headerSection.html'
	};
});

app.directive('ngFooter',function(){
	return{
		templateUrl:'js/templates/footerSection.html'
	};
});

app.directive('ngLogin', function(){
	return{
		restrict: 'A', 
		templateUrl:'js/templates/loginLogoutSection.html'
	};
});
