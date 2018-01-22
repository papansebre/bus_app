angular.module('app.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller:'AppCtrl'
  })  

  .state('app.search', {
    cache : false,
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller:'AppCtrl'
      }
    }
  })

   .state('app.access-denied', {
    cache : false,
    url: '/access-denied',
    views: {
      'menuContent': {
        templateUrl: 'templates/access-denied.html',
        controller:'AppCtrl'
      }
    }
  })
  
  
  .state('app.search-rslts', {
    cache : false,
    url: '/search-rslts',
    views: {
      'menuContent': {
        templateUrl: 'templates/search-rslts.html',
        controller:'SearchCtrl'
      }
    }
  })
  
  .state('app.seat_arrangement', {
    cache :false,
    url: '/seat_arrangement',
    views: {
      'menuContent': {
        templateUrl: 'templates/seat_arrangement.html',
        controller:'selectSeat'
      }
    }
  })  
  
  .state('app.boardig-point', {
    url: '/boardig-point',
    views: {
      'menuContent': {
        templateUrl: 'templates/boardig-point.html',
        controller:'bookingCtrl'
      }
    }
  })
  
  
  .state('app.my-popover', {
    url: '/my-popover',
    views: {
      'menuContent': {
        templateUrl: 'templates/my-popover.html'
      }
    }
  })  
  
  .state('app.droping-point', {
    url: '/droping-point',
    views: {
      'menuContent': {
        templateUrl: 'templates/droping-point.html'
      }
    }
  })  
    
  .state('app.booking-dtl', {
    cache: false,
    url: '/booking-dtl',
    views: {
      'menuContent': {
        templateUrl: 'templates/booking-dtl.html',
        controller:'bookingCtrl'
      }
    }
  })  
  
  .state('app.filter', {
    cache:false,
    url: '/filter',
    views: {
      'menuContent': {
        templateUrl: 'templates/filter.html',
        controller:'filterCtrl'
      }
    }
  })  
  
  .state('app.tab', {
    cache :false,
    url: '/tab',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab.html',
        controller: 'myreviewCtrl'
      }
    }
  })  
  
  .state('app.my-profile', {
    url: '/my-profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/my-profile.html'
      }
    }
  })
  
  .state('app.cancel', {
    cache : false,
    url: '/cancel',
    views: {
      'menuContent': {
        templateUrl: 'templates/cancel.html',
        controller:'cancelCtrl'
      }
    }
  })
   .state('app.changePswrd', {
    cache : false,
    url: '/changePassword',
    views: {
      'menuContent': {
        templateUrl: 'templates/change-password.html',
        controller:'signinCtrl'
      }
    }
  })
            
  .state('app.landing', {
    cache : false,
    url: '/landing',
    views: {
      'menuContent': {
        templateUrl: 'templates/landing.html',
        controller: 'signinCtrl'
      }
    }    
  })
  
  
 .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
  })
  
  
  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
       
      }
    }
  })
  

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
      
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
})

.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })