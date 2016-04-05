angular.module("pisosBabel").controller("AnunciosController", ["$http", "$scope", "APIClient", "$location" , function($http, $scope, APIClient, $location){

	$scope.model = {};

	$http.get('http://localhost:3000/api/v1/anuncios').then(
				//petición ok 
				function(response){
					// resolver la promesa
					$scope.model = response;
					console.log("1: ", response);
				},
				// petición KO
				function(response){
					// rechazar la promesa
					console.log("2: ", response);				
				}
	);
}])