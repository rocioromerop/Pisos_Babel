angular.module("pisosBabel").controller("AppController", ["$scope", "$location", "paths", "AuthService",
    function($scope, $location, paths, AuthService) {
        var controller = this;
        //Controller properties
        controller.titles = {};
        controller.titles[paths.login] = "Login";
        controller.titles[paths.anuncios] = "Anuncios List";
        controller.titles[paths.newAnuncio] = "Añadir Anuncio";
        controller.titles[paths.myAnuncios] = "Mis Anuncios";

        // Model init
        $scope.model = { // Representación modelo
            title: ""
        };

        //Scope event listeners

        $scope.userAuth = "";
        AuthService.logoutUser();

        //Scope event listeners
        $scope.$on("$locationChangeSuccess", function(evt, currentRoute) { //.$on capturar evento 
            $scope.userAuth = AuthService.getUser();
            if ($scope.userAuth) {
                $scope.model.title = controller.titles[$location.path()] || "404 Not Found";
            } else $location.path(paths.login);
        });

        $scope.$on("ChangeTitle", function(evt, title) {
            $scope.model.title = title;
        });

    }
]);
