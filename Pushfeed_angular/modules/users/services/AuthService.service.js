// users.service.js

(function () {

	function authServiceFunction ($http, $log, $q, Session) {
		var authService = {};

		function formEncode (obj) {
			var str = [];
			for(var p in obj){
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}			
			return str.join("&");
		}

		authService.loadUser = function () {
			return $q(function (resolve, reject) {
				$http
					.get(ApplicationConfiguration.appConfig.url + '/users/me')
					.success(function (res) {
						Session.create(null, res._id, res.roles);
						resolve(res);
					}).error(function(res) {
						$log.error(res);
						Session.destroy();
						reject(res);
					});
			});
		}

		authService.signin = function (credentials) {

			var signinPath = '/auth/signin';
			
			if(typeof credentials == 'object'){
				var credStr = formEncode(credentials);
			} else {
				credStr = credentials
			}

			return $q(function (resolve, reject) {
				$http({
					url: ApplicationConfiguration.appConfig.url + signinPath,
					method: 'POST',
					data: credStr,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				})
				.success(function (res) {
					$log.log('serverresponse:'+signinPath, res);
					Session.create(null, res._id, res.roles);
					resolve(res);
				}).error(function(res) {
					$log.error('serverresponse:'+signinPath, res);
					reject(res);
				});
			});
		}

		// go to website for sign up
		authService.signup = function (credentials) {
			
			var signupPath = '/auth/signup';

			if(typeof credentials == 'object'){
				var credStr = formEncode(credentials);
			} else {
				credStr = credentials
			}

			return $q(function (resolve, reject) {
				$http({
					url: ApplicationConfiguration.appConfig.url + signupPath,
					method: 'POST',
					data: credStr,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				})
				.success(function (res) {
					$log.log('serverresponse:'+signupPath, res);
					Session.create(null, res._id, res.roles);
					resolve(res);
				}).error(function(res) {
					$log.error(res);
					reject(res)
				});
			});
		}

		authService.signout = function () {

			return $q(function (resolve, reject) {
				$http
					.get(ApplicationConfiguration.appConfig.url + '/auth/signout')
					.success(function (res) {
						Session.destroy();
						resolve(res);
					}).error(function(res) {
						$log.error(res);
						reject(res);
					});
			});
		}

		authService.isAuthenticated = function () {
			return !!Session.username;
		};

		authService.isAuthorized = function (authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (authService.isAuthenticated() &&
				authorizedRoles.indexOf(Session.userRole) !== -1);
		};

		return authService;
	}
	

	ApplicationConfiguration.registerModule('users', []);
	var module = angular.module('users');
	module.factory('AuthService', authServiceFunction);

})();



(function () {

	// var module =  angular.module(ApplicationConfiguration.applicationModuleName);
	var module = angular.module('users');
	module.service('Session', function () {
		this.create = function (sessionId, username, userRole) {
			this.id = sessionId;
			this.username = username;
			this.userRole = userRole;
		};
		this.destroy = function () {
			this.id = null;
			this.username = null;
			this.userRole = null;
		};
	});

})();