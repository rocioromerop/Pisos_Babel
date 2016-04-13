angular.module('pisosBabel').service('searchService', ['APIClient', '$q', function(APIClient, $q) {

    this.lookFor = function(filtros) {
        var enviar = '';

        var deferred = $q.defer();

        if (filtros.amueblado != undefined) {
            enviar = enviar + 'amueblado=' + filtros.amueblado;
        }
        if (filtros.compra != undefined) {
            enviar = enviar + '&compra=' + filtros.compra;
        }
        if (filtros.precio1 != undefined && filtros.precio2 != undefined) {
            enviar = enviar + '&precio=' + filtros.precio1 + '-' + filtros.precio2;
        }
        if (filtros.precio2 != undefined && filtros.precio1 == undefined) {
            enviar = enviar + '&precio=-' + filtros.precio2;
        }
        if (filtros.precio1 != undefined && filtros.precio2 == undefined) {
            enviar = enviar + '&precio=' + filtros.precio1 + '-';
        }
        if (filtros.metros1 != undefined && filtros.metros2 != undefined) {
            enviar = enviar + '&metros=' + filtros.metros1 + '-' + filtros.metros2;
        }
        if (filtros.metros2 != undefined && filtros.metros1 == undefined) {
            enviar = enviar + '&metros=-' + filtros.metros2;
        }
        if (filtros.metros1 != undefined && filtros.metros2 == undefined) {
            enviar = enviar + '&metros=' + filtros.metros1 + '-';
        }
        if (filtros.numeroHabitaciones != undefined) {
            enviar = enviar + '&numeroHabitaciones=' + filtros.numeroHabitaciones;
        }
        if (filtros.codigoPostal != undefined) {
            enviar = enviar + '&codigoPostal=' + filtros.codigoPostal;
        }

        if (filtros.start != undefined && filtros.limit != undefined) {
            enviar = enviar + '&start=' + filtros.start + '&limit=' + filtros.limit;
        }


        APIClient.getAnunciosFiltrados(enviar).then(
            function(response) {
                deferred.resolve(response);
            },
            function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }


}])
