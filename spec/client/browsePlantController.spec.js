"use strict";

// run test in command line with: $gulp tdd
describe('browsePlantController', function() {
	var $scope;
	var Plants;
	var $state;
	var $window;
	var $httpBackend;
	var ctrl;
	var $controller;

	beforeEach(module('greeniusApp'));
	beforeEach(inject(function($injector, $rootScope) {

		$scope = $rootScope.$new();
		Plants = $injector.get('Plants');
		$state = $injector.get('$state');
		$window = $injector.get('$window');
		$httpBackend = $injector.get('$httpBackend');

		$controller = $injector.get('$controller');

		ctrl = $controller('browsePlantController', {
		  $scope: $scope,
		  Plants: Plants,
		  $state: $state,
		  $window: $window
		});

	}));

	it('contains spec with an expectation', function() {
		expect(true).toBe(true);
	});

	it('data should be a property on the scope', function() {
		expect(ctrl.data).toBeDefined();
	});

	// it('data.specieResults should be a property on the scope', function() {
	// 	expect(ctrl.data.specieResults).toBeDefined();
	// });

	it('data.nickname should be a property on the scope', function() {
		expect(ctrl.data.nickname).toBeDefined();
	});

	it('data.username should be a property on the scope', function() {
		expect(ctrl.data.username).toBeDefined();
	});

	it('data.botanicalName should be a property on the scope', function() {
		expect(ctrl.data.botanicalName).toBeDefined();
	});

	it('data.gardenName should be a property on the scope', function() {
		expect(ctrl.data.gardenName).toBeDefined();
	});

	it('data.plantArray should be a property on the scope', function() {
		expect(ctrl.data.plantArray).toBeDefined();
	});

	it('addedPlants should be a property on the scope', function() {
		expect(ctrl.addedPlants).toBeDefined();
	});

	it('usersGardenArray should be a property on the scope', function() {
		expect(ctrl.usersGardenArray).toBeDefined();
	});

	it('plantInfoPrompts should be a property on the scope', function() {
		expect(ctrl.plantInfoPrompts).toBeDefined();
	});

	it('gardenPrompt should be a property on the scope', function() {
		expect(ctrl.gardenPrompt).toBeDefined();
	});

	it('showModal should be a property on the scope', function() {
		expect(ctrl.showModal).toBeDefined();
	});

	it('tracker should be a property on the scope', function() {
		expect(ctrl.tracker).toBeDefined();
	});

});