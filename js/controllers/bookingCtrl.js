App.controller('bookingCtrl', function($scope, $state, $cordovaOauth, $http,ionicToast, $timeout,ionicDatePicker, $q, $ionicLoading, $ionicModal, WebService,$ionicHistory, $rootScope) {

$scope.b = {};

$scope.selectBoard = function(bp){
	$rootScope.boardPt = bp.board_id;
	console.log($scope.boardPt,bp.dplace);
	$state.go('app.booking-dtl');
}

$scope.user = {};
$scope.custDetails = function(){
	var d = $rootScope.searchData.book_date.split("-"); 
 	var b_date =  d[2]+ "-" +d[1]+ "-" +d[0]; 
 	var seatss = $rootScope.seats.toString();
	var post_data={'customer' :$scope.user,'amount': $scope.amount,'bus_id': $rootScope.oneBus.bus_id ,'route_id': $rootScope.oneBus.route_id,'brdPoint': $rootScope.boardPt,'bdate': b_date,'user_id': $rootScope.userData.id,'seat': seatss};
	var link = 'booking';
	WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
    promise.then(function(data){
        $scope.book_id = data.result.booking_id;
        $ionicLoading.hide();
        //--------send mail-----------------
        	$scope.sendMail($scope.book_id);
        //--------send mail-----------------
        $scope.showpaySuccess();
    });

}

$scope.sendMail = function(bid){
	var post_data={'booking_id' :bid };
	var link = 'email_notification';
	WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
    promise.then(function(data){
    	console.log(data);
    	$ionicLoading.hide();
    });
}

$scope.goTrip = function(){
    $scope.paySuccess.hide();
    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
    });
    $state.go('app.tab');

}

//////-----------------------Modal-------------------------------///////

$ionicModal.fromTemplateUrl('templates/paymentSuccess.html', {
 scope: $scope
 }).then(function(modal) {
 $scope.paySuccess = modal;
 });

$scope.showpaySuccess = function() {	
 $scope.paySuccess.show();
 }



//////-----------------------Modal-------------------------------///////


});