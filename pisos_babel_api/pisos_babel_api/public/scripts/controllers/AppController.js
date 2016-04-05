angular.module("pisosBabel").controller("AppController", ["$scope", "$location", "paths",
    function($scope, $location, paths) {
        var controller = this;
        //Controller properties
        controller.titles = {};
        controller.titles[paths.login] = "Login";
        controller.titles[paths.anuncios] = "Anuncios List";
        controller.titles[paths.newAnuncio] = "New Anuncio";
        controller.titles[paths.myAnuncios] = "My Anuncios";
        controller.titles[paths.logout] = "Logout";

        // Model init
        $scope.model = { // Representación modelo
            title: ""
        };

        //Scope event listeners
        
    }
]);
