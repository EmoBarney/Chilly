angular.module('app.controllers', [])
  
.controller('ownedCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('expirationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('groceryListCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	// $scope.data = {};

	// $scope.login = function(){
	// 	console.log("login user:" + $scope.data.username + "password:" + $scope.data.password);

	// }

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', 'SignupService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, $state, SignupService) {

// When signup button fires:
	//verify Email is not empty
	//verify Password length. 
	//verify if password and retyped password match

	// if format is wrong, hint using popup:
			//email cannot be empty or/and
			//password length at least 8
			//password do not match
	// else add new user to firebase, and send email verification if account created successfully
	$scope.signupForm = {};

	$scope.signup = function(email, password, retype){
		
		var email = $scope.signupForm.email;
		var password = $scope.signupForm.password;
		var retype = $scope.signupForm.retype;

		var hasEmail = false;
		var hasCorrectLength = false;
		var hasSamePassword = false;


		console.log(email + password + retype);

	  var verifyInput = function(email, password, retype){
		if(email){
			hasEmail = true;
			if(password && password.length >= 6){
				hasCorrectLength = true;
				if(password === retype){
						hasSamePassword = true;
				}
				else{
					$ionicPopup.alert({
						title: "Sign Up Failed", 
						template: "Password does not match. Please re-confirm."
					});
				}
			}
			else{
				$ionicPopup.alert({
					title: "Sign Up Failed",
					template: "Password has to be at least 6 characters."});
			}
		}
		else{
			//if(email.length>0 && !email)
			$ionicPopup.alert({
				title: "Sign Up Failed",
				template: "Email is invalid."});

		}
	}
		console.log("here"+ email + password + retype);
		
		verifyInput(email, password, retype);
		if(hasEmail&&hasCorrectLength&&hasSamePassword){
			console.log("Account is valid.");
			SignupService
				.createUser(email, password)			
				.then(function(user){
					if(user){
						user.sendEmailVerification().then(function() {
	 						$ionicPopup.alert({
	
	 							template: "A verification email has been sent to your email address."

	 						}) // Email sent.
						}, function(error) {
	 			 				console.log(error.code);// An error happened.
								return;
						});


					$state.go("login");
				    }
				});	
		}else{
			console.log("Input invalid.");

		}
	


	}//end of signup function

	


}])
 