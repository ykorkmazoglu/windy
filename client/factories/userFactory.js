myApp.factory('userFactory', function($http){

	var factory = {};
	var user = {} ;

    factory.getUser = function(callback){
        callback(user);
    }

    factory.login = function(newUser,callback){
		console.log('Debug: factory.login.... @userFactory.js ...\n', newUser);
		$http.post('/users', newUser).then(function(data){
			console.log('DEBUG: Made it back from backend to get the customer @userFactory.js', data);
            user=data.data;
            console.log("DEBUG: @userFactory.js printing the returned user: ",user)
			callback(user);
		})
	}

	// factory.show = function(custID, callback){
	// 	$http.get('/customers/' + custID).then(function(data){
	// 		console.log('DEBUG: Made it back from backend to show this customer', data);
	// 		callback(customers);
	// 	})
	// }
	// factory.update = function(updatedCustomer, callback){
	// 	$http.put('/customers/' + updatedCustomer._id + '/update', updatedCustomer).then(function(data){
	// 		console.log('DEBUG: Made it back from backend after updating this customer', data.data);
    //         customers = data.data;
	// 		callback(customers);
	// 	})
	// }

	return factory;
})
