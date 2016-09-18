myApp.controller('UserController', function($scope, userFactory, $location){
    console.log("Debug: @UserController.js ...\n");

	$scope.login = function(){
		console.log('Debug: $scope.login.... @UserController.js Printing login from form...\n', $scope.user);
		userFactory.login($scope.user,function(userReturned){
			$scope.user = userReturned;
            console.log('Debug: $scope.login.... @UserController.js Printing login from db...\n', $scope.user);
            $location.url('/dashboard');
		})
	}
})
