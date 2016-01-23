var services = angular.module('services', []);
services.factory('Plants', ['$http', function($http){

  var addPlant = function(plant) {
    return $http({
      method: 'POST',
      url: '/api/plants/addPlants',
      data: plant
    }).then(function(response) {
        console.log(response, 'SUCCESS ADDPLANT PLANTS FACTORY');
    }).catch(function(error) {
        console.log(error, 'ERROR IN ADDPLANT FACTORY');
    });
  };

  var addGarden = function(garden) {
    return $http({
      method: 'POST',
      url: '/api/plants/addGarden',
      data: garden
    }).then(function(response) {
        console.log(response, 'SUCCESS ADDGARDEN PLANTS FACTORY');
    }).catch(function(error) {
        console.log(error, 'ERROR IN ADDGARDEN FACTORY');
    });
  };

  var getUsersPlants = function(user){
    return $http({
      method: 'POST',
      url: '/api/plants/loadPlants',
      data: user
    }).then(function(response) {
        console.log(response, 'SUCCESS GETUSERSPLANTS PLANTS FACTORY');
        return response;
    }).catch(function(error) {
        console.log(error, 'ERROR IN GETUSERSPLANTS FACTORY');
    });
  };

  var getSpecieInfo = function (plant){
    return $http({
      method: 'POST',
      url: '/api/plants/loadSpecieInfo',
      data: plant
    }).then(function(response) {
        console.log(response.data,'SUCCESS GETSPECIEINFO PLANTS FACTORY');
        return response.data; //TODO: find what we need on the response.data
    }).catch(function(error) {
        console.log(error, 'ERROR IN GETSPECIEINFO FACTORY');
    });
  };

  var getPlant = function (plant) {
    return $http({
      method: 'POST',
      url: '/api/plants/loadPlantInfo',
      data: plant
    }).then(function(response) {
        console.log(response, 'SUCCESS GETPLANT PLANTS FACTORY');
        return response; //TODO: find what we need on the response.data
    }).catch(function(error) {
        console.log(error, 'ERROR IN GETPLANT PLANTS FACTORY');
    });
  };

  var getUserGardens = function(user) {
    return $http({
      method: 'POST',
      url: '/api/plants/loadUserGardens',
      data: user
    }).then(function(response) {
      console.log(response.data, 'SUCCESS GETUSERGARDENS PLANTS FACTORY');
      return response.data; //TODO: find what we need on the response.data
    }).catch(function(error) {
        console.log(error, 'ERROR IN GETPLANT PLANTS FACTORY');
    });
  };

  var getGardenPlants = function(garden) {
    return $http({
      method: 'POST',
      url: '/api/plants/loadGardenPlants',
      data: garden
    }).then(function(response) {
        console.log(response, 'SUCCESS GETGARDENPLANTS PLANTS FACTORY');
        return response.data; //TODO: find what we need on the response.data
    }).catch(function(error) {
        console.log(error, 'ERROR IN GETGARDENPLANTS PLANTS FACTORY');
    });
  };

  var getSpecieById = function (id){
    return $http({
      method: 'POST',
      url: '/api/plants/loadSpecieInfoById',
      data: id
    }).then(function(response) {
        console.log(response, 'SUCCESS IN GETSPECIEBYID PLANTS FACTORY');
        return response;
    }).catch(function(error) {
        console.log(error, 'ERROR IN GETSPECIEBYID PLANTS FACTORY');
    });
  };

  return {
    addPlant: addPlant,
    addGarden: addGarden,
    getUsersPlants: getUsersPlants,
    getSpecieInfo: getSpecieInfo,
    getPlant: getPlant,
    getUserGardens: getUserGardens,
    getGardenPlants: getGardenPlants,
    getSpecieById: getSpecieById
  };

}]);

services.factory('Users', ['$http', function($http){

  var addUser = function(userObj) {
    return $http({
      method: 'POST',
      url: '/api/users/addUser',
      data: userObj
    }).then(function(response) {
      console.log('services.js SUCCESSFUL POST FOR ADDUSER');
      return response.config.data;
    }).catch(function(error) {
      console.log('ERROR FOR ADDUSER', error);
    });
  };

  return {
    addUser: addUser
  };

}]);

//populate once we have our cookie (and once our cookies are figured out)
//this will make it easy to remember info about the user, so you can just pass around this factory
services.factory('ProfileInfo', ['$http', function($http){
  var profile = {
    // Below is for MVP testing purposes
    username: 'Robert',
    password: 'SWISS',
    email: 'robertstuartcardiff@gmail.com',
    location: '',
    userPic: 'http://facebookcraze.com/wp-content/uploads/2009/12/funny_profile_pic_for_facebook_rape.jpg',
    createdAt: '',
    updatedAt: '',
    gardenName: 'Eden',
    plantDate: ''

    // Real one to populate
    // username: undefined,
    // gardenName: undefined
    // TODO: FINISH THIS
  };

  var getProfile = function() {
    // TODO: FINISH THIS
    return profile;
  };

  var setProfile = function(key, value) {
    profile[key] = value;
    return profile;
    // TODO: FINISH THIS
  };

  return{
    getProfile: getProfile,
    setProfile: setProfile,
  // Below is for MVP testing purposes
    profile: profile
  };

}]);
