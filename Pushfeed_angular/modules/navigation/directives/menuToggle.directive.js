(function () {

	// var module =  angular.module(ApplicationConfiguration.applicationModuleName);
	var module = angular.module('navigation');
	
	module.directive('menuToggle', ['$timeout', function ($timeout) {
	    return {
	        scope: {
            		section: '='
            },
            templateUrl: 'modules/navigation/views/menu-toggle.tmpl.html',
            link: function($scope, $element) {
            		var controller = $element.parent().controller();
            		$scope.isOpen = function() {
            			return controller.isOpen($scope.section);
            	};
            	$scope.toggle = function() {
            			controller.toggleOpen($scope.section);
            	};
            }
	    }
	}])
	
})();