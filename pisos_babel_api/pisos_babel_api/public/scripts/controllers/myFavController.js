angular.module('pisosBabel').controller('myFavController', ['URL', '$location', 'paths', '$scope', "APIClient", 'AuthService', function(URL, $location, paths, $scope, APIClient, AuthService) {

    $scope.model = [];

    var usuarioAutenticado = AuthService.getUser();

    if (usuarioAutenticado == undefined) {
        $scope.uiState = 'noAuth';
    } else {
        var myFav = AuthService.getFav();

        // Tengo que obtener todos los anuncios con todos los IDs -> llamadas a la api con esos ids

        var cadaFav = myFav.split(',');

        $scope.uiState = 'loading';
        if (cadaFav == undefined) {
            $scope.uiState = 'blank';
        } else {
            for (var i in cadaFav) {
                APIClient.getAnuncio(cadaFav[i]).then(
                    function(data) {
                        if (data.rows == undefined) {
                            $scope.uiState = 'blank';
                        } else {
                            $scope.model.push(data.rows[0]);
                            $scope.uiState = 'ideal';
                        }
                    },
                    function(data) {
                        $scope.uiState = 'error';
                    }
                )
            }
        }
    }
    
    $scope.moreInfo = function(anuncio) {
        var url = URL.resolve(paths.anuncioDetail, { id: anuncio._id });
        $location.url(url);
    }

}])
