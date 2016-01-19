var main = angular.module('greeniusApp',
	['browsePlant',
	'auth',
	'dashboard',
	'myPlants',
	'plantProfile',
	'services',
	'ui.router']);

main.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
	$urlRouterProvider.otherwise('/dashboard');

	$stateProvider
		.state('login', {
			url: '/login',
			views: {
				'indexPage': {
					templateUrl: './app/auth/loginView.html',
					controller: 'authController'
				}
			}
		})
		.state('signup', {
			url: '/signup',
			views: {
				'indexPage': {
					templateUrl: './app/auth/signupView.html',
					controller: 'authController'
				}
			}
		})
		.state('browsePlant', {
			url: '/browsePlant',
			views: {
				'indexPage': {
					templateUrl: './app/browsePlant/browsePlantView.html',
					controller: 'browsePlantController'
				}
			}
		})
		.state('dashboard', {
			url: '/dashboard',
			views: {
				'indexPage': {
					templateUrl: './app/dashboard/dashboardView.html',
					controller: 'dashboardController'
				}
			}
		})
		.state('myPlants', {
			url: '/myPlants',
			views: {
				'indexPage': {
					templateUrl: './app/myPlants/myPlantsView.html',
					controller: 'myPlantsController'
				}
			}
		})
		.state('plantProfile', {
			url: '/plantProfile/:commonname',
			views: {
				'indexPage': {
					templateUrl: './app/plantProfile/plantProfileView.html',
					controller: 'plantProfileController'
				}
			}
		})
}])
// .run(function($cookies){
//    $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
//      if(toState.name === 'myPlants' && toParams.username === undefined){
//        evt.preventDefault();
//        var username = $cookies.get('myUser');
//        if(username){
//          $state.go('myPLants', {username: username});
//        }else{
//          $state.go('login');
//        }
//
//      }
//    };
// })
