(function(){
  'use strict';

  /**
   * @memberof myApp.authentication
   * @ngdoc config
   */

  angular
    .module('myApp.authentication')
    .config(authenticationConfig);

  authenticationConfig.$inject = ['$routeProvider'];

  function authenticationConfig($routeProvider) {
    $routeProvider.when('/authentication', {
      templateUrl: 'authentication/authentication.login.html',
      controller: 'authenticationController',
      controllerAs: 'authentication'
    });
  }
})();