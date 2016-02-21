(function () {

	// var module =  angular.module(ApplicationConfiguration.applicationModuleName);
	var module = angular.module('navigation');
	
	module.directive('menuLink', ['$timeout', function ($timeout) {
		return {
			scope: {
				section: '='
			},
			templateUrl: 'modules/navigation/views/menu-link.tmpl.html',
			link: function($scope, $element) {
				var controller = $element.parent().controller();
		
				$scope.focusSection = function() {
					// set flag to be used later when
					// $locationChangeSuccess calls openPage()
					controller.autoFocusContent = true;
				};
			}
		};
	}])
	
})();