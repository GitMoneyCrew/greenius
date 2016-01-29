var services = angular.module('services', []);
services.factory('Plants', ['$http', function($http){

  var deletePlant = function(plant){
    return $http({
      method: 'POST',
      url: '/api/plants/deletePlant',
      data: plant
    }).then(function(response){
      return response;
    }).catch(function(error){
      console.log(error);
    });
  };

  var deleteGarden = function(garden){
    return $http({
      method: 'POST',
      url: '/api/plants/deleteGarden',
      data: garden
    }).then(function(response){
      return response;
    }).catch(function(error){
      console.log(error);
    });
  };

  var addPlant = function(plant){
    return $http({
      method: 'POST',
      url: '/api/plants/addPlants',
      data: plant
    }).then(function(response){
        return response;
    }).catch(function(error){
        console.log(error);
    });
  };

  var addGarden = function(garden){
    return $http({
      method: 'POST',
      url: '/api/plants/addGarden',
      data: garden
    }).then(function(response){
        return response;
    }).catch(function(error){
        console.log(error);
    });
  };

  var getUsersPlants = function(user){
    return $http({
      method: 'POST',
      url: '/api/plants/loadPlants',
      data: user
    }).then(function(response){
        return response;
    }).catch(function(error){
        console.log(error);
    });
  };

  var getSpecieInfo = function(plant){
    return $http({
      method: 'POST',
      url: '/api/plants/loadSpecieInfo',
      data: plant
    }).then(function(response){
        return response.data;
    }).catch(function(error){
        console.log(error);
    });
  };

  var getPlant = function (plant){
    return $http({
      method: 'POST',
      url: '/api/plants/loadPlantInfo',
      data: plant
    }).then(function(response){
        return response;
    }).catch(function(error){
        console.log(error);
    });
  };

  var getUserGardens = function(user){
    return $http({
      method: 'POST',
      url: '/api/plants/loadUserGardens',
      data: user
    }).then(function(response){
      return response.data;
    }).catch(function(error){
        console.log(error);
    });
  };

  var getGardenPlants = function(garden){
    return $http({
      method: 'POST',
      url: '/api/plants/loadGardenPlants',
      data: garden
    }).then(function(response){
        return response.data;
    }).catch(function(error){
        console.log(error);
    });
  };

  var getSpecieById = function (id){
    return $http({
      method: 'POST',
      url: '/api/plants/loadSpecieInfoById',
      data: id
    }).then(function(response){
        return response;
    }).catch(function(error){
        console.log(error);
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
    getSpecieById: getSpecieById,
    deletePlant: deletePlant,
    deleteGarden: deleteGarden
  };

}]);

services.factory('Users', ['$http', function($http){

  var addUser = function(userObj){
    return $http({
      method: 'POST',
      url: '/api/users/addUser',
      data: userObj
    }).then(function(response){
      return response.config.data;
    }).catch(function(error){
      console.log(error);
    });
  };

 var deleteUser = function(userObj){
    return $http({
      method: 'POST',
      url: '/api/users/deleteUser',
      data: userObj
    }).then(function(response){
      return response.config.data;
    }).catch(function(error){
      console.log(error);
    });
  };

  return {
    addUser: addUser,
    deleteUser: deleteUser
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
