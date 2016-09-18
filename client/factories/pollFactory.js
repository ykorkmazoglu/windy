myApp.factory('pollFactory', function($http){

	var factory = {};
	var poll = {};
    var options = [];

    factory.create = function(poll,option1,option2,option3,option4,userID, callback){
        console.log('Debug: factory.create.... @pollFactory.js ...\n',userID);
        //call for poll
        $http.post('/polls/'+ userID, poll).then(function(dataPoll){
            console.log('DEBUG: Made it back from backend this is our new poll', dataPoll);
            //call for option1
            $http.post('/options/'+ dataPoll.data._id, option1).then(function(dataOption1){
                console.log('DEBUG: Made it back from backend this is our option1', dataOption1);
                //call for option2
                $http.post('/options/'+ dataPoll.data._id, option2).then(function(dataOption2){
                    console.log('DEBUG: Made it back from backend this is our option2', dataOption2);
                    //call for option3
                    $http.post('/options/'+ dataPoll.data._id, option3).then(function(dataOption3){
                        console.log('DEBUG: Made it back from backend this is our option3', dataOption3);
                        $http.post('/options/'+ dataPoll.data._id, option4).then(function(dataOption4){
                            console.log('DEBUG: Made it back from backend this is our option4', dataOption4);

                            callback();

                        })  //end of Option4 Call
                    })          //end of Option3 Call
                })                  //end of Option2 Call
            })                          //end of Option1 Call
        })                                  //end of Poll Call
    }                                           //end of factory.create

    factory.index = function(callback){
        console.log('DEBUG: Made it to poll factory to get polls');
        $http.get('/polls').then(function(data){
            console.log('DEBUG: Made it back from backend to get polls', data);
            polls = data.data;
            callback(polls);
        })
    }
    factory.getPoll = function(callback){
        callback(poll);
    }
    factory.getOptions = function(id,callback){
        for(var i=0; i<polls.length; i++)
        {
            if(id === polls[i]._id)
            {
                poll=polls[i];
            }
        }
        callback(poll);
    }

    factory.delete = function(id,callback){
        console.log('DEBUG: Made it to poll factory to delete the poll',id);
        $http.delete('/polls/'+id).then(function(data){
            console.log('DEBUG: Made it back from backend to delete polls', data);
            callback(data.data);
        })
    }

    factory.vote = function(optionID,pollID,userID,callback){
        var data = {
              poll: pollID,
              user: userID
          }
        console.log('DEBUG: Made it to poll factory to vote',data);

        $http.put('/options/optionID',data).then(function(result){
            console.log('DEBUG: Made it back from backend to get polls', result);
            // polls = data.data;
            // callback(polls);
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
