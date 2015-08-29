app.controller('departingController',['$http','$scope','$timeout','$window','terminalService','scheduleService','$routeParams', function($http,$scope,$timeout,$window,terminalService,scheduleService,$routeParams) {
    $scope.viewClass = 'departing';
    $scope.$watch("terminalApi",function(newData,oldData){
        $scope.setTitle("WSF Schedule");
    });


    $timeout(function(){
        $window.scrollTo(0,0)
    },100);
}]);
