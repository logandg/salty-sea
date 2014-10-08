(function(app) {

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    });

    app.run(function ($rootScope) {

        // Restore state stuff
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (sessionStorage.restorestate == "true") {
                $rootScope.$broadcast('restorestate'); //let everything know we need to restore state
                sessionStorage.restorestate = false;
            }
        });

        //let everthing know that we need to save state now.
        window.onbeforeunload = function (event) {
            $rootScope.$broadcast('savestate');
        };

    });

    app.controller('AppController', function ($scope, $rootScope) {


    });

}(angular.module("salty-sea", [
    'salty-sea.home',
    'salty-sea.about',
    'salty-sea.droplet',
    'salty-sea.setup',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'dropletService',
    'configService'
])));
