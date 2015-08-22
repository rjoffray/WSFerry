

app.controller('applicationController',['$http','$scope','$timeout','$window','wsfTerminalService','wsfScheduleService','$location','$routeParams','$resource', function($http,$scope,$timeout,$window,wsfTerminalService,wsfScheduleService,$location,$routeParams,$resource) {
    $scope.terminalApi = {};
    $scope.scheduleApi = {};
    $scope.FauntleroyVashon = {};

    $scope.departingId = $routeParams.departingId;

    wsfTerminalService.getTerminalServices().then(function(response){
        $scope.terminalApi =  response;
        //console.log("Promise returned: ",response);
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });
    wsfScheduleService.getScheduleServices().then(function(response){
        $scope.scheduleApi =  response;
        //console.log("Schedule service promise returned: ",response);
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });
    wsfScheduleService.getSchedule("9","22").then(function(response){
        $scope.FauntleroyVashon =  response.data;
        //console.log("Fauntleroy - Vashon Schedule service promise returned: ",$scope.FauntleroyVashon);
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });

    $scope.$watch("terminalApi",function(newData,oldData){
        if(newData != oldData){
            $scope.terminalApi = newData;
            //console.log("Terminal service watched data! ",newData)
        }

    });
    $scope.$watch("scheduleApi",function(newData,oldData){
        if(newData != oldData){
            $scope.scheduleApi = newData;
            //console.log("Schedule service watched data! ",newData)
        }

    });

    $scope.goArriving = function ( id ) {
        $location.path( "/arriving/"+id );
    };

    $scope.goTimes = function ( departing, arriving ) {
        $location.path( "/times/"+departing+"/"+arriving );
    };



    $scope.fixMsDate = function(msDate){
        return moment(msDate).format("h:mm a")
    }

    $scope.$watch("terminalApi",function(newData,oldData){
        if(newData != oldData){
            $scope.Terminals = newData.Basics;
            $scope.terminalApi = newData;
            //console.log("Terminal service watched data! ",newData)
        }

    });

}]);

app.controller('terminalsController',['$http','$scope','$timeout','$window','$routeParams', function($http,$scope,$timeout,$window,wsfTerminalService,wsfScheduleService,$routeParams) {

}]);
app.controller('arrivingController',['$scope', '$routeParams', '$location', '$resource','wsfScheduleService', function($scope, $routeParams, $location, $resource,wsfScheduleService) {
    //console.log("routeParams: ",$routeParams)
    $scope.departingId = $routeParams.departingId;
    wsfScheduleService.getTerminalsMates($scope.departingId).then(function(response){
        $scope.Mates =  response.data;
        //console.log("terminal mates for: ",$scope.departingId," :",$scope.Mates );
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });

}]);
app.controller('timesController',['$scope', '$routeParams', '$location', '$resource','wsfScheduleService', function($scope, $routeParams, $location, $resource,wsfScheduleService) {
    //console.log("routeParams: ",$routeParams)
    $scope.departingId = $routeParams.departingId;
    $scope.arrivingId = $routeParams.arrivingId;

    wsfScheduleService.getSchedule($scope.departingId,$scope.arrivingId).then(function(response){
        $scope.Times =  response.data.TerminalCombos[0].Times;
        //console.log("Times: ",$scope.Times);
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });

}]);
