angular.module("pisosBabel").service("AuthService", ["$window", "APIClient", "$rootScope", "logService", function($window, APIClient, $rootScope, logService){
	this.loginUser = function(user){
		APIClient.comprobarUsuario(user).then(
			function(resolve){
				if(resolve.result==false){
					logService.notifyLogout();
				}
				else{
					//es que el usuario coincide
					console.log("LO QUE ME DEVUELVE LA BASE DE DATOS:", resolve);
					$window.localStorage['user'] = resolve.rows.name;
					$window.localStorage['fav'] = resolve.rows.myFav;
					console.log($window.localStorage['fav']);
					logService.notifyLogin();
				}
			},
			function(error){
				logService.notifyLogout();
			}
		);
	}
	this.getUser = function(){
		return $window.localStorage['user'];
	}
	this.logoutUser = function(){
		$window.localStorage.removeItem('user');
		logService.notifyLogout();
	}
	this.getFav = function(){
		return $window.localStorage['fav'];
	}
	
}])
