(function(){
  'use strict';

  /**
   * @memberof myApp.authentication
   * @ngdoc config
   * @description Setup myApp.authentication module's route properties: templateUrl,controller,controllerAs, path
   * @dependency $routeProvider
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