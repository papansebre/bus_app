App.controller('SearchCtrl', function($scope, $state, $ionicHistory,$cordovaOauth, $http,ionicToast, $timeout,ionicDatePicker, $q, $ionicLoading, $ionicModal, WebService, $rootScope,$ionicPlatform) {

 $ionicHistory.nextViewOptions({
    historyRoot: true
});
 
 $scope.$on("$ionicView.beforeEnter", function(event, data){
    console.log($rootScope.busDetails);
    $scope.status = $rootScope.busDetails.status;
    console.log($scope.status);
 });


$scope.viewFilter = function(){
	$state.go('app.filter');
}

$scope.selectOneBus = function(bus){
    $rootScope.oneBus = bus;
    $rootScope.details = $rootScope.oneBus;
    console.log($rootScope.oneBus);
	if(localStorage.getItem('userData')!=null){
		$rootScope.checkStatus=true;
		console.log($rootScope.checkStatus);
		$state.go('app.seat_arrangement');
    }
    else{
    	$rootScope.checkStatus=false;
    	console.log($rootScope.checkStatus);
    	$state.go('app.landing');
    }
};


/******************************* FOR FILTERS ******************************/

	$scope.nameFilter = function(getbusdetails) {
        if ($rootScope.busNfilter.length > 0) {
            if ($.inArray(getbusdetails.bus_name, $rootScope.busNfilter) < 0)
                return;
        }
        return getbusdetails;
    };
   $scope.typeFilter = function(getbusdetails) {
        if ($rootScope.busTfilter.length > 0) {
            if ($.inArray(getbusdetails.bus_type, $rootScope.busTfilter) < 0)
                return;
        }
        return getbusdetails;
    };


/******************************* FOR FILTERS ******************************/



 $scope.GologinBack = function() {
    $ionicHistory.goBack();
    $scope.notifyIonicGoingBack();
  };
  $scope.notifyIonicGoingBack = function() {
    //alert("back");
   $state.go('app.search');
}

});


