
(function() {
	'use strict';

	angular.module('navigation')
		.constant('AUTH_EVENTS', {
			loginSuccess: 'auth-login-success',
			loginFailed: 'auth-login-failed',
			logoutSuccess: 'auth-logout-success',
			sessionTimeout: 'auth-session-timeout',
			notAuthenticated: 'auth-not-authenticated',
			notAuthorized: 'auth-not-authorized'
		})
		
 		.config(function ($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('red', {
					'default': '400', // by default use shade 400 from the pink palette for primary intentions
					'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
					'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
					'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
				})
				// If you specify less than all of the keys, it will inherit from the
				// default shades
				.accentPalette('purple', {
					'default': '200' // use shade 200 for default, and keep all other shades the same
				});
 		})
		
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

				.state('signin', {
					url: '/signin',
					
					views: {
					    'content':{
					    	templateUrl: '/modules/users/views/signin.view.html'
					    }
					},
					data: {
						requiresAuth : false
					}
				})
				.state('feed',{
					url: '/feed/:feedname',
					views: {
					    'content':{
					    	templateUrl: '/modules/userscontent/views/content.view.html'
					    }
					},
					data: {
						requiresAuth : false
					}
				})
				.state('tag',{
					url: '/tag/:tagname',
					views: {
					    'content':{
					    	templateUrl: '/modules/content/views/content.view.html'
					    }
					},
					data: {
						requiresAuth : false
					}
				})
				.state('mentions',{
					url: '/mentions/:mentionname',
					views: {
					    'content':{
					    	templateUrl: '/modules/content/views/content.view.html'
					    }
					},
					data: {
						requiresAuth : false
					}
				})
				.state('settings', {
					url: '/settings',
					templateUrl: '/public/modules/settings/views/settings.view.html',
					views: {
					    'content':{
					    	templateUrl: '/modules/content/views/content.view.html'
					    }
					},
					data: {
						requiresAuth : true
					}
				});
		})
		.run(function ($rootScope, AUTH_EVENTS, AuthService, $state) {
			// check if user is authenticated when state changes
			$rootScope.$on('$stateChangeStart', function (event, next) {
				console.log('$stateChangeStart to :', next);
				if (next.data.requiresAuth && !AuthService.isAuthenticated()) {
					event.preventDefault();

					// user is not logged in
					$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

					// redirect user
					$state.go('signin');
				}
			});

			// AuthService.loadUser().then(function () {
			// 	$state.go('feed/me');
			// }, function () {
			// 	$state.go('signin');
			// })

			// redirect user depending if they are sign in or not
			if(AuthService.isAuthenticated()){
				$state.go('feed/me');
			} else {
				$state.go('signin');
			}
		});

})();