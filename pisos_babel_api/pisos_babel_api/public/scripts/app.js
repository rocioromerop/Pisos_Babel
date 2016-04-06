angular.module('pisosBabel', ["ngRoute", "URL", "ngSanitize"]).config(
    ["$routeProvider", "paths", function($routeProvider, paths) {
        // Configuro las URLs de la aplicación


        $routeProvider
        .when(paths.login, {
            templateUrl: 'views/login.html'
        })
        .when(paths.logout, {
            templateUrl: 'views/logout.html'
        })
        .when(paths.register, {
            templateUrl: 'views/register.html'
        })
        .when(paths.anuncios, {
            templateUrl: 'views/anunciosList.html'
        })
        .when(paths.newAnuncio, {
            templateUrl: 'views/newAnuncio.html',
        })
        .when(paths.myAnuncios, {
            templateUrl: 'views/myAnunciosList.html',
        })
        .when(paths.myFavourites, {
            templateUrl: 'views/myFavouritesList.html',
        })
        .when(paths.anuncioDetail, {
            templateUrl: 'views/anuncioDetail.html',
        })
        .when(paths.home, {
            templateUrl: 'views/anunciosList.html',
        })
        .otherwise({
            templateUrl: 'views/404.html'
        })
    }]
);
