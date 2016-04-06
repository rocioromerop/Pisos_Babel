angular.module("pisosBabel").controller("loginController", ["$scope", "AuthService",function($scope, AuthService){

	$scope.model = {};

	$scope.conectarse = function(){
		// llamará al servicio para autenticar al usuario
		$scope.model.authentic = 'true';
		AuthService.loginUser($scope.model);
		$scope.uiState = 'success';
	}


}]);