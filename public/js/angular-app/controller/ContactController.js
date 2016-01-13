'use strict';

angular.module('app').controller('ContactController', ['$scope', '$http','$rootScope',
  function ($scope, $http, $rootScope) {
    $scope.sendMailYun = function () {
      $scope.success = $scope.error = null;
      $scope.contact.to = 'yunlaboratory@gmail.com';
      $http.post('/contact/sendMail',$scope.contact).success(function (response) {
        // If successful show success message and clear form
        $scope.contact = null;
        $scope.success = response.message;
      }).error(function (response) {
        $scope.error = response.message;
      });
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