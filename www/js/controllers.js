angular.module('app.controllers', ['ionic','app.services'])
  
.controller('ownedCtrl', ['$scope', '$stateParams',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams ) {
}])
   
.controller('expirationsCtrl', ['$scope', '$stateParams', '$state', 'loginService',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, loginService) {

	loginService.loginStatusChanged( function(user){
		if( user ){
		}
		else{
			$state.go( 'login', {updateRequired:true} );
		}
	});

	$scope.signout = function(){
		loginService.signout();
	};

}])
   
.controller('groceryListCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('loginCtrl', ['$scope', '$stateParams',
'$ionicPopup','loginService', '$state',
 // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, loginService, $state) {

	$scope.loginForm = {};

	loginService.loginStatusChanged(function(user){
		if( user ){
			console.log('Logged in!');
			$state.go('tabsController.owned', {updateRequired:true});
		}

	});

	$scope.login = function(){
		var email = $scope.loginForm.email;
		var password = $scope.loginForm.password;
		var success = false;

		if( email && password ){
			loginService
				.login( email, password )
				.catch( function(error){
					$ionicPopup.alert({
						title: 'Login Failed',
						template: 'Wrong email or password, NOOB' 
					})
				});
		}
		else{
			$ionicPopup.alert({
				title:'Invalid Input',
				template: 'Please enter email and password'
			});
		}

		
		console.log('email entered: ' + email);
		console.log('password entered: ' + password);
		
	};

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 