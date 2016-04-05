angular.module("pisosBabel").controller("newAnuncioController", ["$scope", "APIClient", "$location", "paths", function($scope, APIClient, $location, paths){

	$scope.model = {};
	$scope.uiState = 'ideal';
	var usuarioAutenticado = "Juan";

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
            	console.log("Pasa por aqui");
                $location.path(paths.anuncios);
            },
            function(error) {
                console.log("Error al guardar el anuncio");
                console.log(error);
                $scope.uiState = 'error';
            }
        )

	}


}])


