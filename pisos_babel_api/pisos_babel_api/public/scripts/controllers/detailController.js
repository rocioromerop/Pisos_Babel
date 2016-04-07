angular.module('pisosBabel').controller('detailController', ['paths','$scope', "APIClient", "$routeParams", 'AuthService', '$location', function(paths, $scope, APIClient, $routeParams, AuthService, $location) {

    $scope.model = {};

    var usuarioAutenticado = AuthService.getUser();

    if(usuarioAutenticado == undefined){
    	$scope.autentic = 'true';
    }

    $scope.uiState = 'loading';
    // Buscar en la base de datos el id del anuncio específico que quiero ver
    APIClient.getAnuncio($routeParams.id).then(
        function(data) {
            if (data.rows[0].amueblado == 'false') {
                data.rows[0].amueblado = 'sí';
            } else {
                console.log('entro');
                data.rows[0].amueblado = 'no';
            }
            $scope.model = data.rows;
            APIClient.getUser(data.rows[0].usuarioSubida).then(
                // promesa resuelta
                function(data2) {
                    $scope.contact = data2.rows[0];
                    $scope.uiState = 'ideal';
                },
                //promesa rechazada
                function(data2) {
                    $scope.uiState = "error";
                }
            );
        },
        function(data) {
            $scope.uiState = 'error';
        }
    );
    $scope.addFav = function(){
    	//para añadir a favoritos el anuncio. Tengo el id del anuncio, lo que tengo que hacer es meter al usuario que está autenticado, en su myFav[] el id del anuncio.
    	
    }
}])
