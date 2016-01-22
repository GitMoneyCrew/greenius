describe("browsePlantController", function() {
  beforeEach(module('browsePlant'))
  var $route;
  beforeEach(inject(function($route){ $route: $route })))

  it("should have a route pointing to it", function() {
    expect($route.routes['/browsePlant'].controller).toBe('browsePlantController');  });
});