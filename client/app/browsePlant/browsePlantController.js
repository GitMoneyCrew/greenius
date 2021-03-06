var browsePlant = angular.module('browsePlant', []);
browsePlant.controller('browsePlantController', ['Plants', '$state', '$window', function(Plants, $state, $window) {
  var that = this;
  that.data = {};
    that.data.specieResults;
    that.data.nickname = '';
    that.data.username = $window.localStorage.getItem('username');
    that.data.commonName = 'Sunflowers';
    that.data.botanicalName = 'Helianthus';
    that.data.gardenName = '';
    that.data.plantArray = [];
    that.addedPlants = [];
    that.usersGardenArray = [];
    that.plantInfoPrompts = false;
    that.gardenPrompt = false;
    that.showModal = false;
    that.tracker = false;

    that.plants = ['Jade', 'Peaches', 'Radishes', 'Shasta Daisies', 'Daffodils', 'Thyme', 'Coriander and Cilantro', 'Crocuses', 'Brussels Sprouts',
                    'Dill', 'Beans', 'Cabbage', 'Tomatoes', 'Grapes', 'Carrots', 'Corn', 'Sweet Peas', 'Lilies', 'Aster', 'Watermelon', 'Blueberries', 'Rosemary', 'Bell Peppers', 'Chives',
                    'Veronica', 'Tulips', 'Lettuce', 'Rhododendrons', 'Turnips', 'African Violets', 'Cannas', 'Sage', 'Cucumbers', 'Peace Lily', 'Zinnias', 'Plums', 'Marigolds',
                    'Jasmine', 'Geraniums', 'Chard', 'Peas', 'Onions', 'Irises', 'Ponytail Palm', 'Cosmos', 'Wandering Jew', 'Strawberries', 'Tarragon', 'Nasturtium',
                    'Phlox', 'Potatoes', 'Wisteria', 'Spider Plants', 'Yarrow', 'Astilbe', 'Kale', 'Peonies', 'Beets', 'Pansies', 'Mint', 'Lemons & Oranges', 'Parsley', 'Celery', 'Basil', 'Cherries', 'Rhubarb', 'Hydrangea', 'Figs', 'Sunflowers', 'Blackberries', 'Pears', 'Christmas Cactus',
                    'Black-eyed Susans', 'Okra', 'Dahlias', 'Parsnips', 'Aloe Vera', 'Sedum', 'Impatiens', 'Broccoli', 'Cauliflower', 'Asparagus', 'Petunias','Sweet Potato', 'Spinach',
                    'Gladiolus', 'Butterfly Bush', 'Oregano', 'Eggplant', 'Roses', 'Raspberries', 'Morning Glories', 'Delphiniums', 'Coneflowers', 'Apples', 'Garlic', 'Pumpkins', 'Hyacinths', 'Squash & Zucchini'];

    that.goToPlant = function(name) {
      $state.go('navbar.plantProfile', {nickname: name});
    };

    that.getExistingGardens = function() {
      var gardenArray = [];
        Plants.getUserGardens(that.data)
          .then(function(results){
            for(var j = 0; j< results.length; j++) {
              var garden = results[j].gardenName;
              if(gardenArray.indexOf(garden) === -1) {
                gardenArray.push(garden);
              }
            }
            that.usersGardenArray = gardenArray;
          })
          .catch(function(error) {
            console.log(error);
          });
    };
    that.getExistingGardens();

    var changeToPlantProfile = function(name) {
      $state.go('navbar.plantProfile', {nickname: name});
    };

    that.goToPlant = function(name) {
      that.data.nickname = name;
      changeToPlantProfile(that.data.nickname);
    };

    that.changeCommonName = function(plant) {
      that.data.commonName = plant;
      that.browse();
    }

    that.browse = function() {
      if(that.data.commonName) {
        Plants.getSpecieInfo(that.data)
          .then(function(data) {
            that.data.commonName = data.commonName;
            that.data.botanicalName = data.botanicalName;
            that.data.plantPic = data.plantPic;
            that.userWantsToAddPlant();
          })
          .catch(function(error) {
            console.log(error);
            alert('Plant not found');
          });
       }
    };

    that.userWantsToAddPlant = function() {
      that.promptToAddPlant = !(that.promptToAddPlant);
    };

    that.userChoseGarden = function() {
      that.gardenPrompt = !(that.gardenPrompt);
    };

    that.specificPlantInfoPrompts = function() {
      that.plantInfoPrompts = !(that.plantInfoPrompts);
    };

    that.plantsInGardenTracker = function() {
      that.tracker = true;
    };

    that.selectGarden = function() {
      if(that.data.gardenName) {
        if(that.data.usersGarden !== that.data.gardenName) {
          Plants.addGarden(that.data)
            .then(function(results) {
              that.getGardenPlants();
            })
            .catch(function(error) {
              console.log(error);
            });
          }
        that.specificPlantInfoPrompts();
       }
    };

    that.addPlant = function() {
      if(that.data.nickname) {
        Plants.addPlant(that.data)
          .then(function(results) {
            that.specificPlantInfoPrompts();
            that.userChoseGarden();
            that.userWantsToAddPlant();
            that.getExistingGardens();
            that.addedPlants.push({nickname: that.data.nickname, commonName: that.data.commonName});
          })
          .catch(function(error) {
            console.log(error);
          });
      } else{
        alert('You must enter a plant name.');
      }
    };

    that.changeCommonName(that.data.commonName);

}]);
