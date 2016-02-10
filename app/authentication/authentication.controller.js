(function(){
  'use strict';

  /**
   * @memberof myApp.authentication
   * @ngdoc controller
   * @name authenticationController
   */

  angular
    .module('myApp.authentication')
    .controller('authenticationController',authenticationController);

  authenticationController.$inject = ['$scope', 'authenticationService'];

  function authenticationController($scope, authenticationService){
    var that = this;
    that.Login = function(data){
      authenticationService.login(angular.toJson(data))
    }
  }
})();