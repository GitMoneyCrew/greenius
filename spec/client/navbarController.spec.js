"use strict";

// run test in command line wit: $gulp tdd
describe('navbarController', function () {
  var $scope;
  var auth;
  var store;
  var Plants;
  var $location;
  var $httpBackend;
  var ctrl
  var $controller;

  beforeEach(module('greeniusApp'));
  beforeEach(inject(function($injector, $rootScope) {

    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();
    auth = {isAuthenticated: true, config: Object, profilePromise: 'c', idToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJod…2MDd9.xbJbBPfqD_RFJG7Ww_8HGEEV-a-Q7xD06A7AHT8YVvI", profile: {given_name: "Robert", picture: "https://lh4.googleusercontent.com/-uQHhhzugsLQ/AAAAAAAAAAI/AAAAAAAAADI/496YQZIxfcs/photo.jpg"}}
    store = $injector.get('store');
    Plants = $injector.get('Plants');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');

    $controller = $injector.get('$controller');

    ctrl = $controller('navbarController', {
        $scope: $scope,
        auth: auth,
        store: store,
        Plants: Plants,
        $location: $location 
      });

  }));

  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

  it('userImage should be a property on the scope', function () {
    expect(ctrl.userImage).toBeDefined();
  });

  it('userName should be a property on the scope', function () {
    expect(ctrl.userName).toBeDefined();
  });

  it('isOpen should be a property on the scope', function () {
    expect(ctrl.isOpen).toBeDefined();
  });

});  
