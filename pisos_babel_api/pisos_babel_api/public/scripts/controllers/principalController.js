angular.module('pisosBabel').controller('principalController', ['$location', '$scope','URL', 'paths', 'searchService', function($location,$scope, URL, paths, searchService) {

    $scope.model = [];

    $scope.uiState = 'buscar';

    $scope.buscar = function() {
        if ($scope.model.compra === "opcion_1") {
            $scope.model.compra = "true";
        } 
        if($scope.model.compra === 'opcion_2'){
            $scope.model.compra = "false";
        }
        if ($scope.model.amueblado === 'opcion_1') {
            $scope.model.amueblado = 'true';
        }
        if ($scope.model.amueblado === 'opcion_2') {
            $scope.model.amueblado = 'false';
        }

        searchService.lookFor($scope.model).then(
            function(data) {
                $scope.uiState = 'encontrado';
                $scope.resultado = data.rows;
            },
            function(data) {
                $scope.uiState = 'error';
            }
        );
        //llamar a searchService que se encargará de realizar la llamada a APIClient, que este pasará los filtros a la api para obtener los anuncios específicos con ese filtro
    }
	$scope.moreInfo = function(anuncio){
	   var url = URL.resolve(paths.anuncioDetail, { id: anuncio._id });
	   $location.url(url);
	}
}])
