angular.module('pisosBabel').controller('myFavController', ['$scope', "APIClient", 'AuthService', function($scope, APIClient, AuthService) {

    $scope.model = [];

    var usuarioAutenticado = AuthService.getUser();

    if (usuarioAutenticado == undefined) {
        $scope.uiState = 'noAuth';
    } else {
        var myFav = AuthService.getFav();

        // Tengo que obtener todos los anuncios con todos los IDs -> llamadas a la api con esos ids

        var cadaFav = myFav.split(',');

        $scope.uiState = 'loading';
        if (cadaFav[0] == '') {
            $scope.uiState = 'blank';
        } else {
            for (var i in cadaFav) {
                APIClient.getAnuncio(cadaFav[i]).then(
                    function(data) {
                        $scope.model.push(data.rows[0]);
                        $scope.uiState = 'ideal';
                    },
                    function(data) {
                        $scope.uiState = 'error';
                    }
                )
            }
        }
    }

}])
