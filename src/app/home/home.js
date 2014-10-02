/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * 'src/app/home', however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a 'note' section could have the submodules 'note.create',
 * 'note.delete', 'note.edit', etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 */
(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            views: {
                "main": {
                    controller: 'HomeController',
                    templateUrl: 'home/home.tpl.html'
                }
            },
            data:{ pageTitle: 'Control2' }
        });
    });

    // As you add controllers to a module and they grow in size, feel free to place them in their own files.
    //  Let each module grow organically, adding appropriate organization and sub-folders as needed.
    app.controller('HomeController', ['$scope', '$rootScope', 'Droplet', function ($scope, $rootScope, Droplet) {
        $scope.someFunctionUsedByTheHomePage = function () {
            alert('Congratulations');
        };
        $scope.droplet_resource = Droplet.query();
        var init = function() {
            console.log($scope.droplet_resource);

        };
        init();
    }]);

// The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
}(angular.module("salty-sea.home", [
    'ui.router', "dropletServices"
])));