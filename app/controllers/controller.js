/*global angular */var myApp = angular.module('myApp', []);
myApp.controller("AppCtrl",["$scope","$http",function ($scope, $http){
	var polls;
	console.log("Hello world from controller");
	$http.get("/getPolls").then(function(result){
		polls = result.data;
		console.log(result.data);
		$scope.polls = polls;
	});
}]);
/*global $*/ $(document).ready(function(){
		$("#add").on("click", function(){
			$("#options").append('<div class="row"><div class="input-field col s4"><input id="options" type="text" placeholder="Voting App" name="options"><label for="options" class="active">Create Options</label></div></div>');
		});
});
