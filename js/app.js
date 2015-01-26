(function(){
	(function(){
		var app = angular.module('HWBox', ['parse']);
		
		function Homework() {
			this.hwName = "Unknown";
			this.hwDescription = "Unknown";
			this.hwDone = false;
			this.hwDueDate = Date.now();
			this.objectId = 0;
			
			this.getInfo = function() {
				return this.color + ' ' + this.type + ' apple';
			};
			this.setData = function(objectId, hwName, hwDescription, hwDone, hwDueDate) {
				this.hwName = hwName;
				this.hwDescription = hwDescription;
				this.hwDone = hwDone;
				this.hwDueDate = hwDueDate;
				this.objectId = objectId;
			};
			
			//{ hwName: "HW3", hwDescription: "Registration System", hwDone: false, objectId: 55, dueDate: 1288323623006 },
		}
	
		app.controller("HWController", ['$scope', '$http', function ($scope, $http) {
			
			this.hws = hwObjects;
			
			this.markAs = function(object, done){
				object.hwDone = (done) ?  true : false;
			}
		}]);
		
		app.controller("CourseController", function(){
			this.crss = crsObjects;
		});
		
		app.controller("TabController", function(){
			this.tab = 0;
			this.setTab = function(tabIndex){
				this.tab = tabIndex;
			};
			this.isSet = function(tabIndex){
				return this.tab === tabIndex;
			};
		});
		
		app.controller("addHWController", function(){
			this.newHW = {};
			this.newHW.hwDueDate = Date.now();
			this.added = false;
			this.lastAddedName = "";
			
			this.addHW = function(){
				this.newHW.objectId = Math.floor((Math.random() * 100)); 
				//this.newHW.hwDone = (this.newHW.hwDone == "true") ? true : false;
				
				hwObjects.push(this.newHW);
				this.added = pAddHW(this.newHW); //parse method
				
				this.lastAddedName = this.newHW.hwName;
				this.newHW = {};
			};
			
		});
		
		app.controller("editHWController", function(){
			this.HW = {};
			this.edited = false;
			this.lastEditedName = "";
			
			this.editHW = function(hwObj){
				
				var result = $.grep(myArray, function(e){ return e.id == id; });
				
				this.edited = true;
				this.lastEditedName = this.newHW.hwName;
				this.newHW = {};
			};
		});
		
			
	})();
	
	var hwObjects = [
		{ hwName: "HW3", hwDescription: "Registration System", hwDone: false, objectId: 55, hwDueDate: 1288323623006 },
		{ hwName: "HW1", hwDescription: "Student System", hwDone: false, objectId: 49, hwDueDate: 1288345623006 },
		{ hwName: "HW2", hwDescription: "MovieRentalSystem", hwDone: true, objectId: 51, hwDueDate: 1288327723006 },
		{ hwName: "Book VII", hwDescription: "Republic", hwDone: true, objectId: 27, hwDueDate: 1288428723006 }
	];
	
	var crsObjects = [
		{ objectId: "lpEwxENfdp", courseName: "CS201", userPtr: "7APbwNVqqq", courseColor: "f00" },
		{ objectId: "3XCxTPYUCP", courseName: "HUM111", userPtr: "7APbwNVqqq", courseColor: "ff0" },
	];
	
})();




// JQUERY SCRIPTS
/*
$(document).ready( function(){
	$("#menu-toggle").click(function(e) {
    	e.preventDefault();
   	 $("#wrapper").toggleClass("toggled");
	});	
});*/
