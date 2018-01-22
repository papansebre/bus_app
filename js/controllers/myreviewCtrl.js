App.controller('myreviewCtrl', function($scope, $cordovaOauth, $http,ionicToast, $timeout,ionicDatePicker, $q, $ionicLoading, $ionicModal, WebService, $rootScope) {

 $scope.$on("$ionicView.beforeEnter", function(event, data){
 	
    if(localStorage.getItem('userData')!=null){
      $rootScope.userData=JSON.parse(localStorage.getItem('userData'));
      $rootScope.userDetails = $rootScope.userData;
      $scope.getTripDetails($rootScope.userDetails.id);
    }


  
 });

 $scope.getTripDetails = function(id){
    var link = "get_trip_details";
    var post_data = {'id' : id };
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
    promise.then(function(data){
        if(data.status=='true'){
            $scope.noTrips = false;
            $rootScope.tripDetails = data.data;
            console.log($rootScope.tripDetails);
        }
        else{
            $scope.noTrips = true;
            $scope.noBuserror = data.message;
        }
        $ionicLoading.hide();
    });
 };

 $scope.saveProfile = function(){
 	console.log($rootScope.userDetails);
 	var link = "update_user_info";
 	var post_data = $rootScope.userDetails;
 	WebService.show_loading();
 	var promise = WebService.send_data(link,post_data,"post");
 	promise.then(function(data){
        if(data.status=='success'){
            localStorage.setItem('userData', JSON.stringify($rootScope.userDetails)); 
        }
 		$ionicLoading.hide();
        ionicToast.show(data.message, 'bottom', false, 2500);
 	});
 };
 $scope.cancel_edits = function(){
	//alert("cancel");
 	$rootScope.userData=JSON.parse(localStorage.getItem('userData'));
    $rootScope.userDetails = $rootScope.userData;
 };

 $scope.tripModal = function(trip){
    $scope.trip = trip;
    $scope.modal4.show();
 }
























 $ionicModal.fromTemplateUrl('templates/modal4.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal4 = modal;
 });





  /*******************Datepicker***********************/
  	/*var sample = new Date(2017,2,4);*/
    
    var currentYear = (new Date).getFullYear();
    var curr_month = (new Date).getMonth()+1;
    var currentday = (new Date).getDate();
    
    var max= currentYear;
    var min= currentYear-60;
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

        $rootScope.userData=JSON.parse(localStorage.getItem('userData'));
      	$rootScope.userDetails = $rootScope.userData;
        if($rootScope.userDetails.dob!='' && $rootScope.userDetails.dob!=null){
            var old_dob = $rootScope.userDetails.dob;
            var dmy = old_dob.split("/");
            var sample = new Date(dmy[2],dmy[0]-1,dmy[1]);
        }
        else{
            var sample = new Date();
        }
        console.log(sample);

    var ipObj1 = {
        callback: function (val) {  //Mandatory
        	var n_dob = new Date(val);
			var dd = n_dob.getDate();
			var mm = n_dob.getMonth()+1; //January is 0!
			var yyyy = n_dob.getFullYear();
			if(dd<10){
			    dd='0'+dd;
			} 
			if(mm<10){
			    mm='0'+mm;
			} 
			var d = mm+'/'+dd+'/'+yyyy;
			$rootScope.userDetails.dob = d;
            /*$scope.dateField = val;
            var str = $scope.dateField;
            var date = new Date(str),
            mnth = ("0" + (date.getMonth()+1)).slice(-2),
            day  = ("0" + date.getDate()).slice(-2);
            $scope.searchData.book_date = [date.getFullYear(),mnth,day].join("-");*/
            
        },
       
        from: test1 , //Optional
        to:  test2, //Optional
        inputDate: sample,      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };


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




});