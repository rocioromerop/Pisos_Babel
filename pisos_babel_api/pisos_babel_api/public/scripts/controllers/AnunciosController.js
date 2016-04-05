angular.module("pisosBabel").controller("AnunciosController", ["$http", "$scope", "APIClient", "$location", "apiPaths", "URL", "paths", function($http, $scope, APIClient, $location, apiPaths, URL, paths){

	$scope.model = {};

	$scope.uiState = 'loading';

	APIClient.getAnuncios().then(
		// promesa resuelta
            function(data) {
                $scope.model = data.rows;
                console.log(data.rows);
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

	$scope.moreInfo = function(anuncio){
		var url = URL.resolve(paths.anuncioDetail, { id: anuncio._id });
		$location.url(url);
	}

}])