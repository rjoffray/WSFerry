app.controller('timesController',['$scope', '$routeParams', '$location', '$resource','scheduleService','$timeout','$window','$anchorScroll','$document', function($scope, $routeParams, $location, $resource,scheduleService,$timeout,$window,$anchorScroll,$document) {
    //console.log("routeParams: ",$routeParams)
    $scope.viewClass = 'times';
    $scope.departingId = $routeParams.departingId;
    $scope.arrivingId = $routeParams.arrivingId;
    $scope.$watch("terminalApi",function(newData,oldData){
        $scope.setTitle($scope.getTerminalNameFromId($scope.departingId)+" - " + $scope.getTerminalNameFromId($scope.arrivingId));
    });

    $scope.timesApi = {};
    $scope.validDateRangeApi = {};
    $scope.nextTimeFound = false;

    $scope.isBoatGone = function(time){
        $scope.beforeTime  = moment(time).unix().valueOf() < moment().unix().valueOf()?true:false;
        if($scope.beforeTime){
            return true;
        }
        return false;
    }
    $scope.isAmTime = function(time){
        return moment(time).format('a') == 'am';
    }

    scheduleService.getSchedule($scope.departingId,$scope.arrivingId).then(function(response){
        $scope.timesApi =  response.data;
        console.log("Schedule Response",response.data)
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });
    $scope.reverseSchedule = function(){
        //console.log();
        var pathArray = $location.path().split("/");
        console.log(pathArray)
        $location.path(pathArray[1]+"/"+pathArray[3]+"/"+pathArray[2])
    }

    $scope.$watch("timesApi",function(newData,oldData){

        if(newData != oldData){
            $scope.Schedule =  newData;
            $scope.Times =  newData.TerminalCombos[0].Times;

            $timeout(function(){
                $(".boat-gone").eq(-3).attr("id","scrollto")

                if($(".times-list")) {
                    if($('.boat-available').length > 1){
                        $('.boat-available').first().addClass('active')
                    }else{
                        $('.boat-available').addClass('active')
                    }
                    $('.boat-available').first().addClass('active')
                }
                if($(".boat-gone")) {
                    $('html,body').animate({
                        scrollTop: $scope.nextBoatOffset
                    }, 200);
                }
                $anchorScroll("scrollto")

            },500);

        }

    });


}]);
