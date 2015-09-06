app.controller("ticketsController",["$scope","$http",'$routeParams','$location', '$resource',function($scope,$http,$routeParams,$location,$resource){
    $scope.ticketUrl = "";
    $scope.setViewClass("tickets");
    $scope.setTitle("Ticket Lookup")
    $scope.ticketId=$routeParams.ticketId;

    var template = '<div class="container-fluid">\n\
                            <div class="row">\n\
                                <div class="col-xs-12">\n\
                                    <div class="input-group input-group-sm" ng-click="$event.stopPropagation()"> \n\
                                          <span class="input-group-addon">\n\
                                              <span class="fa fa-ticket" ng-click="showDatePicker()"></span>\n\
                                           </span>\n\
                                           <input type="text" class="form-control ticketForm" ng-model="ticketId" placeholder="Enter a ticket #"/>\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                        </div>{{ticketId}}'
    $scope.setListHeader(false,template);
    $scope.setSubNav(false);
    console.log("Route Params",$routeParams)
    if($routeParams.ticketId != null) {
        $scope.ticketUrl = "http://wsf.myclient.com/tickets/lookup-iphone.php?tid="+$routeParams.ticketId+"&o=json&callback=JSON_CALLBACK";
        console.log($scope.ticketUrl)
        $http.jsonp($scope.ticketUrl).then(function (response) {
            console.log("%&%&%&%&%&%&%&%&%: ", response.data)
            $scope.ticketData = response.data;
        }, function (error) {
            console.log("ERROR: ", error)
        });
    }

}])