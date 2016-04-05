angular.module("pisosBabel").controller('registerController', ['$scope', "APIClient", function($scope, APIClient) {

    $scope.model = {};
    $scope.uiState = 'ideal';
    $scope.register = function() {
        $scope.uiState = 'loading';
        APIClient.registerUser($scope.model).then(
            function(response) {
                if (response.result === false) {
                    $scope.uiReg = 'yaRegistrado';
                    $scope.uiState = 'ideal';
                } else {
                    $scope.uiState = 'success';
                    $scope.uiReg = '';
                }
            },
            function(error) {
                $scope.uiState = 'error';
            }
        );
    }
}])
