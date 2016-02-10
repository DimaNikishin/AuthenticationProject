'use strict';

describe('myApp.index controller', function() {

  var authenticationCtrl;
  var scope;
  var authenticationService;
  var httpBackend;

  beforeEach(module('myApp.authentication'));

  beforeEach(inject(function(_authenticationService_) {
    authenticationService = _authenticationService_;
  }));

  beforeEach(inject(function($controller, $rootScope, $httpBackend){
    scope = $rootScope.$new();
    authenticationCtrl = $controller('authenticationController as authentication', {$scope:scope, authenticationService:authenticationService});
    httpBackend = $httpBackend;
  }));

  describe('authentication controller', function(){

    it('should not be undefined', inject(function() {
      expect(authenticationCtrl).toBeDefined();
    }));

  });

  describe('authentication controller', function(){

    it('Activate function should setup HTML Markup', inject(function() {
      expect(scope.authentication.markup.FirstSubmitStepInput).toBe(false);
      expect(scope.authentication.markup.SecondSubmitStepInput).toBe(true);
      expect(scope.authentication.markup.AdditionalBlock).toBe(false);
    }));

  });

  describe('authentication controller Login function' , function(){

    it('Authentication is denied', inject(function() {
      var returnData = { "Auth": "Denied" };
      httpBackend.when('POST', 'https://93.183.203.13:10443/login').respond(returnData);

      scope.authentication.Login();
      httpBackend.flush();

      expect(scope.authentication.markup.FirstSubmitStepInput).toBe(false);
      expect(scope.authentication.markup.SecondSubmitStepInput).toBe(true);
      expect(scope.authentication.markup.AdditionalBlock).toBe(true);
      expect(scope.authentication.resultClass).toEqual('failed-login');

    }));

  });

  describe('authentication controller Login function' , function(){

    it('Authentication is accepted', inject(function($location) {
      var returnData = { "Auth": "Logged","Theme": "Simple","Language": "EN" };
      httpBackend.when('POST', 'https://93.183.203.13:10443/login').respond(returnData);

      scope.authentication.Login();
      httpBackend.flush();

      expect($location.path()).toBe('/logged');
    }));

  });

  describe('authentication controller Login function' , function(){

    it('Authentication is banned', inject(function($timeout) {
      var returnData = { "Auth": "Banned","Time": 300 };
      httpBackend.when('POST', 'https://93.183.203.13:10443/login').respond(returnData);

      scope.authentication.Login();
      httpBackend.flush();

      expect(scope.authentication.banned).toBe(true);
      $timeout.flush();
      expect(scope.authentication.banned).toBe(false);
    }));

  });

  describe('authentication controller Login function' , function(){

    it('HOTP code is required for authentication', inject(function() {
      var returnData = { "Auth": "HOTP required" };
      httpBackend.when('POST', 'https://93.183.203.13:10443/login').respond(returnData);

      scope.authentication.Login();
      httpBackend.flush();

      expect(scope.authentication.markup.FirstSubmitStepInput).toBe(true);
      expect(scope.authentication.markup.SecondSubmitStepInput).toBe(false);
      expect(scope.authentication.markup.AdditionalBlock).toBe(true);
    }));

  });

  describe('authentication controller SecondLoginStep function' , function(){

    it('Authentication is denied, HOTP wrong code', inject(function($location) {
      var returnData = {  "Auth": "HOTP wrong code" };
      httpBackend.when('POST', 'https://93.183.203.13:10443/login').respond(returnData);

      scope.authentication.SecondLoginStep();
      httpBackend.flush();

      expect($location.path()).toBe('/authentication');
    }));

  });

  describe('authentication controller SecondLoginStep function' , function(){

    it('Authentication is accepted, HOTP code is correct', inject(function($location) {
      var returnData = { "Auth": "Logged","Theme": "Simple","Language": "EN" };
      httpBackend.when('POST', 'https://93.183.203.13:10443/login').respond(returnData);

      scope.authentication.SecondLoginStep();
      httpBackend.flush();

      expect($location.path()).toBe('/logged');
    }));

  });

});