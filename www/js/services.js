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
		  
		  	if(errorCode != "auth/email-already-in-use"){
				console.log(errorMessage);
		  	}

			});
		console.log(user);
		return user;		
		}
};

}])

.service('loginService',[function(){
	return{ 
		login: function( email, password ){

			return firebase.auth()
				.signInWithEmailAndPassword(email, password)
				.catch(function(error) {
	  				// Handle Errors here.
	  				throw error;
			});
			/*
			var user = firebase.auth().currentUser;

			if (user != null) {
			  user.providerData.forEach(function (profile) {
			    console.log("Sign-in provider: "+profile.providerId);
			    console.log("  Provider-specific UID: "+profile.uid);
			    console.log("  Name: "+profile.displayName);
			    console.log("  Email: "+profile.email);
			    console.log("  Photo URL: "+profile.photoURL);
			  });
			} 
			return temp; */
		},

		loginStatusChanged: function( callback ){
			firebase.auth().onAuthStateChanged(function(user) {
			  if (user) {
			    // User is signed in.
			  } else {
			    // No user is signed in.
			  }
			  callback(user);
			});
		},

		signout: function(){
			firebase.auth().signOut().then(function() {
	  		// Sign-out successful.
	  		console.log('Signed out!');
			}, function(error) {
				console.log('WTF HAPPENED??');
				throw error;
	  		// An error happened.
			});
		}

	}

}])

	 .service('GroceryListService', [function(){
        
        var db = firebase.database();
        

        return{
         	createItem: function(itemName){        		
        	    var user = firebase.auth().currentUser;
        	    var groceryPath = 'GroceryList/' + user.uid + '/'+ itemName;
         		db.ref(groceryPath).set(itemName);

         	},

            deleteItem: function(deletedItem){
         	    var user = firebase.auth().currentUser;
         	    var groceryPath = 'GroceryList/' + user.uid +'/' + deletedItem;
         	    db.ref(groceryPath).remove();

         	},

         	deleteAll: function(itemsArray){
         		var user = firebase.auth().currentUser;
         		var groceryPath = 'GroceryList/' + user.uid + '/';
         		// for(var i = 0; i < itemsArray.length; i++){
         		// db.ref(groceryPath).child(itemsArray[i]).remove();
         		// }
         		
         	}

         }



        }])


.service('ownedService', [function(){
	return{
		updateItem: function( item ){

			var user = firebase.auth().currentUser;
			var uid = user.uid;

			firebase.database().ref('Fridge/' + uid + '/' + item.name).set({
		    	quantity: item.quantity,
		    	expiration: item.expiration
		  	});

		},
		addItem: function( item ){

			var user = firebase.auth().currentUser;
			var uid = user.uid;

			var postData = {
				quantity: item.quantity,
				expiration: item.expiration
			}

			var updates = {};
  			updates['/Fridge/' + uid + '/' + item.name] = postData;

  			return firebase.database().ref().update(updates);

		}
	}

}])
;
