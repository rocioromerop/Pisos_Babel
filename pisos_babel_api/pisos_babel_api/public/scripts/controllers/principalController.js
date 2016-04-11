angular.module('pisosBabel').controller('principalController', ['$location', '$scope', 'URL', 'paths', 'searchService', function($location, $scope, URL, paths, searchService) {

    $scope.model = [];

    $scope.uiState = 'buscar';
    $scope.more = 'true';

    $scope.buscar = function() {
        $scope.more = 'true';
        $scope.uiState = 'loading';
        if ($scope.model.compra === "opcion_1") {
            $scope.model.compra = "true";
        }
        if ($scope.model.compra === 'opcion_2') {
            $scope.model.compra = "false";
        }
        if ($scope.model.amueblado === 'opcion_1') {
            $scope.model.amueblado = 'true';
        }
        if ($scope.model.amueblado === 'opcion_2') {
            $scope.model.amueblado = 'false';
        }

        $scope.model.start = 0;
        $scope.model.limit = 3;

        searchService.lookFor($scope.model).then(
            function(data) {
                if (data.rows[0] == undefined) {
                    $scope.uiState = 'blank';
                    $scope.more = 'true';
                    $scope.less = 'false';
                } else {
                    $scope.resultado = data.rows;
                    $scope.uiState = 'encontrado';
                }
            },
            function(data) {
                $scope.uiState = 'error';
            }
        );
        //llamar a searchService que se encargará de realizar la llamada a APIClient, que este pasará los filtros a la api para obtener los anuncios específicos con ese filtro
    }
    $scope.moreInfo = function(anuncio) {
        var url = URL.resolve(paths.anuncioDetail, { id: anuncio._id });
        $location.url(url);
    }
    $scope.tenmore = function() {
        $scope.model.start = $scope.model.start + 3;
        $scope.resultado = null;
        searchService.lookFor($scope.model).then(
            function(data) {
                if (data.rows[0] == undefined) {
                    $scope.less = 'true';
                    $scope.more = 'false';
                } else {
                    $scope.resultado = data.rows;
                    $scope.uiState = 'encontrado';
                    $scope.less = 'true';
                }
            },
            function(data) {
                $scope.uiState = 'error';
            }
        );
    }
    $scope.tenless = function() {
        $scope.model.start = $scope.model.start - 3;
        $scope.resultado = null;
        if ($scope.model.start == 0) {
            $scope.less = 'false';
        }
        searchService.lookFor($scope.model).then(
            function(data) {
                if (data.rows[0] == undefined) {
                    $scope.uiState = 'blank';
                } else {
                    $scope.resultado = data.rows;
                    $scope.uiState = 'encontrado';
                    $scope.more = 'true';
                }
            },
            function(data) {
                $scope.uiState = 'error';
            }
        );
    }
}])
