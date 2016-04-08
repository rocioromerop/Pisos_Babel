angular.module("pisosBabel").controller("loginController", ["$scope", "AuthService", "logService", function($scope, AuthService, logService) {

    $scope.model = {};

    $scope.conectarse = function() {
        // llamará al servicio para autenticar al usuario
        $scope.model.authentic = 'true';
        AuthService.loginUser($scope.model);
    }

    logService.subscribeLogin($scope, function somethingChanged() {
        $scope.userState = "logged";
    });

    logService.subscribeLogout($scope, function somethingChanged() {
        $scope.userState = 'no-logged';
    })

}]);
