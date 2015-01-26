(function() {

	var app = angular.module('classes', []);
	
	var Homework = function() {
		this.objectId = 'objectId';
		this.hwName = 'hwName';
		this.hwDescription = 'hwDescription';
		this.hwDone = 'hwDone';
		this.hwDueDate = 'hwDueDate';
		this.userPtr = 'userPtr';
		this.crsPtr = 'crsPtr'; 
	
	};
	
	var Course = function() {
		this.objectId = 'objectId'; 
		this.courseName = 'courseName';
		this.userPtr = 'userPtr'; 
	};
	
	var DataSet = function() {
		
		var hwObjects = [];
	
	var crsObjects = [];
	
	};
	
	/*var hwObjects = [
		//DUMMY DATAS
		{ hwName: "HW3", hwDescription: "Registration System", hwDone: false, objectId: 55, hwDueDate: 1288323623006 },
		{ hwName: "HW1", hwDescription: "Student System", hwDone: false, objectId: 49, hwDueDate: 1288345623006 },
		{ hwName: "HW2", hwDescription: "MovieRentalSystem", hwDone: true, objectId: 51, hwDueDate: 1288327723006 },
		{ hwName: "Book VII", hwDescription: "Republic", hwDone: true, objectId: 27, hwDueDate: 1288428723006 }
	];
	
	var crsObjects = [
		//DUMMY DATAS
		{ objectId: "lpEwxENfdp", courseName: "CS201", userPtr: "7APbwNVqqq", courseColor: "f00" },
		{ objectId: "3XCxTPYUCP", courseName: "HUM111", userPtr: "7APbwNVqqq", courseColor: "ff0" },
	];*/


})();
