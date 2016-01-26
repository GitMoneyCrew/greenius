var main = angular.module('greeniusApp',
	['auth0', 
	'angular-storage', 
	'angular-jwt',
	'landingPage',
	'navbar',
  'dndLists',
	'browsePlant',
	'auth',
	'dashboard',
	'myPlants',
  'myGarden',
	'plantProfile',
	'services',
	'ui.router']);

main.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
});

main.config(function (authProvider) {
  authProvider.init({
    domain: 'greenius.auth0.com',
    clientID: GOOGLE_API_KEY
  });
})
.run(function(auth) {
  auth.hookEvents();
});



// //jwt security

// main.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
//   // ...

//   // We're annotating this function so that the `store` is injected correctly when this file is minified
//   jwtInterceptorProvider.tokenGetter = ['store', function(store) {
//     // Return the saved token
//     return store.get('token');
//   }];

//   $httpProvider.interceptors.push('jwtInterceptor');
//   // ...
// });

main.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
	$urlRouterProvider.otherwise('landingPage');

	$stateProvider
		.state('landingPage', {
			url: '/landingPage',
			views: {
				'indexPage': {
					templateUrl: './app/landingPage/landingPageView.html',
					controller: 'landingPageController',
					controllerAs: 'ldp'
				}
			}
		})
		.state('login', {
			url: '/login',
			views: {
				'indexPage': {
					templateUrl: './app/auth/loginView.html',
					controller: 'authController',
					controllerAs: 'lgp'
				}
			}
		})
		.state('signup', {
			url: '/signup',
			views: {
				'indexPage': {
					templateUrl: './app/auth/signupView.html',
					controller: 'authController',
					controllerAs: 'sup'
				}
			}
		})
		.state('logout', {
			url: '/logout',
			views: {
				'indexPage': {
					templateUrl: './app/landingPage/landingPageView.html',
					controller: 'landingPageController',
					controllerAs: 'ltp'
				}
			}
		})
		.state('navbar', {
			url: '/navbar',
			views: {
				'indexPage': {
					templateUrl: './app/navbar/navbarView.html',
					controller: 'navbarController',
					controllerAs: 'nvp'
				}
			}
		})
		.state('navbar.dashboard', {
			url: '/dashboard',
			views: {
				'subView': {
					templateUrl: './app/dashboard/dashboardView.html',
					controller: 'dashboardController',
					controllerAs: 'dbp'
				}	
			}
		})
		.state('navbar.browsePlant', {
			url: '/browseplant',
			views: {
				'subView': {
					templateUrl: './app/browsePlant/browsePlantView.html',
					controller: 'browsePlantController',
					controllerAs: 'bpp'
				}	
			}
		})
		.state('navbar.myPlants', {
			url: '/myplants',
			views: {
				'subView': {
					templateUrl: './app/myPlants/myPlantsView.html',
					controller: 'myPlantsController',
					controllerAs: 'mpp'
				}	
			}
		})
    .state('navbar.myGarden', {
      url: '/mygarden',
      views: {
				'subView': {      	
          templateUrl: './app/myGarden/myGardenView.html',
          controller: 'myGardenController',
          controllerAs: 'mgp'
        }  
      }
    })
		.state('navbar.plantProfile', {
			url: '/plantprofile/:nickname',
			views: {
				'subView': {				
					templateUrl: './app/plantProfile/plantProfileView.html',
					controller: 'plantProfileController',
					controllerAs: 'ppp'
				}	
			}
		});

}]);


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
