angular.module("pisosBabel").controller("loginController", ["$scope", "AuthService",function($scope, AuthService){

	$scope.model={};

	$scope.conectarse = function(){
		// llamará al servicio para autenticar al usuario
		console.log($scope.model);
		AuthService.loginUser($scope.model);
	}


}]);