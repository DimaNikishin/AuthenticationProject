(function(){
  'use strict';

  /**
   * @memberof myApp.authentication
   * @ngdoc factory
   * @name authenticationService
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
      $http.post("https://93.183.203.13:10443/login", data).success(function(data, status) {
        console.log(data);
        console.log(111);
      })
    }
  }
})();