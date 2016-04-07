angular.module('pisosBabel').controller('detailController', ['$scope', "APIClient", "$routeParams", function($scope, APIClient, $routeParams) {

    $scope.model = {};

    $scope.uiState = 'loading';
    // Buscar en la base de datos el id del anuncio específico que quiero ver
    APIClient.getAnuncio($routeParams.id).then(
        function(data) {
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
}])
