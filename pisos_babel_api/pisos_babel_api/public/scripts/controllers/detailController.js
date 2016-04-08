angular.module('pisosBabel').controller('detailController', ['paths', '$scope', "APIClient", "$routeParams", 'AuthService', '$location', function(paths, $scope, APIClient, $routeParams, AuthService, $location) {

    $scope.model = {};

    //SI ES MI ANUNCIO, NO PUEDO PODER AÑADIRLO A MIS FAVORITOS.

    var usuarioAutenticado = AuthService.getUser();
    var idUsuario = AuthService.getId();
    var favsUsuario = AuthService.getFav();

    console.log('usuarioAutenticado: ', usuarioAutenticado);

    if (usuarioAutenticado != undefined) {
        $scope.autentic = 'true';
    }
    if(favsUsuario != undefined){
        var favSeparados = favsUsuario.split(",");
    }

    console.log('favsUsuario', favsUsuario);
    $scope.uiState = 'loading';
    // Buscar en la base de datos el id del anuncio específico que quiero ver
    APIClient.getAnuncio($routeParams.id).then(
        function(data) {
            if (data.rows[0].amueblado == 'false') {
                data.rows[0].amueblado = 'sí';
            } else {
                data.rows[0].amueblado = 'no';
            }
            $scope.model = data.rows;
            APIClient.getUser(data.rows[0].usuarioSubida).then(
                // promesa resuelta
                function(data2) {
                    $scope.contact = data2.rows[0];
                    if(usuarioAutenticado == data2.rows[0].name){
                        $scope.autentic = 'false';
                    }
                    if (favsUsuario != undefined) {
                        for (var i = 0; i < favSeparados.length; i++) {
                            console.log("data.rows[0]._id", data.rows[0]._id);
                            console.log("favSeparados[i]", favSeparados[i]);
                            if (favSeparados[i] == data.rows[0]._id) {
                                $scope.bott = 'yaFav';
                            }
                        }
                    }


                    $scope.uiState = 'ideal';
                },
                //promesa rechazada
                function(data2) {
                    $scope.uiState = "error";
                }
            );
        },
        function(data) {
            $scope.uiState = 'error';
        }
    );

    $scope.addFav = function() {
        var myFav = '{"myFav":"' + $scope.model[0]._id + '" }';
        var favJson = JSON.parse(myFav);

        $scope.bott = 'loading';
        APIClient.addFav(idUsuario, favJson).then(
            function(data) {
                AuthService.addFav(favJson);
                $scope.bott = 'yaFav';
            },
            function(data) {
                $scope.uiState = 'error';
            }
        );

    }


    /////////////////////FALTA COMPROBAR SI ESTE USUARIO TIENE YA ESTE ANUNCIO COMO FAVORITO, PARA CONTROLAR QUE SI AL PULSAR LO QUE SE HACE ES AGREGARLO O QUITARLO.
}])
