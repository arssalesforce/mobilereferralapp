angular.module('app.services', [])

.factory('auth', function ($rootScope, $window, $cordovaInAppBrowser, salesforce_client_id) {
	return {
		get: function () {
			var data;
			try {
				data = $window.localStorage.auth;
				console.log('auth.get', data);
			} catch (e) {
				console.log(e);
			}
			return data ? JSON.parse(data) : false;
		},

		set: function (data) {
			data = JSON.stringify(data);
			console.log('auth.set', data);
			$window.localStorage.auth = data;
		},

		erase: function () {
			delete $window.localStorage.auth;
		},

		// open OAuth page in external browser
		openLogin: function () {
			$rootScope.ref = $window.open(
				'https://test.salesforce.com/services/oauth2/authorize' +
				'?response_type=token&display=touch' +
				'&redirect_uri=sfsampleapp://oauth-callback' +
				'&client_id=' + salesforce_client_id,
				'_blank',
				'location=yes,clearsessioncache=yes'
			);
		}
	}
})

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);