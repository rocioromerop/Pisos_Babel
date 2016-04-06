angular.module('pisosBabel').controller('detailController', ['$scope', "APIClient", "$routeParams", function($scope, APIClient, $routeParams){
	
	$scope.model = {};

	$scope.uiState = 'loading';
	// Buscar en la base de datos el id del anuncio específico que quiero ver
	APIClient.getAnuncio($routeParams.id).then(
		function(data){
			$scope.model = data.rows;
			$scope.uiState = 'ideal';
		},
		function(data){
			$scope.uiState = 'error';
		}
	);
}])