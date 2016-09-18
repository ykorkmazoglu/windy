myApp.controller('OptionsController', function($scope, $routeParams, pollFactory,userFactory){

	var pollId = $routeParams.id;
	pollFactory.getOptions(pollId,function(data){
		$scope.poll = data;
        console.log('Debug: @OptionsController.js Printing $scope.options...\n',$scope.poll);
	})
    userFactory.getUser(function(user){
        console.log("Debug: @PollController.js/userFactory.getUser getting the user from userFactory...\n",user);
        $scope.user = user;
    })
    $scope.vote = function(optionID,pollID){
		console.log("Debug: @PollController.js/$scope.create Printing optionID...\n",optionID);
        console.log("Debug: @PollController.js/$scope.create Printing users...\n",pollID);
        console.log("Debug: @PollController.js/$scope.create Printing $scope.user...\n",$scope.user);

		pollFactory.vote(optionID,pollID,$scope.user._id,function(){
            pollFactory.getOptions(pollId,function(data){
        		$scope.poll = data;
                console.log('Debug: @OptionsController.js Printing $scope.options...\n',$scope.poll);
        	})
	    })
	}
})
