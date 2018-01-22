 var App = angular.module('app.controllers', ['ionic','ionic-datepicker','ionic-toast','ngCordova']);

 App.controller('AppCtrl', function($scope, $ionicModal, $state,$timeout,$cordovaNetwork,$ionicPopover,ionicToast,$q,WebService,$ionicLoading,$rootScope,ionicDatePicker) {
	
  $scope.$on("$ionicView.enter", function(event, data){
    if(localStorage.getItem('userData')!=null){
      $rootScope.userData=JSON.parse(localStorage.getItem('userData'));
    }
  
 });
 /* ----------------check network-----------------*/

document.addEventListener("deviceready", function () {
    var type = $cordovaNetwork.getNetwork()
    var isOnline = $cordovaNetwork.isOnline()
    var isOffline = $cordovaNetwork.isOffline()

    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      //alert('error');
      var offlineState = networkState;
    })

  }, false);

  /* ----------------check network-----------------*/

  /* ----------------check key-----------------*/
  post_data = {'app_key': my_key};
  link="get_app_details";
  WebService.show_loading();
  var promise = WebService.send_data(link,post_data,"post");
  promise.then(function(data){
    $timeout(function(){
      $ionicLoading.hide(); 
    },1000); 
    var status = data.status;
    console.log(status);
    if(status=='failed'){
     console.log('trb-blocked'); 
     $state.go('app.access-denied');
    } 
  });

  /* ----------------check key-----------------*/
  

$rootScope.busTfilter = [];
$rootScope.busNfilter = [];
$rootScope.BPfilter = [];
$rootScope.DPfilter = [];
$rootScope.amentityfilter = [];
 
$rootScope.checkStatus=true;

/*********************Log Out***************************/
$scope.logout = function(){
  localStorage.removeItem('userData');
  delete $rootScope.userData;
  delete $rootScope.tripDetails;
  $state.go('app.search');
}


/*******************End Log Out***********************/

  
/*********************Search City***************************/

  $rootScope.searchData = {};
  $scope.data = {"from_list" : [],"to_list" : []};

	 $scope.search_city = function(){
    if($rootScope.searchData.from!='' && $rootScope.searchData.from!=undefined){
      var deferred = $q.defer();
      var link = 'search_city';
        var post_data = {'term':$rootScope.searchData.from,'type':'board_point'};   
        WebService.show_loading();
        var promise = WebService.send_data(link,post_data,"post");
       
        promise.then(function(data){        
          $ionicLoading.hide();
          deferred.resolve(data);    
          $scope.data.from_list = data.result;
        });
        return deferred.promise;
    } 
    else {
        $scope.data.from_list = [];
    }
   } 


  $scope.doSelect = function(board_point){
    $rootScope.searchData.from = board_point;
    $(".boardlist").hide();
  }

   $scope.search_city_drop = function(){
      var deferred = $q.defer();
      var link = 'search_city';
      if($rootScope.searchData.to!='' && $rootScope.searchData.to!= undefined){
        var post_data = {'term':$rootScope.searchData.to,'type':'drop_point'};   
        WebService.show_loading();
        var promise = WebService.send_data(link,post_data,"post");
       
        promise.then(function(data){        
          $ionicLoading.hide();
          deferred.resolve(data);    
          $scope.data.to_list = data.result;
        });
        return deferred.promise;
      } else {
        $scope.data.to_list = [];
      }
   }


  $scope.doSelect_drop = function(drop_point){
    $rootScope.searchData.to = drop_point;
    $(".droplist").hide();
  }

  /*******************End Search City***********************/


  /*******************Datepicker***********************/


    
    var currentYear = (new Date).getFullYear();
    var curr_month = (new Date).getMonth()+1;
    var currentday = (new Date).getDate();
    
    var max= currentYear+1;
    var min= currentYear;
        minAge = currentday+"-"+curr_month+"-"+min;
        maxAge = currentday+"-"+curr_month+"-"+max;

        var minD = minAge;
        var maxD = maxAge;
        
        var newdate = minD.split("-").reverse().join(",");
        var newdate2 = maxD.split("-").reverse().join(",");
        var minDate = newdate;
        var maxDate = newdate2;
        var test1 =new Date(minDate);
        var test2 =new Date(maxDate);

        mnth = ("0" + (test1.getMonth()+1)).slice(-2),
        day  = ("0" + test1.getDate()).slice(-2);
        $rootScope.searchData.book_date = [test1.getFullYear(),mnth,day].join("-");

    var ipObj1 = {
        callback: function (val) {  //Mandatory
           
            $scope.dateField = val;
            var str = $scope.dateField;
            var date = new Date(str),
            mnth = ("0" + (date.getMonth()+1)).slice(-2),
            day  = ("0" + date.getDate()).slice(-2);
            $rootScope.searchData.book_date = [date.getFullYear(),mnth,day].join("-");
            
        },
       
        from: test1 , //Optional
        to:  test2, //Optional
        inputDate: test1,      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

/*******************End Datepicker***********************/


/*******************Search Bus***********************/

  $scope.doSearch = function(){
    console.log($rootScope.searchData);
    //$scope.error_msg = false;
    var link = 'bus_search';
    var post_data = $rootScope.searchData;   
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");

    promise.then(function(data){
        $rootScope.busDetails=data;        
        $state.go('app.search-rslts');
       /* $scope.showMessage = true;
          if(data.status=='success'){
             var user_data = {
                  "user_id": data.user.id,
                  "username": data.user.username,
                  "name": data.user.name,
                  "dob": data.user.dob,
                  "image": data.user.image,
                  "gender":data.user.gender,
                  "mob":data.user.mob
            };   
            localStorage.setItem('userData', JSON.stringify(user_data)); 
            $rootScope.userData=JSON.parse(localStorage.getItem('userData'));
            $scope.modal2.hide();
          }else{ 
            $scope.showMessage = data.message;
          }*/
        $ionicLoading.hide();
      });
  }


/*******************Search Bus***********************/

  

	// pop-over
	
	 /*$scope.popover ='';*/
  $ionicPopover.fromTemplateUrl('templates/my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  })
	

 
	
	// Toast
	
	
  $scope.showToast = function(){
  <!-- ionicToast.show(message, position, stick, time); -->
  ionicToast.show('This is a toast at the top.', 'bottom', false, 1000);
  };
  $scope.hideToast = function(){
  ionicToast.hide();
  };
	
	
  
  
  
 $scope.IsVisible = false;
 $scope.ShowHide = function () {
 //If DIV is visible it will be hidden and vice versa.
 $scope.IsVisible = $scope.IsVisible ? false : true;
 }
      
	
// Datepicker

$scope.currentDate = new Date();
$scope.minDate = new Date(2016, 6, 1);
$scope.maxDate = new Date(2020, 6, 1);
$scope.datePickerCallback = function (val) {
if (!val) { 
console.log('Date not selected');
} else {
 console.log('Selected date is : ', val);
    }
}

// Modal


 $scope.loginData = {};


   $ionicModal.fromTemplateUrl('templates/modal4.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal4 = modal;
  });

	
	
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

});

   
App.controller('myreviewCtrl', function($scope) {

})
   
App.controller('home2Ctrl', function($scope) {

})
   
App.controller('supportCtrl', function($scope) {

})






