var main = angular.module('greeniusApp',
	['auth0', 
	'angular-storage', 
	'angular-jwt',
	'browsePlant',
	'auth',
	'dashboard',
	'myPlants',
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
	$urlRouterProvider.otherwise('dashboard');

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
		.state('logout', {
			url: '/logout',
			views: {
				'indexPage': {
					templateUrl: './app/auth/signupView.html',
					controller: 'authController'
				}
			}
		})
		.state('browsePlant', {
			url: '/browseplant',
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
			url: '/myplants',
			views: {
				'indexPage': {
					templateUrl: './app/myPlants/myPlantsView.html',
					controller: 'myPlantsController'
				}
			}
		})
		.state('plantProfile', {
			url: '/plantprofile/:nickname',
			views: {
				'indexPage': {
					templateUrl: './app/plantProfile/plantProfileView.html',
					controller: 'plantProfileController'
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
