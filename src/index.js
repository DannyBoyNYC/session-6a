import angular from 'angular';
import ngRoute from 'angular-route';

const app = angular.module('foodApp', ['ngRoute']);

app.config(function config($locationProvider, $routeProvider){
  $routeProvider.when('/', {
    template: `<h1>Home</h1>`
  })
  .when('/recipes', {
    template: '<recipe-list></recipe-list>'
  })
  .when('/recipes/:recipeId', {
    template: '<recipe-detail></recipe-detail>'
  })
  $locationProvider.html5Mode(true);
})

app.component('recipeList', {
  templateUrl: '/templates/recipes.html',
  controller: function($scope, $http){
    $http.get('api/recipes').then( res => {
      $scope.recipes = res.data;
    })
  }
})

app.component('recipeDetail', {
  template: '<p>View for {{recipeId}}</p>',
  controller: function recipeDetailController($scope, $routeParams){
    $scope.recipeId = $routeParams.recipeId
  }
})