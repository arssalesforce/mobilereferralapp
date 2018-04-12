angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$cordovaInAppBrowser', 
                            'OtherSFEndpoint','SFEndpoint', 'salesforce_client_id', 
                            'oauth_endpoint', 'redirect_uri', 'auth', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($rootScope, $scope, $http, $cordovaInAppBrowser, OtherSFEndpoint, SFEndpoint, salesforce_client_id, oauth_endpoint, redirect_uri, auth, $stateParams) {
    $scope.email = 'hello';
    $scope.password = '******';

    $rootScope.onAuth = function (authData) {
        auth.set(authData);
    }
    
    $scope.getTheToken = function () {
        console.log('Not ready yet');
    }

    ionic.Platform.ready(() => {
        console.log(auth.get().access_token);
        token = 'Bearer 00D0x000000CrGU!ARkAQGMc1YHtTLcajyRid6QEKWoMh.iP0aUzbuHCxGjmY0fJiWvn4sMbRCY3jeA8Ot8Th3JGwidQaG3DHlMj0PC1z8EhiO6T';
        req = {
            method: 'POST',
            url: 'https://recovery--staging.cs95.my.salesforce.com/services/apexrest/GetAccountProfile/',
            headers: {
                'content-type': 'application/json',
                'Authorization': token
            }
        }
        data = {}
        config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': token
            }
        }
        console.log(req);
        $scope.getTheToken = () => {
            $http(req).then((response) => {
                console.log(response);
            }).catch((e) => { console.log(e) });
        }
    })
}])

 