App.controller('selectSeat', function($scope,$state, $ionicHistory,$cordovaOauth, $http, $timeout, $q, $ionicLoading, $ionicModal, WebService, $rootScope) {

console.log($rootScope.details);
//----------------------------------------------------select seat----
$rootScope.seats=[];
$rootScope.amount = 0;
$rootScope.num =0;
//----------------------------------------------------select seat----



$scope.Selectedseat = function(elm){
  //console.log(elm);

      //--------seat scope-----------------------
      var seat = $('#'+elm).data("seat");
      var amt = $('#'+elm).data("rate");
      var typ = $('#'+elm).data("status");
      if(typ!= true){
          var i = $.inArray(seat, $rootScope.seats);
            if (i > -1) {
                $rootScope.seats.splice(i, 1);
            } else {
                $rootScope.seats.push(seat);
          
            }
      }

        $rootScope.num = $rootScope.seats.length;
        if($rootScope.num==0){
          $rootScope.amount = 0;
        }
        else{
          $rootScope.amount = amt * $rootScope.num;
        }
        
        
      //------------------------------------------

      var existB =$('#'+elm).hasClass('sseater'); 
      var existB2 =$('#'+elm).hasClass('sseater');
    
      if(existB !=true || existB2 !=true){


      //seat = $('#'+elm).data("seat");
      bus = $('#'+elm).data("bus");
      //amount = $('#'+elm).data("rate");
      classs =$('#'+elm).data("class");
      //alert($( elm ).hasClass( classs ));
      if($('#'+elm).hasClass( classs )){
         $('#'+elm).removeClass(classs); 
         if(classs=='seater'){
             $('#'+elm).addClass('selectedseat'); 
              $('#'+elm).addClass('selecteds'); 
         }else{
             $('#'+elm).addClass('selectedsleeper'); 
             $('#'+elm).addClass('selecteds'); 
         }
        
      }else{
          $('#'+elm).removeClass('selectedseat');
          $('#'+elm).removeClass('selecteds');
          
          $('#'+elm).removeClass('selectedsleeper'); 
         $('#'+elm).addClass(classs);
      }
       var texts= $("#bus"+bus+" .selecteds").map(function() {
             return $(this).data("seat");
        }).get();

      if(texts.length >6){
         alert("A maximum of 6 Seats can be selected");
           $('#'+elm).removeClass('selectedseat');
          $('#'+elm).removeClass('selecteds');
           $('#'+elm).removeClass('selectedsleeper'); 
        }

      var texts= $("#bus"+bus+" .selecteds").map(function() {
             return $(this).data("seat");
         }).get();
     /* $("#bus"+bus+ " .seat_no").text(texts); 
      $("#bus"+bus+ " .seat_nos").val(texts);
      $("#bus"+bus+ " .rate_bus").text(amount);
      $("#bus"+bus+ " .total_rate").text(amount*texts.length);
      console.log(("#bus"+bus+ " .seat_no"+seat));*/

      }
  }


 $scope.GologinBack = function() {
    $ionicHistory.goBack();
    $scope.notifyIonicGoingBack();
  };
  $scope.notifyIonicGoingBack = function() {
    //alert("back");
   $state.go('app.search-rslts');
}


});