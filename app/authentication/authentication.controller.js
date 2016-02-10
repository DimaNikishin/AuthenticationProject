(function(){
  'use strict';

  /**
   * @memberof myApp.authentication
   * @ngdoc controller
   * @name authenticationController
   * @description myApp.authentication module's main functional: private Activate,_setupHTMLMarkup functions and public Login, SecondLoginStep functions
   * @dependency $scope, authenticationService factory, $location service, $timeout service
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

    /**
     * @function Activate
     * @description Activate private function resolve start-up logic for a controller - setup default HTML markup
     */
    function Activate(){
      _setupHTMLMarkup(false,true,false);
    }

    /**
     * @function Login
     * @description Login public function use authenticationService and make POST request to server with user's login data (Login,Password)
     *              and make appropriate operations depends on server response
     * @param data - object with user's credentials
     */
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

    /**
     * @function SecondLoginStep
     * @description SecondLoginStep public function use authenticationService and make POST request to server when HOTP code is required with user's login data (Login,Password, HOTP)
     *              and make appropriate operations depends on server response (second Google 2-Step Verification step)
     * @param data - object with user's credentials
     */
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

    /**
     * @function _setupHTMLMarkup
     * @description _setupHTMLMarkup private function which change HTML Markup
     * @param FirstSubmitStepInput boolean which hides first submit step form
     * @param SecondSubmitStepInput boolean which hides second submit step form
     * @param AdditionalBlock boolean which hides additional information block
     */
    function _setupHTMLMarkup(FirstSubmitStepInput,SecondSubmitStepInput,AdditionalBlock){
      that.markup.FirstSubmitStepInput = FirstSubmitStepInput;
      that.markup.SecondSubmitStepInput = SecondSubmitStepInput;
      that.markup.AdditionalBlock = AdditionalBlock;
    }
  }
})();