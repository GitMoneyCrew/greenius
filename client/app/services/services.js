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

  var getUser = function(userObj){
      return $http({
        method: 'POST',
        url: 'api/users/getUser',
        data: userObj
      }).then(function(response){
        return response;
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
    getUser: getUser,
    deleteUser: deleteUser
  };

}]);