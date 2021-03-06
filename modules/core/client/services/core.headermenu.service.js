// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('core')
  .service('headermenuService', headermenuService);

  headermenuService.$inject = ['$resource','$http'];
  function headermenuService($resource,$http) {
    
	  
	 var headermenu = {};
	  
	
	 
	
	 /*
	  * Function : getheadermenu
	  * Description : get one headermenu details
	 
	  */
	 headermenu.getTopMenuList = function(role){
		 console.log(role);
		return $http({
			   url: '/api/headermenu',
			   method: "POST",
			   params:{'role':role}
			
		   });
	}
	
	  /*
	  * Function : getheadermenu
	  * Description : get one headermenu details
	 
	  */
	 headermenu.getTopSubMenuList = function(){
		return $http({
			   url: '/api/headermenu/submenu',
			   method: "POST"
			
		   });
	}
	
	 return headermenu;
	  
	 
  }
  

}());
