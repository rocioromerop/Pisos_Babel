angular.module("pisosBabel").controller("loginController", ["$scope", "AuthService", "logService", function($scope, AuthService, logService){

	$scope.model = {};


	$scope.conectarse = function(){
		// llamará al servicio para autenticar al usuario
		$scope.model.authentic = 'true';
		AuthService.loginUser($scope.model);
		$scope.uiState = 'success';
	}



}]);