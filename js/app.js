// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives','ngCordova','ngCordovaOauth'])

.run(function($ionicPlatform) {
  if (window.Connection) {
       if (navigator.connection.type == Connection.NONE) {
        //alert('dsfsdfdfsd');
         toast.show("Internet is disconnected on your device");
       };
     };

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

/* To disable back button in a particular state */

 /* $ionicPlatform.registerBackButtonAction(function(){ 
    if($ionicHistory.currentStateName === 'app.seat_arrangement'){
      alert("no back");
      //event.preventDefault();
      $state.go('app.search-rslts');
    }else{
      $ionicHistory.goBack();
    }
  }, 100);*/

/* To disable back button in case of intermediate login */

})




