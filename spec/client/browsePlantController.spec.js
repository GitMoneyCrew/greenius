// describe('browsePlantController', function() {
// 	var bpp, $rootScope, createController, $httpBackend, Plants, ProfileInfo;

	
// 	beforeEach( module ('greeniusApp'));
// 	// beforeEach( module ('auth0'));
// 	beforeEach(inject(function($injector) {

// 		$rootScope = $injector.get('$rootScope');
// 		$httpBackend = $injector.get('$httpBackend');
// 		Plants = $injector.get('Plants');
// 		ProfileInfo = $injector.get('ProfileInfo');

// 		bpp = $rootScope.$new();

// 		var $controller = $injector.get('$controller');

// 		createController = function() {
// 			return $controller('browsePlantController', {
// 				bpp: bpp,
// 				Plant: Plants,
// 				ProfileInfo: ProfileInfo
// 			});
// 		};

// 		var fakeData = [{},{},{},{}];
// 		$httpBackend.whenPOST('/api/plants/loadUserGardens').respond(fakeData);
// 		$httpBackend.whenPOST('/api/plants/').respond(fakeData); //TODO: Maybe unnecessary
// 		$httpBackend.whenGET('app/landingPage/landingPageView.html').respond(fakeData);

// 		createController();
// 		$httpBackend.flush();

// 	}));

// 	afterEach(function () {
//     $httpBackend.verifyNoOutstandingExpectation();
//     $httpBackend.verifyNoOutstandingRequest();
//   });

// 	describe('Factories in browsPlant', function() {
// 		it('should be a factory used by browsePlantController', function() {
// 			expect(Plants).toBeDefined();
// 		});
// 		it('should be a factory used by browsePlantController', function  () {
// 			expect(ProfileInfo).toBeDefined();
// 		});
// 	});

// });