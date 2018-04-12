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
/*
headers.append('Access-Control-Allow-Origin' , '*');
	 headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
	 headers.append('Accept','application/json');

	 POST /services/apexrest/GetAccountProfile/ HTTP/1.1
	 Host: recovery--staging.cs95.my.salesforce.com
	 Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
	 Authorization: Bearer 00D0x000000CrGU!ARkAQLXnR7Xv5.lOeJ1rcOGESfw2HRivQfslKpRaLrUTZ5WDCtdZuLD6KOSw_CNEbKGQu8V43PuEhRzZ3lDuQR0dy9XU_PD3
	 Cache-Control: no-cache
	 Postman-Token: 24857b65-cb16-4d93-a9b6-f05d8bd1b45d



*/

.factory('apiFactory', function($http, auth, SFEndpoint){
	console.log('in www apifacgtory');
  var token2 = '';
	return {
		  getAccount: () => {
			const token = auth.get().access_token;
			token2 = auth.get().access_token;
			console.log(token2);
			const req = {
				method: 'POST',
				url: 'https://eq83izosqa.execute-api.us-east-2.amazonaws.com/PRD/referralapp',
				headers: {
					'content-type': 'application/json; charset=UTF-8',
					'Authorization': 'Bearer ' + token2
				}
			};

			//console.log('request:' + req.headers);
			return $http(req).then((res) => {
				console.log('res:', res);
				console.log('jsonId:', res.data.firstName);
				console.log('accountid:', res.data.partnerAccount.Id);
				console.log('Type:', res.data.partnerAccount.Type);

				return {
					id: res.data.Id,
					firstName: res.data.firstName,
					lastName: res.data.lastName,
					phone: res.data.phone,
					email: res.data.email,
					accountid: res.data.partnerAccount.Id,
					type: res.data.partnerAccount.type

				};

			}).catch((e) => {
				console.log(e);
			})
		}
	}
})

.factory('testFactory', function($http, auth, SFEndpoint){
  var token2 = '';
	return {
		  getAccount: () => {
			const token = auth.get().access_token;
			token2 = auth.get().access_token;
			console.log(token2);
			const req = {
				method: 'GET',
				url: 'https://test.salesforce.com/apexrest/getTest/0740x000000004D',
				headers: {
					'Access-Control-Allow-Origin': "*",
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + token2
				}
			};

			return $http(req).then((res) => {
				return {
					id: res.Id
				};
			}).catch((e) => {
				console.log(e);
			})
		}
	}
})

.service('BlankService', [function(){

}]);
