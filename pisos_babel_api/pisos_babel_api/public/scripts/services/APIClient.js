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

        this.createAnuncio = function(anuncio) {
            var deferred = $q.defer();
            $http.post(apiPaths.pisos, anuncio).then(
                function(response) {
                    console.log("1");
                    deferred.resolve(response.data);
                },
                function(response) {
                    console.log("2");
                    deferred.reject(response.data);
                }
            )
            return deferred.promise;
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
                    console.log("1")
                },
                function(response) {
                    deferred.reject(response.data);
                }
                )
                return deferred.promise;
            
        }

    }]

);
