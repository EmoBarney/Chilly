angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.owned', {
    url: '/owned',
    views: {
      'tab4': {
        templateUrl: 'templates/owned.html',
        controller: 'ownedCtrl'
      }
    }
  })

  .state('tabsController.expirations', {
    url: '/expirations',
    views: {
      'tab2': {
        templateUrl: 'templates/expirations.html',
        controller: 'expirationsCtrl'
      }
    }
  })

  .state('tabsController.groceryList', {
    url: '/tobuy',
    views: {
      'tab3': {
        templateUrl: 'templates/groceryList.html',
        controller: 'groceryListCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

//Set a fallback state so that the login get's called as first route
$urlRouterProvider.otherwise('/login')

  

});