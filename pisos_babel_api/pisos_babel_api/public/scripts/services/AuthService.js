angular.module("pisosBabel").service("AuthService", ["$window", "APIClient", function($window, APIClient){
	this.loginUser = function(user){
		APIClient.comprobarUsuario(user).then(
			function(resolve){
				console.log(resolve);
				if(resolve.result==false){
					console.log("NO AUTENTICADO CORRECTAMENTE");
				}
				else{
					//es que el usuario coincide
					$window.localStorage['user'] = user;
					console.log("autenticado correctamente");
				}
			},
			function(error){
				console.log("Ha habido un error en la base de datos");
			}
		);
	}

	this.getUser = function(){
		return $window.localStorage['user'];
	}
	this.logoutUser = function(){
		$window.localStorage.removeItem('user');
	}
}])