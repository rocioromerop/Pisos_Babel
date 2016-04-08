angular.module('pisosBabel').controller('myAnunciosController', ['$location', 'paths', 'URL', '$scope', "APIClient", 'AuthService', function($location, paths, URL, $scope, APIClient, AuthService) {

    $scope.model = {};

    $scope.uiState = 'loading';

    var usuarioAutenticado = AuthService.getUser();

    if (usuarioAutenticado == undefined) {
        $scope.uiState = 'noAuth';
    } else {
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
    }
    $scope.moreInfo = function(anuncio) {
        var url = URL.resolve(paths.anuncioDetail, { id: anuncio._id });
        $location.url(url);
    }
}])
