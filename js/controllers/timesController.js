app.controller('timesController',['$scope', '$routeParams', '$location', '$resource','scheduleService','vesselService','$timeout','$window','$anchorScroll','$document', function($scope, $routeParams, $location, $resource,scheduleService,vesselService,$timeout,$window,$anchorScroll,$document) {
    //console.log("routeParams: ",$routeParams)
    $scope.setViewClass("times");
    $scope.setCameras($routeParams.departingId,$routeParams.arrivingId);
    $scope.departingId = $routeParams.departingId;
    $scope.arrivingId = $routeParams.arrivingId;
    //$scope.scheduleDate = moment($routeParams.scheduleDate).format('dddd, MMM DD, YYYY') || moment().format('dddd, MMM DD, YYYY');
    $scope.$watch("terminalApi",function(newData,oldData){
        $scope.setTitle($scope.getTerminalNameFromId($scope.departingId)+" - " + $scope.getTerminalNameFromId($scope.arrivingId));
        //$scope.setListHeader(true,moment().format("dddd, MMMM DD, YYYY"));
        var template = '<div class="container-fluid timesNav">\n\
                            <div class="row">\n\
                                <div class="col-xs-12">\n\
                                    <div class="input-group input-group-sm" ng-click="$event.stopPropagation()"> \n\
                                          <span class="input-group-addon">\n\
                                              <span class="fa fa-calendar" ng-click="showDatePicker()"></span>\n\
                                           </span>\n\
                                           <input class="datepicker input form-control" ng-model="scheduleDate" type=text value="'+moment().format("dddd, MMM DD, YYYY")+'" readonly />\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                        </div>'
        $scope.setListHeader(true,template);
        $scope.setDatePicker();
        $scope.setSubNav(true);
        $scope.setViewClass('times');
    });
    $scope.$watch("vesselsApi",function(newData,oldData){

    });
    $scope.timesApi = {};
    $scope.vesselsApi = {};
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
    if($routeParams.scheduleDate != null ){
        $scope.scheduleDate = $routeParams.scheduleDate  || moment().format("YYYY-MM-DD");
    }
    scheduleService.getSchedule($scope.departingId,$scope.arrivingId,$scope.scheduleDate).then(function(response){
        $scope.timesApi =  response.data;
        console.log("$$$$$$$$$$$$$$$$$$ Schedule Response $$$$$$$$$$$$$$",response.data)
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });

    $scope.showDatePicker = function(){
        $('.datepicker').show()
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
