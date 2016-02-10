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

  authenticationController.$inject = ['$scope', 'authenticationService','$location','$timeout'];

  function authenticationController($scope, authenticationService, $location, $timeout){
    var that = this;
    that.user = {};
    that.Login = Login;
    that.SecondLoginStep = SecondLoginStep;
    that.resultClass;
    that.banned = false;
    that.markup = {};

    Activate();

    function Activate(){
      _setupHTMLMarkup(false,true,false);
    }

    function Login(data){
      that.resultClass = '';
      authenticationService.login(angular.toJson(data)).success(function(data, status) {
        if(data["Auth"] == "Denied"){
          that.resultClass = 'failed-login';
          _setupHTMLMarkup(false,true,true);
        }
        else if(data["Auth"] == "Logged"){
          $location.path('/logged')
        }
        else if(data["Auth"] == "Banned"){
          that.banned = true;
          $timeout(function() {
            that.banned = false;
          }, data["Time"]*1000);
        }
        else if(data["Auth"] == "HOTP required"){
          _setupHTMLMarkup(true,false,true);
        }
      })
    }

    function SecondLoginStep(data){
      authenticationService.login(angular.toJson(data)).success(function(data, status) {
        if(data["Auth"] == "HOTP wrong code"){
          $location.path('/authentication')
        }
        else if(data["Auth"] == "Logged"){
          $location.path('/logged')
        }
      })
    }

    function _setupHTMLMarkup(FirstSubmitStepInput,SecondSubmitStepInput,AdditionalBlock){
      that.markup.FirstSubmitStepInput = FirstSubmitStepInput;
      that.markup.SecondSubmitStepInput = SecondSubmitStepInput;
      that.markup.AdditionalBlock = AdditionalBlock;
    }
  }
})();