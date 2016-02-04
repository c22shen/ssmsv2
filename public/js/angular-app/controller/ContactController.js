'use strict';

angular.module('ssms.app').controller('ContactController', ['$scope', '$http','$rootScope',
  function ($scope, $http, $rootScope) {
    $scope.sendMailYun = function () {
      $scope.success = $scope.error = null;
      if(!$scope.contact ||!$scope.contact.contactName||!$scope.contact.contactEmail||!$scope.contact.contactMsg){
        $scope.error = 'Please fill out the fields';
        
      }
      else{
      $scope.sending = true;
      $scope.to = 'yunlaboratory@gmail.com';

      $http.post('/contact/sendMail',{contact:$scope.contact,to:$scope.to}).success(function (response) {
        // If successful show success message and clear form
        $scope.contact = null;
        $scope.success = response.message;
        $scope.sending = false;
      }).error(function (response) {
        $scope.error = response.message;
        $scope.sending = false;
      });
      }
    };
    $scope.sendMailMS = function () {
      $scope.success = $scope.error = null;
    
      $http.post('/contact/sendMail',$scope.contact).success(function (response) {
        // If successful show success message and clear form
        $scope.contact = null;
        $scope.success = response.message;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);