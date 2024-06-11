app.controller('favoritesController',['$scope', '$routeParams', '$location', '$resource','scheduleService','vesselService','$timeout','$window','$anchorScroll','$document', function($scope, $routeParams, $location, $resource,scheduleService,vesselService,$timeout,$window,$anchorScroll,$document) {
    $scope.setViewClass("favorites");
    $scope.favorites = amplify.store("favorites");
    $scope.setTitle("WSF Schedule");
    $scope.setListHeader(true,'Favorite Routes');
    $scope.showListHeader = true;
    $scope.setSubNav(false);

    $scope.removeFavorite = function(key) {
        console.log($scope.favorites[key])
        delete $scope.favorites[key];
        amplify.store("favorites", null);
        amplify.store("favorites",$scope.favorites)

    }

}]);