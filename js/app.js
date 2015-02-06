(function(){
	var app = angular.module('HWBox', ['parse']);

	app.service('dataService', function() {  
	  	
	  	var hws = [];
	  	
	  	return {
	  		load: function(callback){
	  			Homeworks.setQuery(new Parse.Query(Homework).descending("updatedAt"));
				console.info("dataService.load() called");
				Homeworks.load(function(){
		      		hws = Homeworks.data;	
		      		callback(); //after loading data do whatever you want with callback() function, e.g. refresh the view		
				}.bind(this));
	  		},
	  		init: function(){
	  			this.load(function(){});
	  		},
	  		/*set: function(obj){
	  				currentHW = obj;
	  				console.log("set in service called with currentHW: " + JSON.stringify(currentHW))
	  		},*/
	  		get: function(){
  				console.log("get in service called with: " + JSON.stringify(hws));
  				return hws;
	  		}
	  	};
	});

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

	

	app.controller("ViewHWController", function ($scope, $rootScope, dataService) {
		
		$scope.dataService = dataService;
		//$scope.connectViewEdit = connectViewEdit;

		/*Homework.getById("DDMspc3UjI", function(result){
			Homeworks.data.push(result);
			console.log(result + " : result from getById");
		}.bind(this));*/
		

		this.sendHWToEdit = function(obj) {
			console.log("set called with obj: " + JSON.stringify(obj));
			//connectViewEdit.set(obj);
			$rootScope.$broadcast('change.the.currentHW', obj );
		};

		this.deleteHW = function(obj){
			var del = confirm("Are you sure you want to delete homework '" + obj.getName() + "'?");
			var that = this;

			if (del == true) {
			   obj.delete(function(bool, msg){
			   		console.log("delete's callback function called");
			   		alert(msg);
			   		$scope.dataService.load(function(){
			   			$scope.$apply(); //after loading refresht the controller's view
			   			console.log("dataService.load callback fcn called");
			   		});
			   });
			}
		}
	});
	
	app.controller("addHWController", function($scope, dataService){
		$scope.dataService = dataService;

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
			hw.set("hwDone", false);

			hw.insert(function(bool, msg){
				this.isSuccessful = bool;
                this.isSubmitted = true;
                this.msg = msg;
                console.log("insert callback called, isSubmitted: " + this.isSubmitted + " isSuccessful: " + this.isSuccessful);
				this.newHW = {}; //reset the form
			}.bind(this));
			
			$scope.dataService.load(function(){
			   	$scope.$apply(); //after loading refresht the controller's view
			});
		};
	});

	
	
	app.controller("editHWController", function($scope, dataService){
		
		$scope.dataService = dataService;
		$scope.HW = {};

		var parseHWObj;
		var isSuccessful = false;
	    var isSubmitted = false;
	    var msg;
		
		$scope.$on('change.the.currentHW', function(event, value){
			console.log("broadcast $on function called");
			parseHWObj = value;
			$scope.HW.hwName = parseHWObj.getName(); 
			$scope.HW.hwDescription = parseHWObj.getDescription();
			$scope.HW.hwDueDate = parseHWObj.getDueDate();
			$scope.HW.hwDone = parseHWObj.isDone(); 
		});
		
		this.editHW = function(){

			parseHWObj.set("hwName", $scope.HW.hwName);
			parseHWObj.set("hwDescription", $scope.HW.hwDescription);
			parseHWObj.set("hwDueDate", $scope.HW.hwDueDate);
			parseHWObj.set("hwDone", $scope.HW.hwDone);

			parseHWObj.update(function(bool, msg){
				this.isSuccessful = bool;
				this.isSubmitted = true;
				this.msg = msg;
				$scope.$apply();
			}.bind(this));

			$scope.dataService.load(function(){
				$scope.HW = {};
	   			$scope.$apply(); //after loading refresht the controller's view
	   		});

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

