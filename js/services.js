app.service('wsfTerminalService',function($http,$q) {
    return({
        api_root: "http://www.wsdot.wa.gov/ferries/api",
        api_key: "beae0283-3493-4760-9997-04b1c32a23e2",
        api_terminals: "/terminals/rest",
        api_terminal_cache_key:"terminalCache",
        getCacheFlushDate : function(){
            var url = this.api_root + this.api_terminals + "/cacheflushdate?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getBasics : function(vars){
            var url = this.api_root + this.api_terminals + "/terminalbasics?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getBulletins : function(vars){
            var url = this.api_root + this.api_terminals + "/terminalbulletins?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getLocations : function(vars){
            var url = this.api_root + this.api_terminals + "/terminallocations?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getSailingSpace : function(vars){
            var url = this.api_root + this.api_terminals + "/terminalsailingspace?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTransports : function(vars){
            var url = this.api_root + this.api_terminals + "/terminaltransports?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getVerbose : function(vars){
            var url = this.api_root + this.api_terminals + "/terminalverbose?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getWaitTimes : function(vars){
            var url = this.api_root + this.api_terminals + "/terminalwaittimes?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalServices :function(){
            var deferred = $q.defer();
            var _self = this;
            _self.now = moment().format('DD/MM/YYYY HH:mm:ss.SSS');
            _self.terminalServices = {};
            _self.getCacheFlushDate().then(function(response){
                var storedFlushDate = null;
                if(amplify.store(_self.api_terminal_cache_key)){
                    storedFlushDate = amplify.store(_self.api_terminal_cache_key).FlushDate;
                }
                //_self.terminalServices['CachedData'] = (moment(response.data).unix().valueOf() > storedFlushDate);
                //console.log("Get New Data: ",moment(response.data).unix().valueOf() > storedFlushDate)
                if(moment(response.data).unix().valueOf() > moment(storedFlushDate).unix().valueOf() ) {
                    _self.terminalServices['FlushDate'] = moment(response.data).format();
                    _self.getBasics().then(function (response) {
                        _self.terminalServices['Basics'] = response.data;
                        _self.getBulletins().then(function (response) {
                            _self.terminalServices['Bulletins'] = response.data;
                            _self.getLocations().then(function (response) {
                                _self.terminalServices['Locations'] = response.data;
                                _self.getSailingSpace().then(function (response) {
                                    _self.terminalServices['Space'] = response.data;
                                    _self.getTransports().then(function (response) {
                                        _self.terminalServices['Transports'] = response.data;
                                        _self.getVerbose().then(function (response) {
                                            _self.terminalServices['Verbose'] = response.data;
                                            _self.getWaitTimes().then(function (response) {
                                                _self.terminalServices['WaitTimes'] = response.data;
                                                var then = moment().format('DD/MM/YYYY HH:mm:ss.SSS');
                                                var duration = moment(moment(then, 'DD/MM/YYYY HH:mm:ss.SSS').diff(moment(_self.now, 'DD/MM/YYYY HH:mm:ss.SSS'))).format('mm:ss.SSS')
                                                _self.terminalServices['ResponseTime'] = duration;
                                                _self.terminalServices['CachedData'] = false;
                                                amplify.store(_self.api_terminal_cache_key, _self.terminalServices);
                                                deferred.resolve(_self.terminalServices);
                                            })
                                        });
                                    });
                                });
                            });
                        });
                    });
                }else{
                    _self.terminalServices = amplify.store(_self.api_terminal_cache_key);
                    _self.terminalServices['CachedData'] = true;
                    var then = moment().format('DD/MM/YYYY HH:mm:ss.SSS');
                    var duration = moment(moment(then, 'DD/MM/YYYY HH:mm:ss.SSS').diff(moment(_self.now, 'DD/MM/YYYY HH:mm:ss.SSS'))).format('mm:ss.SSS')
                    _self.terminalServices['ResponseTime'] = duration;
                    deferred.resolve(_self.terminalServices);
                }
            });
            return deferred.promise;
        }

    });

});

