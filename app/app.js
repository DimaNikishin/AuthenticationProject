'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.authentication',
  'myApp.logged',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/authentication'});
}]);
