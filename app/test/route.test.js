'use strict';

describe('myApp module', function() {

  var route;
  beforeEach(module('myApp'));
  beforeEach(inject(function($route){
    route = $route;
  }));


  describe('app route functions', function(){

    it('should ....', inject(function() {
      expect(route.routes['/authentication'].controller).toBe('authenticationController');
      expect(route.routes['/authentication'].templateUrl).
        toEqual('authentication/authentication.login.html');

      expect(route.routes['/logged'].templateUrl).
        toEqual('logged/logged.html');

    }));

  });
});