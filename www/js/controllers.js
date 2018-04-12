angular.module('app.controllers', [])

.controller('menuCtrl', ['$scope', '$stateParams',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }]
)
.controller('loginCtrl', ['$rootScope', '$scope', '$stateParams', 'auth',
                            'apiFactory', 'testFactory',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($rootScope, $scope, $stateParams, auth, apiFactory, testFactory) {
        $rootScope.onAuth = function (authData) {
            auth.set(authData);
        }

          console.log('in www controller');

        $scope.getTheToken = function () {
            console.log('Please connect to Salesforce');
            console.log(testFactory.getAccount());
        }

        ionic.Platform.ready(() => {
            console.log(
              'in ionicPlatform function'
            );

            $scope.getTheToken = () => {
                var resp = apiFactory.getAccount();
                apiFactory.getAccount();
                //apiFactory.getAccount());
              //  testFactory.getAccount();
            }

        })

        function successAuthCallBack(){

        var testSFendpoint = 'https://recovery--devpro.cs54.my.salesforce.com/services/apexrest/TRVLead';
        //var prodSFendpoint = 'https://recovery.my.salesforce.com/services/apexrest/TRVLead';
        var prodSFendpoint = 'https://eq83izosqa.execute-api.us-east-2.amazonaws.com/PRD/referralapp';

              $http({
                                    method: 'POST',
                                    url: prodSFendpoint,

                                    headers : {
                                         "Authorization":"Bearer " + $scope.accessToken,
                                         "content-type" :"application/json; charset=UTF-8"
                                        },
                                    data:{"firstName":$scope.firstName,
                                          "lastName":$scope.lastName,
                                          "dob": $scope.dob,
                                          "phone1":$scope.phone,

                                          "in_deductible":$scope.in_benefits != 'n/a' ? $scope.in_benefits: -1,
                                          "oon_deductible":$scope.oon_deductible != 'n/a' ? $scope.oon_deductible: -1,
                                          "in_coinsurancePercent":$scope.in_coinsurancePercent != 'n/a'? $scope.in_coinsurancePercent:-1,
                                          "oon_coinsurancePercent":$scope.oon_coinsurancePercent != 'n/a' ? $scope.oon_coinsurancePercent : -1,
                                          "in_outOfPocketMaximum":$scope.in_outOfPocketMaximum != 'n/a' ? $scope.in_outOfPocketMaximum: -1,
                                          "oon_outOfPocketMaximum":$scope.oon_outOfPocketMaximum != 'n/a' ? $scope.oon_outOfPocketMaximum: -1,
                                          "activePolicy":$scope.active,
                                          "policyStart":$scope.policyEffectiveDate,
                                          "healthPlanId":$scope.healthPlanId,
                                          "payer":$scope.payerId}
                                          }).
                                success(function (data, status, headers, config) {
                                  //Used in the update call
                                  $scope.leadId = data.Id;
                                 console.log('inserted:' + data.Id
                                                  + ', headers:' + headers
                                                  + ', config:' + config
                                                  + ', status:' + status);



                                }).
                                error(function (data, status, headers, config) {
                                    console.log('response error:' + data);
                                });





        }

    }]
);
