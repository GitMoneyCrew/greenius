var navbar = angular.module('navbar', []);
navbar.controller('navbarController', ['Plants', 'ProfileInfo', 'auth', 'store', '$location', function(Plants, ProfileInfo, auth, store, $location){
	var that = this;
	that.userImage = auth.profile.picture;
	that.userName = auth.profile.given_name;

  that.logout = function(){
    auth.signout();
    store.remove('profile');
    store.remove('token');
  };
  
}]);
