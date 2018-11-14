import angular from 'angular';
import ngRoute from 'angular-route';

const app = angular.module('foodApp', ['ngRoute']);

app.config(function config($locationProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      template: `
      <div class="wrap">
        <h1>Home</h1>
        <p>
          <a href="/recipes">Recipes</a>
        </p>
      </div>
      `
    })
    .when('/recipes', {
      template: '<recipe-list></recipe-list>'
    })
    .when('/recipes/:recipeId', {
      templateUrl: '/templates/recipe.html',
    });
  $locationProvider.html5Mode(true);
});

app.component('recipeList', {
  templateUrl: '/templates/recipes.html',
  controller: function RecipeListController($scope, $http) {
    $http.get('api/recipes').then( res => {
      $scope.recipes = res.data;
    });
  }
});

app.component('recipeDetail', {
  templateUrl: '/templates/recipe.html',

  controller: function RecipeDetailController($http, $routeParams, $scope) {
    $http.get('api/recipes/' + $routeParams.recipeId).then(res => {
      ($scope.recipe = res.data);
      console.log($scope.recipe);
    });
  }
});
