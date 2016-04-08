angular.module("pisosBabel").controller("AppController", ["$scope", "$location", "paths", "AuthService",
    function($scope, $location, paths, AuthService) {
        var controller = this;
        //Controller properties
        controller.titles = {};
        controller.titles[paths.login] = "Login";
        controller.titles[paths.anuncios] = "Anuncios List";
        controller.titles[paths.newAnuncio] = "Añadir Anuncio";
        controller.titles[paths.myAnuncios] = "Mis Anuncios";
        controller.titles[paths.logout] = "Logout";

        // Model init
        $scope.model = { // Representación modelo
            title: ""
        };

        //Scope event listeners

        $scope.userAuth = "";
        AuthService.logoutUser();
    }
]);
