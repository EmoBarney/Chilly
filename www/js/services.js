angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('SignupService', [function(){
	return {
		createUser: function(email, password){
			//Create a new user in firebase 
			var user = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  	
		  // Handle Errors here.
		  	var errorCode = error.code;
		  	var errorMessage = error.message;
		  
		  	if(errorCode === "auth/email-already-in-use"){
		  		alert("This email is already in use.");

		  	} else{
		  		alert(errorMessage);

		  	}
		  	console.log(error);

			});
		
		console.log(user);
		return user;
		
		}



};

}])