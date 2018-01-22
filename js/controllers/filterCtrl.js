App.controller('filterCtrl', function($scope, $state, $cordovaOauth, $http,ionicToast, $timeout,ionicDatePicker, $q, $ionicLoading, $ionicModal, WebService, $rootScope) {

$scope.$on("$ionicView.enter", function(event, data){
  $scope.fiterOptions(); 
  $scope.s={};
  $rootScope.busTfilter = [];
  $rootScope.busNfilter = [];
  $rootScope.BPfilter = [];
  $rootScope.DPfilter = [];
  $rootScope.amentityfilter = [];
});


$scope.fiterOptions = function(){
	var link = 'filter_option';
    var post_data = $rootScope.searchData;   
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");

    promise.then(function(data){
        $rootScope.filters=data;
        $scope.bus_types = $rootScope.filters.result.bus_types;
        $ionicLoading.hide();
    });
};


/******************************SAVE FILTERS IN MODAL ****************************************/

$scope.checkBus = function(bus){
	var i = $.inArray(bus, $rootScope.busNfilter);
        if (i > -1) {
            $rootScope.busNfilter.splice(i, 1);
			console.log($rootScope.busNfilter);
        } else {
            $rootScope.busNfilter.push(bus);
			console.log($rootScope.busNfilter);
			
        }
}

$scope.checkBoarding = function(bp){
	var i = $.inArray(bp, $rootScope.BPfilter);
        if (i > -1) {
            $rootScope.BPfilter.splice(i, 1);
			console.log($rootScope.BPfilter);
        } else {
            $rootScope.BPfilter.push(bp);
			console.log($rootScope.BPfilter);
			
        }
}

$scope.checkDropping = function(dp){
	var i = $.inArray(dp, $rootScope.DPfilter);
        if (i > -1) {
            $rootScope.DPfilter.splice(i, 1);
			console.log($rootScope.DPfilter);
        } else {
            $rootScope.DPfilter.push(dp);
			console.log($rootScope.DPfilter);
			
        }
}

$scope.checkType = function(btype){

	var i = $.inArray(btype, $rootScope.busTfilter);
        if (i > -1) {
            $rootScope.busTfilter.splice(i, 1);
			console.log($rootScope.busTfilter);
            $('#bus_type_'+btype).removeClass("activeclr");
        } else {
            $rootScope.busTfilter.push(btype);
			console.log($rootScope.busTfilter);
            $('#bus_type_'+btype).addClass("activeclr");
			
        }
    
}

$scope.checkAmentity = function(amen){
	var i = $.inArray(amen, $rootScope.amentityfilter);
        if (i > -1) {
            $rootScope.amentityfilter.splice(i, 1);
			console.log($rootScope.amentityfilter);
        } else {
            $rootScope.amentityfilter.push(amen);
			console.log($rootScope.amentityfilter);
			
        }
}

/****************************** SAVE FILTERS IN MODAL ends**********************************/

/****************************** MODALS ****************************************/

$ionicModal.fromTemplateUrl('templates/modal3.html', {
 scope: $scope
 }).then(function(modal) {
 $scope.modal3 = modal;
 });

$scope.showmodal3 = function() {	
 console.log('h');
 $scope.modal3.show();
 }

//------------bustype----------
$ionicModal.fromTemplateUrl('templates/modalBusName.html', {
 scope: $scope
 }).then(function(modal) {
 $scope.modalBusName = modal;
 });

$scope.showTravels = function() {	
 $scope.travels = $rootScope.filters.result.bus_names;
 $scope.modalBusName.show();
 }


//------------boarding points----------
$ionicModal.fromTemplateUrl('templates/modalBoarding.html', {
 scope: $scope
 }).then(function(modal) {
 $scope.modalBoarding = modal;
 });

$scope.showBoarding = function() {	
 $scope.boardingP = $rootScope.filters.result.pointss;
 $scope.modalBoarding.show();
 }

//------------dropping points----------
$ionicModal.fromTemplateUrl('templates/modalDropping.html', {
 scope: $scope
 }).then(function(modal) {
 $scope.modalDropping = modal;
 });

$scope.showDropping = function() {	
 $scope.droppingP = $rootScope.filters.result.Stoppoint;
 $scope.modalDropping.show();
 }

 //------------ amentities ----------
$ionicModal.fromTemplateUrl('templates/modalAmentities.html', {
 scope: $scope
 }).then(function(modal) {
 $scope.modalAmentities = modal;
 });

$scope.showAmentities = function() {	
 $scope.amentity = $rootScope.filters.result.Amenities;
 $scope.modalAmentities.show();
 }




/****************************** END MODALS ****************************************/








});