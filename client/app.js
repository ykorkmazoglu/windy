var myApp = angular.module('myApp', ['ngRoute']);

// this is our front end router
myApp.config(function($routeProvider){
    console.log("Debug: configuring the router @app.js ...\n");
    $routeProvider
	.when('/',
    {
        controller: 'UserController',
		templateUrl: 'partials/login.html'
    })
    .when('/dashboard',
    {
        controller: "DashboardController",
        templateUrl: "partials/dashboard.html"
    })
    .when('/create',
    {
        controller: "PollController",
        templateUrl: "partials/poll.html"
    })
    .when('/poll/:id',
    {
        controller: "OptionsController",
        templateUrl: "partials/option.html"
    })
    .otherwise({
          redirectTo: '/'
        })
});
