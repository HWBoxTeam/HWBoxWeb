(function(){
	var app = angular.module('HWBox', ['parse']);

	/*
		Important note:
		"this" is a dynamic keyword, depending on the context, it can refer to another scopes.
		So we assing var that = this to save "this" scope. Also, we can use .bind(this) for forcing
		the context to not change
	*/

	app.service('dataService', function() {  
	  	
	  	var hws = [];
	  	var currUser = Parse.User.current();

	  	return {
	  		load: function(callback){

	  			if(!this.currUser) return; //if the user is not logged in don't load any data
	  			
	  			Homeworks.setQuery(new Parse.Query(Homework).descending("updatedAt"));
				console.info("dataService.load() called");
				Homeworks.load(function(){
		      		hws = Homeworks.data;	
		      		callback(); //after loading data do whatever you want with callback() function, e.g. refresh the view		
				}.bind(this)); // we are binding "this" because we want to access "hws" variable, otherwise this
								// anonymous function cannot reach "hws"
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
	
	app.controller("PageController", function(){
		this.pageEnum = { DASHBOARD: 1, SIGNIN: 2, SIGNUP: 3, ADDHW: 4, EDITHW: 5, VIEWHW: 6,
							ADDCRS: 7, EDITCRS: 8, VIEWCRS: 9 };
		this.currPage = this.pageEnum.SIGNIN;

		this.setPage = function(pageIndex){
			this.currPage = pageIndex;
			console.log('setPage with' + pageIndex);
		};
		this.isSet = function(pageIndex){
			return this.currPage === pageIndex;
			console.log('isSet with' + pageIndex);
		};
	});

	
	app.controller("denemeController", function(){
		
	});

	//////////////////////////////////////////////
	///////////////// DIRECTIVES /////////////////
	//////////////////////////////////////////////

	app.directive('addHomework', function(){
		return {
			restrict: 'E',
			templateUrl: 'directives/add-homework.html',
			controller: function($scope, dataService){
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
			},
			controllerAs: 'addHWCtrl'
		};
	});

	app.directive('signIn', function(){
		return {
			restrict: 'E',
			templateUrl: 'directives/sign-in.html',
			controller: function($scope){
				
				this.user = {};
				this.user.email = ""; // we are using an email for address for "username"
				this.user.password = "";

				var isSuccessful = false;
			    var isSubmitted = false;
			    var msg;

			    this.signIn = function(){
			    	console.info("sign in form");
			    	
			    	var usr = new User();
			   		console.info(JSON.stringify(usr));
			    	usr.set("username", this.user.email);
			    	usr.set("password", this.user.password);
			   		
			   		usr.signIn();
			    };
			},
			controllerAs: 'signInCtrl'
		};
	});

	app.directive('editHomework', function(){
		return {
			restrict: 'E',
			templateUrl: 'directives/edit-homework.html',
			controller: function($scope, dataService){
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
			},
			controllerAs: 'editHWCtrl'
		};
	});

	app.directive('viewHomeworks', function(){
		return {
			restrict: 'E',
			templateUrl: 'directives/view-homeworks.html',
			controller: function ($scope, $rootScope, dataService) {
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
				};
			},
			controllerAs: 'viewHwCtrl'
		};
	});

	app.directive('courses', function(){
		return {
			restrict: 'E',
			templateUrl: 'directives/courses.html',
			controller: function(){
				this.crss = crsObjects;
			},
			controllerAs: 'crsCtrl'
		};		
	});

	app.directive('dashboard', function(){
		return {
			restrict: 'E',
			templateUrl: 'directives/dashboard.html',
			controller: function(){

			},
			controllerAs: 'dashboardCtrl'
		};
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

