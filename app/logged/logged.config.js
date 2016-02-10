(function(){
  'use strict';

  /**
   * @memberof myApp.authentication
   * @ngdoc config
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