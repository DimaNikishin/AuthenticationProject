'use strict';

/**
 * @ngdoc module
 * @name myApp
 * @description main project module
 * @dependency ngRoute module, myApp.authentication module, myApp.logged module, myApp.version module
 */

angular.module('myApp', [
  'ngRoute',
  'myApp.authentication',
  'myApp.logged',
  'myApp.version'
]).
/**
 * @memberof myApp
 * @ngdoc config
 * @description Setup myApp module's route properties: otherwise path
 * @dependency $routeProvider
 */
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/authentication'});
}]);
