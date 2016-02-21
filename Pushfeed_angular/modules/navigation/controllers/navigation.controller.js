(function() {
	'use strict';

	angular.module('navigation')
	// angular.module(ApplicationConfiguration.applicationModuleName)
// 	.controller('navigationCtrl', ['$scope', 'AuthService', '$state', '$log', function($scope, AuthService, $state, $log) {

//     	 $scope.signout = function(){
//     		AuthService.signout().then(
//     		 function signoutSuccess(res) {
//     			$state.go('signin')
//     		},
//     		function signoutError (res) {
//     			$log.error('failed-signout', res)
//     		});
//     	}			
    
//     }])
    .controller('HomeCtrl', ['$rootScope', '$log', '$state', '$timeout', '$location', 'menu', function($rootScope, $log, $state, $timeout, $location, menu){
        var vm = this;
        // var aboutMeArr = ['Family', 'Location', 'Lifestyle'];
        // var budgetArr = ['Housing', 'LivingExpenses', 'Healthcare', 'Travel'];
        // var incomeArr = ['SocialSecurity', 'Savings', 'Pension', 'PartTimeJob'];
        // var advancedArr = ['Assumptions', 'BudgetGraph', 'AccountBalanceGraph', 'IncomeBalanceGraph'];

        //functions for menu-link and menu-toggle
        vm.isOpen = isOpen;
        vm.toggleOpen = toggleOpen;
        vm.autoFocusContent = false;
        vm.menu = menu;
    
        console.log(vm.menu.sections);

        vm.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        function isOpen(section) {
            console.log('isOpen');
            return menu.isSectionSelected(section);
        }

        function toggleOpen(section) {
            console.log('toggleOpen');
            menu.toggleSelectSection(section);
        }
    }])
    
    console.log('loaded HomeCtrl')

})();