var auth = angular.module('auth', []);
auth.controller('authController', ['$scope', 'Users', 'auth', 'store', '$location', function($scope, Users, auth, store, $location){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    // Functions
    // ----------------------------------------------------------------------------
    // Creates a new user based on the form fields
    $scope.createUser = function(){

      // Grabs all of the text box fields
      var userData = {
          username: $scope.formData.username,
          password: $scope.formData.password,
          email: $scope.formData.email,
          location: [$scope.formData.longitude, $scope.formData.latitude],
          userPic: $scope.formData.userPic,
          // htmlverified: $scope.formData.htmlverified,
      };
      
      Users.addUser(userData);
      
      // Once complete, clear the form (except location)
      $scope.formData.username = '';
      $scope.formData.password = '';
      $scope.formData.email = '';
      $scope.formData.userPic = '';

    };


    $scope.login = function () {
      auth.signin({}, function (profile, token) {
        console.log('THIS IS AUTHCONTROLLER GOOGLE LOGIN', profile);
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/');
      }, function (error) {
        console.log('THIS IS AUTHCONTROLLER GOOGLE ERROR', error);
        });
    };

    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
    };

    function UserInfoCtrl($scope, auth) {
      $scope.auth = auth;
    }

}]);