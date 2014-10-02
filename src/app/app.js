(function(app) {

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    });

    app.run(function () {});

    app.controller('AppController', function ($scope, $rootScope) {
        $rootScope.APIKEY = "INSERT APIKEY HERE";

    });

}(angular.module("salty-sea", [
    'salty-sea.home',
    'salty-sea.about',
    'salty-sea.droplet',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'dropletServices'
])));