app.service('wsfScheduleService',function($http,$q) {
    return ({
        api_root: "http://www.wsdot.wa.gov/ferries/api",
        api_key: "beae0283-3493-4760-9997-04b1c32a23e2",
        api_schedules: "/schedule/rest",
        api_schedule_cache_key: "scheduleCache",
        trip_date: moment().format('YYYY-MM-DD'),
        getCacheFlushDate : function(){
            var url = this.api_root + this.api_schedules + "/cacheflushdate?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getValidDateRange : function(){
            var url = this.api_root + this.api_schedules + "/validdaterange?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminals : function(){
            var url = this.api_root + this.api_schedules + "/terminals/"+this.trip_date+"?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalsAndMates : function(){
            var url = this.api_root + this.api_schedules + "/terminalsandmates/"+this.trip_date+"?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalsAndMatesByRoute : function(routeId){
            var url = this.api_root + this.api_schedules + "/terminalsandmates/"+this.trip_date+"/"+routeId+"?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalsMates : function(terminalId){
            var url = this.api_root + this.api_schedules + "/terminalmates/"+this.trip_date+"/"+terminalId+"?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getRoutes : function(DepartingTerminalID,ArrivingTerminalID){
            var url = null,
                promise=null;
            if(DepartingTerminalID == null && ArrivingTerminalID == null) {
                //usage: this.getRoutes()
                url = this.api_root + this.api_schedules + "/terminalsandmates/" + this.trip_date + "?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key;
            }else{
                //usage: this.getRoutes("9","14")
                url = this.api_root + this.api_schedules + "/terminalsandmates/" + this.trip_date + "/" +DepartingTerminalID +"/" + ArrivingTerminalID +"?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key;
            }
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getRoutesHavingServiceDisruptions : function(){
            var url = this.api_root + this.api_schedules + "/routeshavingservicedisruptions/"+this.trip_date+"?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getActiveSeasons : function(){
            var url = this.api_root + this.api_schedules + "/activeseasons?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getSchedule : function(DepartingTerminalID,ArrivingTerminalID){
            var url = this.api_root + this.api_schedules + "/schedule/" + this.trip_date + "/" +DepartingTerminalID +"/" + ArrivingTerminalID +"?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key;
                promise=null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getScheduleServices :function(){
            var deferred = $q.defer();
            var _self = this;
            _self.now = moment().format('DD/MM/YYYY HH:mm:ss.SSS');

            _self.scheduleServices = {};
            _self.getCacheFlushDate().then(function(response){
                var storedFlushDate = null;
                if(amplify.store(_self.api_schedule_cache_key)){
                    storedFlushDate = amplify.store(_self.api_schedule_cache_key).FlushDate;
                    //console.log("storedFlushDate",moment(storedFlushDate).unix().valueOf())
                    //console.log("responseFlushDate",moment(response.data).unix().valueOf())
                }
                //_self.terminalServices['CachedData'] = (moment(response.data).unix().valueOf() > storedFlushDate);

                console.log("Get New Data: ",moment(response.data).unix().valueOf() > moment(storedFlushDate).unix().valueOf())
                if(moment(response.data).unix().valueOf() > moment(storedFlushDate).unix().valueOf() ) {
                    _self.scheduleServices['FlushDate'] = moment(response.data).format();
                    _self.getTerminals().then(function (response) {
                        _self.scheduleServices['Terminals'] = response.data;
                        _self.getTerminalsAndMates().then(function (response) {
                            _self.scheduleServices['TerminalsAndMates'] = response.data;
                            _self.getRoutes().then(function (response) {
                                _self.scheduleServices['Routes'] = response.data;
                                //deferred.resolve(_self.scheduleServices);
                                _self.getRoutesHavingServiceDisruptions().then(function (response) {
                                    _self.scheduleServices['RoutesHavingServiceDisruptions'] = response.data;
                                    //deferred.resolve(_self.scheduleServices);
                                    _self.getActiveSeasons().then(function (response) {
                                        _self.scheduleServices['ActiveSeasons'] = response.data;
                                        //deferred.resolve(_self.scheduleServices);
                                        _self.getValidDateRange().then(function (response) {
                                            _self.scheduleServices['ValidDateRange'] = response.data;
                                            _self.scheduleServices.ValidDateRange.DateFrom = moment(_self.scheduleServices.ValidDateRange.DateFrom).format();
                                            _self.scheduleServices.ValidDateRange.DateThru = moment(_self.scheduleServices.ValidDateRange.DateThru).format();
                                            amplify.store(_self.api_schedule_cache_key, _self.scheduleServices);
                                            deferred.resolve(_self.scheduleServices);
                                        });
                                    });
                                });
                            });
                        });
                    });
                }else{
                    _self.scheduleServices = amplify.store(_self.api_schedule_cache_key);
                    _self.scheduleServices['CachedData'] = true;
                    var then = moment().format('DD/MM/YYYY HH:mm:ss.SSS');
                    var duration = moment(moment(then, 'DD/MM/YYYY HH:mm:ss.SSS').diff(moment(_self.now, 'DD/MM/YYYY HH:mm:ss.SSS'))).format('mm:ss.SSS')
                    _self.scheduleServices['ResponseTime'] = duration;
                    deferred.resolve(_self.scheduleServices);
                }
            });
            return deferred.promise;
        }

    });
});