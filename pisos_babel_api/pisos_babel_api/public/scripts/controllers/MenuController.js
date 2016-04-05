angular.module("pisosBabel").controller("MenuController", ["$scope", "$location", "$rootScope", "paths", 
    function($scope, $location, $rootScope, paths, AuthService) {

        //Scope init
        $scope.model = {
            selectedItem: paths.login
        };

        $scope.userState = "no-logged";
        $scope.paths = paths;

        //Scope methods

        $scope.getClassForItem = function(item) {
            if ($scope.model.selectedItem == item) {
                return "active";
            } else {
                return "";
            }
        };

        //Scope Watchers


        $scope.$on("$locationChangeSuccess", function(evt, currentRoute) { //.$on capturar evento 
            $scope.model.selectedItem = $location.path();
        });

        
    }
]);
