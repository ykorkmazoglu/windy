myApp.controller('DashboardController', function($scope, pollFactory, userFactory, $location){

    console.log("Debug: @DashboardController.js ...\n");

    userFactory.getUser(function(user){
        console.log("Debug: @DashboardController.js/userFactory.getUser getting the user from userFactory...\n",user);
        $scope.user = user;
    })
        console.log("Debug: @DashboardController.js Printing $scope.user...\n",$scope.user._id);

    pollFactory.index(function(data){
    		$scope.polls = data;
            console.log('Debug: @DashboardController.js Printing $scope.polls...\n',$scope.polls);
    	});

    $scope.delete = function(pollID){
    		console.log('Debug: $scope.delete.... @DashboardController.js Printing poll id...\n', pollID);
    		pollFactory.delete(pollID,function(data){
                $scope.polls = data;
                console.log('Debug: @DashboardController.js Printing $scope.polls...\n',$scope.polls);
    		})
    	}
})
