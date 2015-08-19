'use strict';

angular.module('states', ['ui.router'])
.config(function ($urlRouterProvider, $stateProvider) {
	// if the path doesn't match any of the urls you configured
	// otherwise will take care of routing the user to the specified url
	$urlRouterProvider
	.otherwise('/');
	
	$stateProvider
	.state('root', {
		url : '/',
		templateUrl: 'directives/login.html',
		controller: 'LoginCtrl',
	})
	.state('inapp', {
		abstract: true,	   	
		templateUrl: 'inapp.html',
		controller: 'InappCtrl',
		resolve: {
			currentUser: function ($rootScope, AuthService, TableService) {
				AuthService.login().then(function (user) {
					if (user) {
						$rootScope.currentUser = user;
						  // Launch table initialization
						TableService.initializeTableWithDatas(100);
					} else {
						deferred.reject('user-not-logged-in');
					}
				});
			}
		}
	})
	.state('inapp.loadData', {
		url : '/',
		views: {
			'loader': {
				templateUrl: 'inapp.loader.html',
			}
		}
	})
	.state('inapp.displayData', {
		url : '/dashboard',
		views: { 
			"table": {
				templateUrl: 'directives/table.html', 
				controller: 'TableCtrl'
			},
			"pagination": {
				templateUrl: 'directives/pagination.html', 
				controller: 'PaginationCtrl'
			},
			"searchBar": {
				templateUrl: 'directives/search.html', 
				controller: 'SearchCtrl'
			},
			"filters": {
				templateUrl: 'directives/filters.html', 
				controller: 'FiltersCtrl'
			}
		}
	});
});