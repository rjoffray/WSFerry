app.controller('arrivingController',['$scope', '$routeParams', '$location', '$resource','scheduleService','$window','$timeout', function($scope, $routeParams, $location, $resource,scheduleService,$window,$timeout) {
    //console.log("routeParams: ",$routeParams)
    $scope.viewClass = 'arriving';
    $scope.departingId = $routeParams.departingId;
    $scope.$watch("terminalApi",function(newData,oldData){
        $scope.setTitle($scope.getTerminalNameFromId($scope.departingId))
        $scope.setListHeader(true,"arriving terminals");
        $scope.setSubNav(false);
    });

    scheduleService.getTerminalsMates($scope.departingId).then(function(response){
        $scope.Mates =  response.data;
        //console.log("terminal mates for: ",$scope.departingId," :",$scope.Mates );
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });

    $timeout(function(){
        $window.scrollTo(0,0)
    },100);

}]);
