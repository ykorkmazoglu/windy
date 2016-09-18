myApp.controller('PollController', function($scope, pollFactory, userFactory,$location){

    console.log("Debug: @PollController.js ...\n");

    userFactory.getUser(function(user){
        console.log("Debug: @PollController.js/userFactory.getUser getting the user from userFactory...\n",user);
        $scope.user = user;
    })
        console.log("Debug: @PollController.js Printing $scope.user...\n",$scope.user._id);

    $scope.create = function(){
		console.log("Debug: @PollController.js/$scope.create Printing $scope.poll...\n",$scope.poll);
        console.log("Debug: @PollController.js/$scope.create Printing $scope.option1...\n",$scope.option1);
        console.log("Debug: @PollController.js/$scope.create Printing $scope.option2...\n",$scope.option2);
        console.log("Debug: @PollController.js/$scope.create Printing $scope.option3...\n",$scope.option3);
        console.log("Debug: @PollController.js/$scope.create Printing $scope.option4...\n",$scope.option4);
		pollFactory.create($scope.poll,$scope.option1,$scope.option2,$scope.option3,$scope.option4,$scope.user._id,function(){
            $location.url('/dashboard');
	    })
	}
})
