angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', '$stateParams', 
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }]
)      
.controller('loginCtrl', ['$rootScope', '$scope', '$stateParams', 'auth',
                            'apiFactory',                             
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($rootScope, $scope, $stateParams, auth, apiFactory) {
        $rootScope.onAuth = function (authData) {
            auth.set(authData);
        }
        
        $scope.getTheToken = function () {
            alert('Please connect to Salesforce');
        }

        ionic.Platform.ready(() => {
            $scope.getTheToken = () => {
                apiFactory.getAccount();
            }
        })
    }]
);