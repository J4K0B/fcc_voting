var myApp = angular.module('myApp', []);
myApp.controller("AppCtrl",["$scope","$http",function ($scope, $http){
	console.log("Hello word from controller");
	person1 = {
		name: "test",
		link: "#"
	};
	person2 = {
		name: "lel",
		link: "http://www.google.de/"
	};

	var polls = [person1, person2];
	$scope.polls =polls;
}]);
