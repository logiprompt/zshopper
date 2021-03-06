(function () {
  'use strict';
  angular
    .module('products')
    .controller('ProgroupController', ProgroupController);
    ProgroupController.$inject = ['$scope','$http','$state','$stateParams','extrafieldService','ProductsService'];
  function ProgroupController ($scope, $http, $state, extrafieldService,ProductsService) {
   //alert(); 
   $scope.formdata = {};
   $scope.status = "0";
   $scope.ProductsService = ProductsService;

/////////////////////defaultLang//////////
 

 
 /////////////////////select/////////////////////////////
 

 ///////////////////////insert////////////////////////////
 

        $scope.rmerrorclass=function(){
                angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
                angular.element(document.querySelectorAll('.tabvalidationErr')).removeClass('tabvalidationErr');
                }
                $scope.adderrorclass=function(cls){
                angular.element(document.querySelector(cls)).addClass('validationErr');
                }
                $scope.taberrorclass=function(cls){
                  angular.element(document.querySelector(cls)).addClass('tabvalidationErr');
                  }

                $scope.validation=function(){
                var error=0;
                $scope.rmerrorclass();
                  if($scope.formdata.category=='' || angular.isUndefined($scope.formdata.category) ){
                    $scope.adderrorclass(".cat");
                    $scope.taberrorclass(".tcat");
                    error=1;
                    }

                    return error;          
            }
                
                
	/*
	 * Function : addExtrafieldGroup
	 * Description : Add extra field group details
	 * Owner : prabin
	 */
	  $scope.addExtrafieldGroup = function(){
		if($scope.formdata.$valid){
		var data = {
				"groupname":$scope.groupName,
				"status" :$scope.status
			  }
		
		  $scope.ProductsService.addExtraFieldGroup(data).then(function(result){
			  if(result.statusText = "OK"){
				  swal("Sccess!", "Successfully added Extra Field Group!", "success");  
				  $state.go('extrafield');
			  }else{
				  swal("error!", "Extra Field Group already exist!", "error");
			  }
			  
		  })
		}
			
	  }
///////////////////////////////////////////////////////////////////////

   
  $scope.openLangModel=function(id){
    
    $scope.formdata.id=id;
  }


 function getActionBtns(){

/*
 $scope.addpage  = document.querySelectorAll(".add-action");
 $scope.addpage[0].addEventListener("click", $scope.newpage, false);

 $scope.editpage= document.querySelectorAll(".edit-action");
 $scope.editpage[0].addEventListener("click", $scope.editpages, false);

 var delpage= document.querySelectorAll(".delete-action");
 delpage[0].addEventListener("click", $scope.delpage, false);
*/


 }
$scope.chkall=function(){
$scope.editpage[0].removeAttribute("href");
 
}
$scope.addchkval=function(linkid){
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
console.log(linkid)
console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/editcat/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('proaddcategory');
}
$scope.editpages=function(){
  
   var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>0){
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
console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }
 
}
setTimeout(getActionBtns, 1000);
 }
}());
