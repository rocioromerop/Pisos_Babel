angular.module('pisosBabel').controller('myAnunciosController', ['$scope', "APIClient", 'AuthService', function($scope, APIClient, AuthService){
	
	$scope.model = {};

	$scope.uiState = 'loading';

	APIClient.getMyAnuncios(AuthService.getUser()).then(
		// promesa resuelta
            function(data) {
                $scope.model = data.rows;
                if ($scope.model.length == 0) {
                    $scope.uiState = 'blank';
                } else {
                    $scope.uiState = 'ideal';
                }
            },
            //promesa rechazada
            function(data) {
                $scope.uiState = "error";
            }
		);

}])