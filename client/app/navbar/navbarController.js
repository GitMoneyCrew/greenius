var navbar = angular.module('navbar', []);
navbar.controller('navbarController', ['Plants', 'auth', 'store', '$location', function(Plants, auth, store, $location){
	var that = this;
	that.userImage = auth.profile.picture;
	that.userName = auth.profile.given_name;
	that.isOpen = false;

  that.logout = function(){
    auth.signout();
    store.remove('profile');
    store.remove('token');
  };

  that.toggleSideBar = function() {
  	if(that.isOpen) {
  		that.isOpen = false;
  	} else {
  		this.isOpen = true;
  	}
  };

}]);
