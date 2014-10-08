(function(app) {
    app.factory('configService', ['$window', '$rootScope', function ($window, $rootScope) {

        var service = {

            keys: {
                digital_ocean: '',
                salt: ''
            },

            urls: {
                salt: ''
            },

            SaveState: function () {
                $window.localStorage.setItem("keys", angular.toJson(service.keys));
                $window.localStorage.setItem("urls", angular.toJson(service.urls));
            },

            RestoreState: function () {
                service.keys = angular.fromJson($window.localStorage.getItem("keys"));
                service.urls = angular.fromJson($window.localStorage.getItem("urls"));
            }
        };

        $rootScope.$on("savestate", service.SaveState);
        $rootScope.$on("restorestate", service.RestoreState);
        service.RestoreState();
        return service;
    }]);
})(angular.module("configService", []));