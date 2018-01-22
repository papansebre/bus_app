App.controller('cancelCtrl', function($scope,$state, $cordovaOauth, $http, $timeout, $q, $ionicLoading, $ionicModal, WebService, $rootScope) {

 $scope.$on("$ionicView.beforeEnter", function(event, data){
 	
    if(localStorage.getItem('userData')!=null){
      $rootScope.userData=JSON.parse(localStorage.getItem('userData'));
      $rootScope.userDetails = $rootScope.userData;
    }
 });

$scope.cancelData = {};
$scope.showMessage = '';

$scope.doCancel = function(){
	var link = 'cancel_ticket';
	var post_data = {'user_id' : $rootScope.userDetails.id,'booking_id' : $scope.cancelData.booking_id,'email': $scope.cancelData.email };
	WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
    promise.then(function(data){
    	$scope.showMessage = data.message;
    	$ionicLoading.hide();

        /*$scope.book_id = data.result.booking_id;
        $ionicLoading.hide();
        //--------send mail-----------------
        	$scope.sendMail($scope.book_id);
        //--------send mail-----------------
        $scope.showpaySuccess();*/
    });

	
}

});