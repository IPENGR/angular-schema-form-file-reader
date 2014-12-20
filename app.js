/*global angular */
'use strict';

/**
 * The main app module
 * @name app
 * @type {angular.Module}
 */
var lightApp = angular.module('lightApp', ['schemaForm'])
.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
    lightApp.controller = $controllerProvider.register;
    lightApp.directive  = $compileProvider.directive;
    lightApp.filter     = $filterProvider.register;
    lightApp.factory    = $provide.factory;
    lightApp.service    = $provide.service;
}])
.controller('FileReaderController', function($scope){
  $scope.schema = {
    type: 'object',
    title: 'Select',
    properties: {
      name: {
        title: 'Name',
        type: 'string'
      },
      content: {
        title: 'Content',
        type: 'string',
        format: 'file-reader'
      }
    },
    required: ['content']
  };
  $scope.form = [
    'name',
     {
       key: 'content'
     },
     {
        type: "submit",
        style: "btn-info",
        title: "OK"
      }
  ];
  $scope.model = {};

  $scope.submitted = function(form){
    $scope.$broadcast('schemaFormValidate')
    console.log($scope.model);
  };
});
