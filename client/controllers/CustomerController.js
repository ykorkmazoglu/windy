myApp.controller('CustomerController', function($scope, customerFactory){

	// Here is where we are creating indexController.
	// You have to make sure that our index controller matches the name
	// that we pass in, in our router.
	// So far the only variable that I'm injecting into this controller
	// is $scope.

	console.log('I am able to load my CustomerController along with my customers partial');

	// d.a({name: 'req.body.test', status: 'working'}, function(d){
	// 	console.log(d);
	// })
	customerFactory.index(function(data){
		console.log('this is data in CustomerController to get customers', data);
		$scope.customers = data;
	})();

	$scope.create = function(){
		console.log('create customer CustomerController', $scope.customer);
		customerFactory.create($scope.customer, function(customerArray){
			$scope.customers = customerArray;
		})
	}
})
