var landingPage = angular.module('landingPage', []);
landingPage.controller('landingPageController', ['$http', 'auth', 'store', '$location', 'Users', '$window', function($http, auth, store, $location, Users, $window) {
	var that = this;
  that.data = {};

  that.login = function(){
      auth.signin({
        authParams: {
          scope: 'openid offline_access'
        },
        connections : ['google-oauth2'],
        icon: 'http://s8.postimg.org/pmmaghi29/leaf.png'
      }, function(profile, token, refresh_token, access_token) {
        store.set('profile', profile);
        store.set('token', token);
        store.set('refresh_token', refresh_token);
        store.set('access_token', access_token);
        that.data.email = profile.email;
        that.data.username = profile.name;
        that.data.userPic = profile.picture;
        that.data.createdAt = profile.created_at;
        $window.localStorage.setItem('email', profile.email);

        Users.getUser(that.data)
        .then(function(results) {
          if(results === undefined) {
            Users.addUser(that.data)
              .then(function(results) {
                $window.localStorage.setItem('username', results.username);
                $location.path('/navbar/dashboard');
              })
              .catch(function(error) {
                console.log(error);
              })
          }else {
            $window.localStorage.setItem('username', results.data.username);
            $location.path('/navbar/dashboard');
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      }, function() {
        //error callback
      });
    };

  that.deleteUser = function() {
    var user = {};
    user.username = $window.localStorage.getItem('username');
    Users.deleteUser(user)
      .then(function(results) {
        store.remove('refresh_token');
        store.remove('access_token');
        store.remove('profile');
        store.remove('token');
          $location.path('/landingPage');
      })
      .catch(function(error) {
        console.log('error in dlete user ')
      })

  }
  that.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    store.remove('refresh_token');
    store.remove('access_token');
  };

  function UserInfoCtrl(that, auth) {
    that.auth = auth;
  };

}]);
