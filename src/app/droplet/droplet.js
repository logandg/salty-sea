(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('droplet', {
            url: '/droplet/:dropletId',
            views: {
                "main": {
                    controller: 'DropletController',
                    templateUrl: 'droplet/droplet.tpl.html'
                }
            },
            data:{ pageTitle: 'SaltySea - Droplet {{dropletid}}' }
        });
    });

    // As you add controllers to a module and they grow in size, feel free to place them in their own files.
    //  Let each module grow organically, adding appropriate organization and sub-folders as needed.
    app.controller('DropletController', ['$scope', '$rootScope', '$stateParams', 'Droplet', function ($scope, $rootScope, $stateParams, Droplet) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid

        };

        $scope.someFunctionUsedByTheHomePage = function () {
            alert('Congratulations');
        };
        $scope.droplet_resource = Droplet.get({dropletId: $stateParams.dropletId}, function(){
            $scope.droplet = $scope.droplet_resource.droplet;
        });


        init();
    }]);

// The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
}(angular.module("salty-sea.droplet", [
    'ui.router', "dropletServices"
])));