angular.module('pisosBabel').controller('myFavController', ['$scope', "APIClient", 'AuthService', function($scope, APIClient, AuthService) {

    $scope.model = [];

    $scope.uiState = 'loading';

    var usuarioAutenticado = AuthService.getUser();

    var myFav = AuthService.getFav();

    // Tengo que obtener todos los anuncios con todos los IDs -> llamadas a la api con esos ids

    var cadaFav = myFav.split(',');

    console.log(cadaFav.length);
    if (cadaFav[0] == '') {
        $scope.uiState = 'blank';
    } else {
        for (var i in cadaFav) {
            APIClient.getAnuncio(cadaFav[i]).then(
                function(data) {
                    $scope.model.push(data.rows[0]);
                    $scope.uiState = 'ideal'

                },
                function(data) {
                    $scope.uiState = 'error';
                }
            )
        }
    }



    /*  APIClient.getAnuncio(idAnuncio).then(
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
            );*/
}])
