(function () {
  'use strict';

  angular
    .module('core')
    .controller('CmsReviewActionListController', CmsReviewActionListController);



    CmsReviewActionListController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','cmsReviewActionService'];

  function CmsReviewActionListController($scope, $http, $state, $stateParams, Upload,cmsReviewActionService) {

  $scope.formdata = {};
  $scope.status ='0';
  $scope.cmsReviewActionService = cmsReviewActionService;
 /////////////////////select/////////////////////////////

///////////////////////////////////////////////////////

$scope.currentLan=localStorage.getItem('currentLang').toString();
       
$scope.setasDefault=function(id)
{
    $http({
          url: '/api/admin/setasDefault1',
          method: "POST",
          data:{'id':id}
      })
      .then(function(response) {
        $state.reload();
              // success
      }, 
      function(response) { // optional
              // failed
      });
}

/////////////////////////////////////////////////////////////////////////
$scope.choices = [{id: 'choice1'}];
//$scope.choices.length	
 
 $scope.addNewChoice = function() 
 {
       var newItemNo = $scope.choices.length+1;
       $scope.choices.push({'id':'choice'+newItemNo});
 };
       
 $scope.removeChoice = function(val) 
 {
    if($scope.choices.length>1)
    {
       $scope.choices.splice(val,1);
    }
      
 };
//////////////////////////////////////////////////////////////////////
 /*
	   * FUnction : delOrderCreation
	   * Description : delete OrderCreation By Id
	   * Owner :ck
	   */

$scope.getcmsReviewAction = function(){
  //console.log(0);
   $scope.cmsReviewActionService.getcmsReviewAction().then(function(result){
   if(result.statusText = "OK"){
     $scope.list = result.data;
//console.log(1);
//console.log(result.data);
    }else{
      
    }
 });
}
$scope.getcmsReviewAction();


///////////////////////////////////////////////////////////////////////

    /*
	   * FUnction : delOrderCreation
	   * Description : delete OrderCreation By Id
	   * Owner :jeeja
	   */
    $scope.delcmsReviewAction = function(userId){
   
      swal({
              title: 'Are you sure?',
              text: "You want to delete this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if(result){
               $scope.cmsReviewActionService.delcmsReviewAction(userId).then(function(result){
              if(result.statusText = "OK"){

              swal('Deleted!',
                   'It has been deleted.',
                   'success')

              $state.reload();
               }else{
                 
               }
            })
            }
            })
     
    }
///////////////////////////////////////////////////////////////////////

 function getActionBtns(){


 $scope.addpage  = document.querySelectorAll(".add-action");
 $scope.addpage[0].addEventListener("click", $scope.newpage, false);

 $scope.editpage= document.querySelectorAll(".edit-action");
 $scope.editpage[0].addEventListener("click", $scope.editpages, false);

 var delpage= document.querySelectorAll(".delete-action");
 delpage[0].addEventListener("click", $scope.delpage, false);



 }
$scope.chkall=function(){
$scope.editpage[0].removeAttribute("href");
 
}
$scope.addchkval=function(linkid){
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
//console.log(linkid)
//console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/email/editcmsreviewaction/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('emailaddcmsreviewaction');
}
$scope.editpages=function(){
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>0){
  console.log($scope.editpage[0].getAttribute("href"));
if($scope.editpage[0].getAttribute("href")){
document.location=$scope.editpage[0].getAttribute("href");
}
 }
 
}
$scope.chkValue=[];


$scope.delpage=function(){
  $scope.chkValue=[];
 
  //$state.go('addlanguage');
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
//console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }

  var userId=$scope.chkValue;
//console.log(userId);
  swal({
    title: 'Are you sure?',
    text: "You want to delete checked items!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if(result){
     $scope.cmsReviewActionService.delCheckedcmsReviewAction(userId).then(function(result){
    if(result.statusText = "OK"){
    swal('Deleted!',
          'Item has been deleted.',
          'success')
          $state.reload();
     }else{
       
     }
  })
  }
  })

}
setTimeout(getActionBtns, 1500);         

 }






}());
