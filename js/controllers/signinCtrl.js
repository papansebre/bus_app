App.controller('signinCtrl', function($scope,$state, $cordovaOauth,ionicToast, $http, $timeout, $q, $ionicLoading, $ionicModal, WebService, $rootScope) {

/*if(localStorage.getItem('userData')){
  $state.go('app.search-rslts');
}*/

/*$scope.$on("$ionicView.enter", function(event, data){
    asa
 });*/



/**********************Google Login********************************/  
  $scope.googleLogin = function(){
    $cordovaOauth.google("745132226298-6u9892fkenbqko7bg53j5obfo910vch8.apps.googleusercontent.com", ["email", "profile"]).then(function(result) {
      $scope.showProfile = false;
      $http.get("https://www.googleapis.com/plus/v1/people/me", {params: {access_token: result.access_token }})
        .then(function(res) {
           $scope.showProfile = true;
           $scope.details = res.data;
        }, function(error) {
            alert("Error: " + error);
        });
    }, function(error) {
      alert('login falied');
    });
  }

/**********************End Google Login*****************************/ 




/**********************Facebook Login*******************************/


  $scope.facebookSignIn = function() {
      
   facebookConnectPlugin.getLoginStatus(function(success){
           $ionicLoading.show({
              template: 'Logging in...'
           });
           facebookConnectPlugin.login(['email', 'public_profile','user_likes','user_about_me','user_birthday','user_friends','user_relationships','user_work_history'], fbLoginSuccess, fbLoginError);
    });
  };

  var fbLoginSuccess = function(response){
      if(!response.authResponse){
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;
    
      getFacebookProfileInfo(authResponse).then(function(profileInfo){
      $ionicLoading.hide();
      var post_data = {'username':profileInfo.name,'firstname':profileInfo.first_name,'lastname':profileInfo.last_name,'email_id':profileInfo.email,'birthdate':profileInfo.birthday,'gender':profileInfo.gender,'city':profileInfo.location,profile_pic:"http://graph.facebook.com/" + authResponse.userID + "/picture?type=large",fb_id:authResponse.userID};
      console.log(post_data);
      var link = 'fbLogin';
      /*var promise = WebService.send_data(link,post_data,"post");
        promise.then(function(data){
          console.log(data);
          if(data.status=='success'){
            $scope.user_data = {
                  "user_id": data.profile.id,
                  "username": data.profile.username,
                  "email_id": data.profile.email_id,
                  "phone_no": data.profile.phone_no,
                  "profile_pic": data.profile.profile_pic,
                  "user_type":data.profile.user_type,
                  "city":data.profile.city,
                  "country":data.profile.country
            };  


          } else {
            $ionicLoading.hide();
            alert('login failed');
          }
          
        });*/
     },function(fail){
        console.log('profile info fail', fail);
     });
  };

  var fbLoginError = function(error){
      console.log('fbLoginError', error);
      $ionicLoading.hide();
  };

  var getFacebookProfileInfo = function(authResponse){
     var info = $q.defer();
     facebookConnectPlugin.api('/me?fields=id,name,email,first_name,last_name,about,gender,birthday,location,likes&access_token=' + authResponse.accessToken, null,
               function (response) {
                  info.resolve(response);
               },
               function (response) {
                  info.reject(response);
      });
      return info.promise;
  };


/**********************End Facebook Login*********************************************/


/******************************** MODALS ***************************************/

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/forgot.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal5 = modal;
  });


  $scope.sign_in = function(){
    
    $scope.modal.show();
  }

  $scope.hideSignup = function(){
    $scope.modal2.hide();
    
  }
  


  $scope.sign_up = function(){
    $scope.regData={};
    $scope.modal2.show();
  }

  $scope.forgot = function(){
    $scope.modal5.show();
  }


/*************************Sign Up*********************************************/

$scope.regData={};
$scope.doSignUp = function() { 
    $scope.error_msg = false;
    var link = 'user_signup';
    var post_data = $scope.regData;   
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
     
      promise.then(function(data){
        
        $scope.showMessage = true;
          if(data.status=='success'){
             var user_data = {
                  "id": data.user.id,
                  "username": data.user.username,
                  "name": data.user.name,
                  "dob": data.user.dob,
                  "image": data.user.image,
                  "gender":data.user.gender,
                  "mob":data.user.mob
            };  
            localStorage.setItem('userData', JSON.stringify(user_data)); 
            $rootScope.userData=JSON.parse(localStorage.getItem('userData'));
            $scope.showMessage = data.message;
            if($rootScope.checkStatus==true){
              $state.go('app.search');
            } else if($rootScope.checkStatus==false){
              $state.go('app.seat_arrangement');
            }
            $ionicLoading.hide();
            $timeout(function() {
                $scope.modal2.hide();
             }, 1500);
          }else{ 
            $ionicLoading.hide(); 
            $scope.showMessage = data.message;
          }
      });
};


/******************************End Sign Up****************************************/

/*************************Sign In*********************************************/

$scope.logData={};
$scope.showlogMessage = false;
$scope.doSignIn = function() {
    $scope.error_msg = false;
    var link = 'user_signin';
    var post_data = $scope.logData;   
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
     
      promise.then(function(data){
          if(data.status=='success'){
             var user_data = {
                  "id": data.user.id,
                  "username": data.user.username,
                  "name": data.user.name,
                  "dob": data.user.dob,
                  "image": data.user.image,
                  "gender":data.user.gender,
                  "mob":data.user.mob
            };   
            localStorage.setItem('userData', JSON.stringify(user_data)); 
            $rootScope.userData=JSON.parse(localStorage.getItem('userData'));
            $scope.showlogMessage = data.message;
            if($rootScope.checkStatus==true){
                $state.go('app.search');
            } else if($rootScope.checkStatus==false){
                $state.go('app.seat_arrangement');
            }
            $ionicLoading.hide();
            $timeout(function() {
                 $scope.modal.hide();
            }, 1500);
          }else{ 
            $scope.showlogMessage = true;
            $scope.showlogMessage = data.message;
            $ionicLoading.hide();
          }
      });
};


/******************************End Sign In****************************************/
$scope.pass ={};
$scope.passwordMessage=false;
$scope.dochangePassword = function(){
    var link = 'change_password';
    $scope.pass.id = $rootScope.userData.id;
    var post_data = $scope.pass;
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
     
    promise.then(function(data){
      $scope.passwordMessage=true;
      $scope.psswrdRes = data;
      $ionicLoading.hide();
    });

}

$scope.u = {};
$scope.doForgot = function(){
    var link = 'forgot_password';
    var post_data = {'email_id' : $scope.u.emailF};
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
     
    promise.then(function(data){
      ionicToast.show(data.message, 'bottom', false, 2500);
      $ionicLoading.hide();
    });
}


})

