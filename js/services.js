app.service('wsfTerminalService',function($http,$q) {
    return({
        api_root: "http://www.wsdot.wa.gov/ferries/api",
        api_key: "beae0283-3493-4760-9997-04b1c32a23e2",
        api_terminals: "/terminals/rest",
        api_terminal_cache_key:"terminalCache",
        getTerminalCacheFlushDate : function(){
            var url = this.api_root + this.api_terminals + "/cacheflushdate?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalBasics : function(vars){
            var url = this.api_root + this.api_terminals + "/terminalbasics?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalBulletins : function(vars){
            var url = this.api_root + this.api_terminals + "/terminalbulletins?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalLocations : function(vars){
            var url = this.api_root + this.api_terminals + "/terminallocations?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalSailingSpace : function(vars){
            var url = this.api_root + this.api_terminals + "/terminalsailingspace?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalTransports : function(vars){
            var url = this.api_root + this.api_terminals + "/terminaltransports?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalVerbose : function(vars){
            var url = this.api_root + this.api_terminals + "/terminalverbose?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getTerminalWaitTimes : function(vars){
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
            _self.getTerminalCacheFlushDate().then(function(response){
                var storedFlushDate = null;
                if(amplify.store(_self.api_terminal_cache_key)){
                    storedFlushDate = amplify.store(_self.api_terminal_cache_key).FlushDate;
                }
                console.log("Get New Data: ",moment(response.data).unix().valueOf() > storedFlushDate)
                if(moment(response.data).unix().valueOf() > storedFlushDate ) {
                    _self.terminalServices['FlushDate'] = moment(response.data).unix().valueOf();
                    _self.getTerminalBasics().then(function (response) {
                        _self.terminalServices['Basics'] = response.data;
                        _self.getTerminalBulletins().then(function (response) {
                            _self.terminalServices['Bulletins'] = response.data;
                            _self.getTerminalLocations().then(function (response) {
                                _self.terminalServices['Locations'] = response.data;
                                _self.getTerminalSailingSpace().then(function (response) {
                                    _self.terminalServices['Space'] = response.data;
                                    _self.getTerminalTransports().then(function (response) {
                                        _self.terminalServices['Transports'] = response.data;
                                        _self.getTerminalVerbose().then(function (response) {
                                            _self.terminalServices['Verbose'] = response.data;
                                            _self.getTerminalWaitTimes().then(function (response) {
                                                _self.terminalServices['WaitTimes'] = response.data;
                                                var then = moment().format('DD/MM/YYYY HH:mm:ss.SSS');
                                                var duration = moment(moment(then, 'DD/MM/YYYY HH:mm:ss.SSS').diff(moment(_self.now, 'DD/MM/YYYY HH:mm:ss.SSS'))).format('mm:ss.SSS')
                                                _self.terminalServices['ResponseTime'] = duration;
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
                    console.log("storedTerminalServices: ",_self.terminalServices)
                }
            });
            return deferred.promise;
        }

    });

});