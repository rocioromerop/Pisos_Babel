angular.module("pisosBabel").controller("newAnuncioController", ["$scope", "APIClient", "$location", "paths", "AuthService", function($scope, APIClient, $location, paths, AuthService){

	$scope.model = {};
	$scope.uiState = 'ideal';
	var usuarioAutenticado = AuthService.getUser();

	if(usuarioAutenticado == undefined){
		$location.url(paths.login);
	}

	$scope.saveAnuncio = function(){
		// usuarioSubida = el usuario que esté autenticado!
		if($scope.model.amueblado == "opcion_1"){
			$scope.model.amueblado = "true";
		}
		else{
			$scope.model.amueblado = "false";
		}
		if($scope.model.compra == "opcion_1"){
			$scope.model.compra = "true";
		}
		else{
			$scope.model.compra = "false";
		}
		$scope.model.usuarioSubida = usuarioAutenticado;
        APIClient.createAnuncio($scope.model).then(
            function(movie) {
            	$scope.uiState = 'success';
                $location.path(paths.anuncios);
            },
            function(error) {
                $scope.uiState = 'error';
            }
        )
	}


}])


