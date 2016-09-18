myApp.factory('customerFactory', function($http){

	var factory = {};
	var customers = [];

    factory.index = function(callback){
		console.log('DEBUG: Made it to customer factory to get customers');
		$http.get('/customers').then(function(data){
			console.log('DEBUG: Made it back from backend to get all customers', data);
			customers = data.data;
			callback(customers);
		})
	}

	factory.create = function(customer, callback){
		console.log('DEBUG: Made it to my customer factory: ',customer);
		$http.post('/customers', customer).then(function(customer){
			console.log('DEBUG: Made it back from backend this is our new customer', customer);
			customers.push(customer.data);
			callback(customers);
		})
	}


	factory.show = function(custID, callback){
		$http.get('/customers/' + custID).then(function(data){
			console.log('DEBUG: Made it back from backend to show this customer', data);
			callback(customers);
		})
	}
	factory.update = function(updatedCustomer, callback){
		$http.put('/customers/' + updatedCustomer._id + '/update', updatedCustomer).then(function(data){
			console.log('DEBUG: Made it back from backend after updating this customer', data.data);
            customers = data.data;
			callback(customers);
		})
	}

	// This is my dummyFactory. I usually add this into any project that
	// I do. Just so that I can use it for reference as I add new Factories
	// below we have an example of how we would create a post request, as well
	// as how we would create a get request.


	// var dummies = []

	// var factory = {}

	// factory.getDummies = function(callback){
	// 	$http.get('/dummies').then(function(data){
	// 		mongooses = data.data;
	// 		callback(data.data);
	// 	});
	// }

	// // the info parameter below is the the dummy that we're trying to add into our database

	// // I added a test for myself below. I'm passing both a body element as well a params element
	// // I use this as an initial test that I can pass information to my backend.
	// // Check out your server console and you should see the body and the value we pass through
	// // the url.
	// factory.addDummy = function(info, callback){
	// 	$http.post('/dummies/youShouldSeeThisInServerConsoleReqParams', info).then(function(data){
	// 		if(data.error){
	// 			callback(data);
	// 		} else {
	// 			mongooses.push(data)
	// 			callback(mongooses);
	// 		}
	// 	})
	// }

	return factory;
})
