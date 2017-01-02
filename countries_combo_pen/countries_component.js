/********
This code is created by Wafaa Hamdy : Full Stack Developer , 

*****  countries auto populated select element component that can be used within any angular application and is populated from .Json file

******/

(function () {
'use strict';

angular.module('countriesSelectApp', [])

.controller('countriesSelectController', countriesSelectController)
.controller('test', test)   /// test controller is created for testiong only and will later be replaced by your controller 

.service('countriesSelectService', countriesSelectService)

.component('countriesSelect', {
 // templateUrl: 'countries_component_template.html',
  template: '<div ng-if = "$ctrl.errmsg" > Error :  {{$ctrl.errmsg}}</div><div class="form-group" ng-if = "!$ctrl.errmsg"><select  ng-model="$ctrl.csValue"  name="{{$ctrl.name}}" id="{{$ctrl.id}}"> <option ng-repeat="option in $ctrl.list" value="{{option.code}}">{{option.name}}</option></select> </div>',
  controller: countriesSelectController,
  bindings: {
    name: '@',
	id:'@',
	jsonUrl:'@',
	csValue:'='
	  }
});

function test() {
	this.state = "nothing"
	console.log (this.state);
}
//  controler
countriesSelectController.$inject = ['countriesSelectService'];
function countriesSelectController(countriesSelectService) {
 var ctrl = this ;
 ctrl.scValue = "" ;
 ctrl.list = [] ;
 console.log (ctrl.jsonUrl);
  
 countriesSelectService.getList(ctrl.jsonUrl)
     .then(function (result) {
		ctrl.errmsg  = "" ;
		ctrl.list = result.data ;
		console.log (ctrl.list);
		
 }).catch(function (error) {
	   ctrl.errmsg  = error.data ;
	  }) ;	 
}


// service to load the json data
countriesSelectService.$inject = ['$http']
function countriesSelectService($http) {
  var service = this;
   
 service.getList = function (URL) {
	  var response = $http({
      method: "GET",
      url: (URL)
    });  
	
   return response; 
   }; 
    
}//end of service




})();
