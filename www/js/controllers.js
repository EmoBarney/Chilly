angular.module('app.controllers', ['ionic','app.services'])
  
.controller('ownedCtrl', ['$scope', '$stateParams', 'ownedService', '$ionicPopup', 
	'$state', 'GroceryListService',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ownedService, $ionicPopup, $state, GroceryListService ) {

	$scope.items = [];

	$scope.item = {
		name: null,
		quantity: null,
		expiration: null
	};
	
	var getItems = function(){
		return ownedService
		.getItems()
		.then( function(snapshot){
			snapshot.forEach( function(snap){
				$scope.items.push({
					name: snap.key,
					quantity: snap.val().quantity,
					expiration: snap.val().expiration
				});
			});
		});
	};

	getItems().then( function(){
		$state.go($state.current, {}, {reload: true});
	}); 

	//save does both save, add, and delete
	$scope.add = function(){

		/*
		console.log( $scope.item.name );
		console.log( $scope.item.quantity );
		console.log( $scope.item.expiration ); */

		if( $scope.item.name ){

			if( !$scope.item.quantity ){
				$scope.item.quantity = "";
			}
			if( !$scope.item.expiration ){
				$scope.item.expiration = "";
			}
			ownedService.updateItem($scope.item);
			$scope.items.push($scope.item);
			console.log( 'Added Item: '+ $scope.item.name +
				', quant + exp: ' + $scope.item.quantity + $scope.item.expiration);
			$scope.item = {
				name: null,
				quantity: null,
				expiration: null
			};
		}
		else{
			$ionicPopup.alert({
				title: "No item name specified!",
				template: "Please include an item name."
			})
		}

	};

	$scope.deleteItem = function( index ){

		var toDelete = $scope.items[index].name;
		if( toDelete ){
			ownedService.removeItem(toDelete);
			$scope.items.splice(index, 1);
			console.log( 'Deleted item: ' + toDelete );
		}
		else{
			$ionicPopup.alert({
				title: "No item name specified!",
				template: "Please include an item name."
			});
		}

	};

	$scope.moveItem = function( index ){
		var toMove = $scope.items[index].name;
		GroceryListService.createItem( toMove );
		$scope.deleteItem(index);
		console.log('Moved ' + toMove + ' to grocery list.');
	}

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
   
.controller('groceryListCtrl', ['$scope', '$stateParams', 'GroceryListService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, GroceryListService) {
	//get existed items from service and add to the items list
	//delete item in items list view and same item in database items.

	/* ng-model binding object initialization */
	$scope.input = {};
	/* item list items */
	
	$scope.items = [
		"apple",
		"banana",
		"noodle",
		"rice"
	];
	

	$scope.addItem = function(){
		if($scope.input.newItem){

			$scope.items.push($scope.input.newItem);
			$scope.input = {};
		
		    GroceryListService.createItem($scope.items[$scope.items.length-1]);
		}
	 };

	$scope.deleteItem = function(itemIndex){
		var deletedItem = $scope.items.splice(itemIndex, 1);
		if(deletedItem){
			GroceryListService.deleteItem(deletedItem);
		}
	};
	$scope.clearAll = function(){
		
		GroceryListService.deleteAll();
		$scope.items = [];
	};
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
			$scope.loginForm = {};
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
		console.log('password entered:   ' + password);
	};
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
				    else{
				    	$ionicPopup.alert({
							title: "Sign Up Failed.",
							template: "This email is already in use."
						});
				    }
				});	
		}else{
			console.log("Input invalid.");
		}
	}//end of signup function
}])
 