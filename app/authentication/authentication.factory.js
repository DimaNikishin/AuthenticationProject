(function(){
  'use strict';

  /**
   * @memberof myApp.authentication
   * @ngdoc factory
   * @name authenticationService
   * @description myApp.authentication module's factory which return object with POST request to server
   * @dependency $http service
   */

  angular
    .module('myApp.authentication')
    .factory('authenticationService',authenticationService);

  authenticationService.$inject = ['$http'];

  function authenticationService($http){
    var service = {
      login : login
    }

    return service;

    function login(data){
      return $http.post("https://93.183.203.13:10443/login", data);
    }
  }
})();