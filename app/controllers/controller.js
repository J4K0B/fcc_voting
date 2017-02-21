var myApp = angular.module('myApp', []);
myApp.controller("AppCtrl",["$scope","$http",function ($scope, $http){
	var polls;
	console.log("Hello world from controller");
	$http.get("/getPolls").then(function(result){
		polls = result.data;
		console.log(result.data);
		$scope.polls = polls;
	});
	
}]);
