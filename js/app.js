(function(){
	var app = angular.module('HWBox', ['parse']);
	
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

	/*app.service('connectViewEdit', function() {  
	  	
	  	var currentHW = {hwName: 'deneme name'};
	  	
	  	return {
	  		set: function(obj){
	  				currentHW = obj;
	  				console.log("set in service called with currentHW: " + JSON.stringify(currentHW))
	  		},
	  		get: function(){
	  				console.log("get in service called with: " + JSON.stringify(currentHW));
	  				return currentHW;
	  		}
	  	};
	});*/

	app.controller("ViewHWController", function ($scope, $rootScope) {
		
		var hws = [];

		//$scope.connectViewEdit = connectViewEdit;

		//Homeworks.setQuery(new Parse.Query(Homework).equalTo("hwDone", true));
		
		Homeworks.load(function(){
      		this.hws = Homeworks.data;

			/*this.hws.forEach(function(item){
				//console.log(JSON.stringify(item, null, 4));
                console.log(item.toJSON());
            });*/
	
		}.bind(this));

		/*Homework.getById("DDMspc3UjI", function(result){
			Homeworks.data.push(result);
			console.log(result + " : result from getById");
		}.bind(this));*/
		

		this.sendHWToEdit = function(obj) {
			console.log("set called with obj: " + JSON.stringify(obj));
			//connectViewEdit.set(obj);
			$rootScope.$broadcast('change.the.currentHW', obj );
		};


		
	});
	
	app.controller("addHWController", function(){
		this.newHW = {};
		this.newHW.hwDueDate = Date.now();
		var isSuccessful = false;
	    var isSubmitted = false;
	    var msg;
		
		this.addHW = function(){
			
			var hw = new Homework();
		
			hw.set("hwDone", this.newHW.hwDone);
			hw.set("hwDescription", this.newHW.hwDescription);
			hw.set("hwName", this.newHW.hwName);
			hw.set("hwDueDate", new Date(this.newHW.hwDueDate));

			hw.insert(function(bool, msg){
					this.isSuccessful = bool;
                    this.isSubmitted = true;
                    this.msg = msg;
                    console.log("insert callback called, isSubmitted: " + this.isSubmitted + " isSuccessful: " + this.isSuccessful);
			}.bind(this));
			
		};
	});

	
	
	app.controller("editHWController", function($scope){
		
		//$scope.connectViewEdit = connectViewEdit;

		//var hw = connectViewEdit.get();

		$scope.HW = {};

		$scope.$on('change.the.currentHW', function(event, value){
			$scope.HW.hwName = value.getName(); //connectViewEdit.get().hwName;
			$scope.HW.hwDescription = value.getDescription();//connectViewEdit.get().getDescription();
			$scope.HW.hwDueDate = value.getDueDate();//connectViewEdit.get().getDueDate();
			$scope.HW.hwDone = value.isDone(); //connectViewEdit.get().isDone();
		});
		
		this.edited = false;
		this.lastEditedName = "";
		var isSuccessful = false;
	    var isSubmitted = false;
	    var msg;
		
		this.editHW = function(){

		};
	});
	
	app.controller("denemeController", function(){
		
	});
	
	/*var hwObjects = [
		//DUMMY DATAS
		{ hwName: "HW3", hwDescription: "Registration System", hwDone: false, objectId: 55, hwDueDate: 1288323623006 },
		{ hwName: "HW1", hwDescription: "Student System", hwDone: false, objectId: 49, hwDueDate: 1288345623006 },
		{ hwName: "HW2", hwDescription: "MovieRentalSystem", hwDone: true, objectId: 51, hwDueDate: 1288327723006 },
		{ hwName: "Book VII", hwDescription: "Republic", hwDone: true, objectId: 27, hwDueDate: 1288428723006 }
	];*/
	
	var crsObjects = [
		//DUMMY DATAS
		{ objectId: "lpEwxENfdp", courseName: "CS201", userPtr: "7APbwNVqqq", courseColor: "f00" },
		{ objectId: "3XCxTPYUCP", courseName: "HUM111", userPtr: "7APbwNVqqq", courseColor: "ff0" },
	];
		
})();

