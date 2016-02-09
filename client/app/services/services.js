var services = angular.module('services', []);
services.factory('Plants', ['$http', function($http) {

  var deletePlant = function(plant) {
    return $http({
      method: 'POST',
      url: '/api/plants/deletePlant',
      data: plant
    }).then(function(response) {
      return response;
    }).catch(function(error) {
      console.log(error);
    });
  };

  var deleteGarden = function(garden) {
    return $http({
      method: 'POST',
      url: '/api/plants/deleteGarden',
      data: garden
    }).then(function(response) {
      return response;
    }).catch(function(error) {
      console.log(error);
    });
  };

  var addPlant = function(plant) {
    return $http({
      method: 'POST',
      url: '/api/plants/addPlants',
      data: plant
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        console.log(error);
    });
  };

  var addGarden = function(garden) {
    return $http({
      method: 'POST',
      url: '/api/plants/addGarden',
      data: garden
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        console.log(error);
    });
  };

  var addGardenToPlant = function(plant, garden) {
    var data = {plant: plant, garden: garden }
    return $http({
      method: 'POST',
      url: '/api/plants/addGardenToPlant',
      data: data
    }).then(function(response) {
    }).catch(function(error) {
      console.log(error);
    });
  };

  var getUsersPlants = function(user) {
    return $http({
      method: 'POST',
      url: '/api/plants/loadPlants',
      data: user
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        console.log(error);
    });
  };

  var getSpecieInfo = function(plant) {
    return $http({
      method: 'POST',
      url: '/api/plants/loadSpecieInfo',
      data: plant
    }).then(function(response) {
        return response.data;
    }).catch(function(error) {
        console.log(error);
    });
  };

  var getPlant = function (plant) {
    return $http({
      method: 'POST',
      url: '/api/plants/loadPlantInfo',
      data: plant
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        console.log(error);
    });
  };

  var getUserGardens = function(user) {
    return $http({
      method: 'POST',
      url: '/api/plants/loadUserGardens',
      data: user
    }).then(function(response) {
      return response.data;
    }).catch(function(error) {
        console.log(error);
    });
  };

  var getGardenPlants = function(garden) {
    return $http({
      method: 'POST',
      url: '/api/plants/loadGardenPlants',
      data: garden
    }).then(function(response) {
        return response.data;
    }).catch(function(error) {
        console.log(error);
    });
  };

  var getSpecieById = function(id) {
    return $http({
      method: 'POST',
      url: '/api/plants/loadSpecieInfoById',
      data: id
    }).then(function(response) {
        return response;
    }).catch(function(error) {
        console.log(error);
    });
  };

  var getPlantById = function (plant) {
    return $http({
      method: 'POST',
      url: '/api/plants/loadPlantById',
      data: plant
    }).then(function(response) {
      return response;
    }).catch(function (error) {
      console.log(error);
    })
  }

  return {
    addPlant: addPlant,
    addGarden: addGarden,
    addGardenToPlant: addGardenToPlant,
    getUsersPlants: getUsersPlants,
    getSpecieInfo: getSpecieInfo,
    getPlantById: getPlantById,
    getPlant: getPlant,
    getUserGardens: getUserGardens,
    getGardenPlants: getGardenPlants,
    getSpecieById: getSpecieById,
    deletePlant: deletePlant,
    deleteGarden: deleteGarden
  };

}]);

services.factory('Users', ['$http', function($http){

  var addUser = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/addUser',
      data: user
    }).then(function(response) {
      return response.config.data;
    }).catch(function(error) {
      console.log(error);
    });
  };

  var getUser = function(user) {
      return $http({
        method: 'POST',
        url: 'api/users/getUser',
        data: user
      }).then(function(response) {
        return response;
      }).catch(function(error) {
        console.log(error);
      });
    };


 var deleteUser = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/deleteUser',
      data: user
    }).then(function(response) {
      return response.config.data;
    }).catch(function(error) {
      console.log(error);
    });
  };

  return {
    addUser: addUser,
    getUser: getUser,
    deleteUser: deleteUser
  };

}]);

services.factory('Events', ['$http', function($http) {

  var addPlantEvent = function(plantEvent) {
    return $http({
      method: 'POST',
      url: '/api/events/addPlantEvent',
      data: plantEvent
    }).then(function(response) {
      return response;
    }).catch(function(error) {
      console.log(error);
    });
  };

  var getPlantEvent = function(plantEvent) {
    return $http({
      method: 'POST',
      url: '/api/events/getPlantEvent',
      data: plantEvent
    }).then(function(response) {
      return response;
    }).catch(function(error) {
      console.log(error);
    });
  };

  var getUserEvents = function(user) {
    return $http({
      method: 'POST',
      url: '/api/events/getUserEvents',
      data: user
    }).then(function(response) {
      return response;
    }).catch(function(error) {
      console.log(error);
    });
  };

  var sendPlantMail = function(plantEvent) {
    return $http({
      method: 'POST',
      url: '/api/events/sendPlantMail',
      data: plantEvent
    }).then(function(response) {
      return response;
    }).catch(function(error) {
      console.log(error);
    });
  };

  var removePlantEvent = function(plantEvent) {
    return $http({
      method: 'POST',
      url: '/api/events/removePlantEvent',
      data: plantEvent
    }).then(function(response) {
      return response;
    }).catch(function(error) {
      console.log(error);
    });
  };

  var removeAllPlantEvents = function(plantEvent) {
    return $http({
      method: 'POST',
      url: '/api/events/removeAllPlantEvents',
      data: plantEvent
    }).then(function(response) {
    }).catch(function(error) {
      console.log(error);
    })
  }

  return{
    addPlantEvent: addPlantEvent,
    getPlantEvent: getPlantEvent,
    getUserEvents: getUserEvents,
    sendPlantMail: sendPlantMail,
    removePlantEvent: removePlantEvent,
    removeAllPlantEvents : removeAllPlantEvents
  };
}]);
