(function () {
  'use strict';

  angular
    .module('core')
    .controller('EmailshipmentcommentsController', EmailshipmentcommentsController);



    EmailshipmentcommentsController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','shipmentcommentsService'];

  function EmailshipmentcommentsController ($scope, $http, $state, $stateParams, Upload, shipmentcommentsService) {

  $scope.formdata = {};
  $scope.formdata.status ='0';
  $scope.shipmentcommentsService=shipmentcommentsService;
 /////////////////////select/////////////////////////////

///////////////////////////////////////////////////////

$scope.currentLan=localStorage.getItem('currentLang').toString();
  console.log($scope.currentLan)
  
  ///////////////////list /////////////////////
  /*
    * Function : get shipmentcomments
    * Description : get shipmentcomments details
    * Owner : anju
    */

  $scope.getShipmentComments = function () {
    console.log(0);
    $scope.shipmentcommentsService.getShipmentComments().then(function (result) {
      if (result.statusText = "OK") {
        $scope.userlist = result.data;
        //console.log(1);
        console.log(result.data);
      } else {

      }
    });
  }
  $scope.getShipmentComments();

///////////////////////////////////////////////////////////////

  /*
       * FUnction : delshipmentcomments
       * Description : delete shipmentcomments id
       * Owner :anju
       * 
       */
  $scope.delShipmentComments = function (userId) {


    swal({
      title: 'Are you sure?',
      text: "You want to delete this !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result) {
        $scope.shipmentcommentsService.delShipmentComments(userId).then(function (result) {
          if (result.statusText = "OK") {
            swal(
              'Deleted!',
              'Shipment Comments has been deleted.',
              'success'
            )
            $state.reload();
          } else {

          }
        })
      }
    })

  }
  ///////////////////////////////////////////////////////////////////////


       
$scope.setasDefault=function(id){

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
 
 $scope.addNewChoice = function() {
       var newItemNo = $scope.choices.length+1;
       $scope.choices.push({'id':'choice'+newItemNo});
     
 };
       
 $scope.removeChoice = function(val) {
         if($scope.choices.length>1){
       $scope.choices.splice(val,1);
         }
      
 };

 function readFile(ev) {

  if (this.files && this.files[0]) {
  var FR= new FileReader();
  FR.onload = function(e) {
    document.getElementById("imgfiles").src= e.target.result;
   ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]=e.target.result;
    //document.getElementById("b64").innerHTML = e.target.result;
  };       
  FR.readAsDataURL( this.files[0] );
  }
 }
 if(document.getElementById("imgfile")!=null){
   document.getElementById("imgfile").addEventListener("change", readFile, false); 
 }

$scope.iconw=function(){

        document.getElementById('imgfile').click();
        
             }

            // $(document).find('#myTable').DataTable();




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
console.log(linkid)
console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/email/editshipmentcomments/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('emailaddshipmentcomments');
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
console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }
  
  
    var userId = $scope.chkValue;
    console.log(userId);
    swal({
      title: 'Are you sure?',
      text: "You want to delete checked items!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result) {
        $scope.shipmentcommentsService.delCheckedShipmentComments(userId).then(function (result) {
          if (result.statusText = "OK") {
            swal(
              'Deleted!',
              'Shipment Comments has been deleted.',
              'success'
            )
            $state.reload();
            //  $scope.getUser();
          } else {

          }
        })
      }
    })
 
}
setTimeout(getActionBtns, 1500);         


 }






}());
