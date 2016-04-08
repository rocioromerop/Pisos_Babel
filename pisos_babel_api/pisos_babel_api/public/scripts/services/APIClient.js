angular.module("pisosBabel").service("APIClient", ["$http", "$q", "$filter", "apiPaths", "URL", function($http, $q, $filter, apiPaths, URL) {

    this.apiRequest = function(url) {
        // Crear el objeto diferido
        var deferred = $q.defer();
        // Hacer trabajo asíncrono
        $http.get(url).then(
            //petición ok 
            function(response) {
                // resolver la promesa
                deferred.resolve(response.data);
            },
            //pretición KO
            function(response) {
                // rechazar la promesa
                deferred.reject(response.data);
            }
        );
        // devolver la promesa
        return deferred.promise;
    }

    this.getAnuncios = function() {
        // Crear el objeto diferido
        var url = apiPaths.pisos;
        return this.apiRequest(url);
    };

    this.getMyAnuncios = function(usuarioAutenticado) {
        var url = apiPaths.pisos + '/?usuarioSubida=' + usuarioAutenticado;
        console.log(url);
        return this.apiRequest(url);
    }

    this.getAnunciosFiltrados = function(filtros) {
        var url = apiPaths.pisos + '/?' + filtros;
        return this.apiRequest(url);
    }
    this.getAnuncio = function(idAnuncio) {
        var url = URL.resolve(apiPaths.pisos, idAnuncio);
        return this.apiRequest(apiPaths.pisos + '/?id=' + idAnuncio);
    }

    this.createAnuncio = function(anuncio) {
        var deferred = $q.defer();
        $http.post(apiPaths.pisos, anuncio).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        )
        return deferred.promise;
    }

    this.getUser = function(nameUser) {
        var url = apiPaths.usuarios + '/?name=' + nameUser;
        return this.apiRequest(url);
    }

    this.registerUser = function(user) {
        var deferred = $q.defer();
        $http.post(apiPaths.usuarios, user).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        )
        return deferred.promise;
    }

    this.comprobarUsuario = function(user) {
        var deferred = $q.defer();
        $http.post(apiPaths.usuarios, user).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        )
        return deferred.promise;
    }

    this.addFav = function(idUser, myFav) {
        var deferred = $q.defer();
        var url = apiPaths.usuarios + '/' + idUser;
        console.log("myFav", myFav);
        $http.put(url, myFav).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        )
        return deferred.promise;
    }
    
    this.removeFav = function(idUser, myFav) {
        var deferred = $q.defer();
        var url = apiPaths.usuarios + '/' + idUser;
        console.log("myFav", myFav);
        $http.put(url, myFav).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        )
        return deferred.promise;
    }
}]);
