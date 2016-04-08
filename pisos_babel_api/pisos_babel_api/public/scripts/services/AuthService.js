angular.module("pisosBabel").service("AuthService", ["$window", "APIClient", "$rootScope", "logService", function($window, APIClient, $rootScope, logService){
	this.loginUser = function(user){
		APIClient.comprobarUsuario(user).then(
			function(resolve){
				if(resolve.result==false){
					logService.notifyLogout();
				}
				else{
					//es que el usuario coincide
					console.log('paso por aqui');
					$window.localStorage['user'] = resolve.rows.name;
					$window.localStorage['fav'] = resolve.rows.myFav;
					$window.localStorage['id'] = resolve.rows._id;
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
		$window.localStorage.removeItem('id');
		$window.localStorage.removeItem('fav');
		logService.notifyLogout();
	}
	this.getFav = function(){
		return $window.localStorage['fav'];
	}
	this.addFav = function(fav){
		console.log('1', $window.localStorage['fav']);
		$window.localStorage['fav'] = $window.localStorage['fav'] + ','+ fav;
		console.log('2', $window.localStorage['fav']);
	}
	this.getId = function(){
		return $window.localStorage['id'];
	}
	
}])
