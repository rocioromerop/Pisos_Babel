angular.module('pisosBabel').controller('principalController', ['$scope', 'searchService', function($scope, searchService) {

    $scope.model = {};

    $scope.buscar = function() {
        if($scope.model.compra === "opcion_1"){
			$scope.model.compra = "true";
		}
		else{
			$scope.model.compra = "false";
		}
        if($scope.model.amueblado == 'opcion_2'){
        	$scope.model.amueblado = 'true';
        }
        else{
        	$scope.model.amueblado = 'false';
        }

        //llamar a searchService que se encargará de realizar la llamada a APIClient, que este pasará los filtros a la api para obtener los anuncios específicos con ese filtro
    }
}])
