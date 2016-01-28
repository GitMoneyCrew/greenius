var landingPage = angular.module('landingPage',[]);
landingPage.controller('landingPageController', ['$http', 'auth', 'store', '$location', function($http, auth, store, $location){
	var that = this;
  // Initializes Variables
  // ----------------------------------------------------------------------------
  that.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0

  // Set initial coordinates to the center of the US
  that.formData.latitude = 39.500;
  that.formData.longitude = -98.350;

  that.login = function(){
    auth.signin({}, function(profile, token) {
      //success callback
      store.set('profile', profile);
      store.set('token', token);
      console.log('LANDING PAGE PROFILE', profile, 'LANDING PAGE TOKEN', token);
      // TODO make sure user is in DB == look up exactly what store.set does and $location.path
      $location.path('/navbar/dashboard');
    }, function() {
      console.log('THIS IS AUTHCONTROLLER GOOGLE ERROR', error)
    });
  };

  that.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
  };

  function UserInfoCtrl(that, auth) {
    that.auth = auth;
  };

  that.deleteUser = function() {
    var deleteData = {usernameDelete: that.formData.usernameDelete};
    Users.deleteUser(deleteData);
  };

  // Creates a new user based on the form fields
  that.createUser = function(){
    // Grabs all of the text box fields
    var userData = {
        username: that.formData.username,
        password: that.formData.password,
        email: that.formData.email,
        location: [that.formData.longitude, that.formData.latitude],
        userPic: that.formData.userPic,
        // htmlverified: that.formData.htmlverified,
    };
    Users.addUser(userData);
    // Once complete, clear the form (except location)
    that.formData.username = '';
    that.formData.password = '';
    that.formData.email = '';
    that.formData.userPic = '';
  };


}]);
