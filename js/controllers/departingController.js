app.controller('departingController',['$http','$scope','$timeout','$window','terminalService','scheduleService','$routeParams', function($http,$scope,$timeout,$window,terminalService,scheduleService,$routeParams) {
    $scope.setViewClass("departing");
    $scope.showListHeader = true;
    $scope.listHeaderMessage = "departing terminals";
    $scope.$watch("terminalApi",function(newData,oldData){
        $scope.setTitle("WSF Schedule");
        $scope.setListHeader(true,"departing terminals")
        $scope.setSubNav(false)
    });
    $timeout(function(){
        $window.scrollTo(0,0)
    },100);
}]);
