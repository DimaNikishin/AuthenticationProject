(function(){
  'use strict';

  /**
   * @memberof myApp.authentication
   * @ngdoc config
   * @description Setup myApp.logged module's route properties: templateUrl, path
   * @dependency $routeProvider
   */

  angular
    .module('myApp.logged')
    .config(loggedConfig);

  loggedConfig.$inject = ['$routeProvider'];

  function loggedConfig($routeProvider) {
    $routeProvider.when('/logged', {
      templateUrl: 'logged/logged.html'
    });
  }
})();