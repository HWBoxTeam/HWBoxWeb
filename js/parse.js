(function() {

	var app = angular.module('parse', []);

	Parse.initialize("cf86jsjcwXfhr8OkIHl0Viizqtyh3XdfMmRc0Fmr", "kwQA7fHYuwjOLWDMXBJtPATFwKeJwmINGw5GgqT3");

	this.Homework = Parse.Object.extend("fHomework", {
	  // Instance methods
	  getName: function(){ return this.get("hwName"); },
	  getDescription: function(){ return this.get("hwDescription"); },
	  getDone: function(){ return this.get("hwDone"); },
	  getDueDate: function(){ return this.get("hwDueDate"); },
	  insert: function(){
		
	  	this.save(null, {
			  success: function(object) {
				alert('New object created with objectId = ' + object.id + " " + object.get("hwName"));
				//name = object.get("hwName");
				//alert("scope " + scope.isSuccessful + " - " + scope); 
			  	//scope.isSuccessful = true;
			  },
			  error: function(model, error) {
				alert('New object NOT created with objectId: ' + error.message);
			  	//scope.isSuccessful = false;
			  }
			});
	  },
	  update: function(){},
	  delete: function(){},
	  
	  // Instance properties go in an initialize method
	  initialize: function (attrs, options) {
		//this.hwName = "Unknown";
	  }
	}, {
	  // Class methods
	  getById: function(id) {
		
	  }
	});

	this.Homeworks = 
	{
		data : [],
		refresh : function(callback){
			var that = this;
			new Parse.Query(Homework).find({
				  success: function(results) {
						alert("Successfully retrieved " + results.length + " scores.");
						// Do something with the returned Parse.Object values
						/*for (var i = 0; i < results.length; i++) { 
						  var object = results[i];
						  alert(object.id + ' - ' + object.get('playerName'));
						}*/

						/*results.forEach(function(item){
							alert(JSON.stringify(item, null, 4));
						});*/
					
						that.data = results;
					  callback();
				  },
				  error: function(error) {
						alert("Error: " + error.code + " " + error.message);
				  }
			});
		}
	};

	/*this.pAddHW = function(newHW) {
			 
			var fHomework = Parse.Object.extend("fHomework");
			var testObject = new fHomework();
			//alert( newHW.hwDone + " " + newHW.hwDescription + " " + newHW.hwName + " " + newHW.hwDueDate );
		
			testObject.set("hwDone", newHW.hwDone);
			testObject.set("hwDescription", newHW.hwDescription);
			testObject.set("hwName", newHW.hwName);
		
			var date = new Date(newHW.hwDueDate);
			var name;
		
			testObject.set("hwDueDate", date);
		
			testObject.save(null, {
			  success: function(object) {
				alert('New object created with objectId = ' + object.id + " " + object.get("hwName"));
				name = object.get("hwName");
			  },
			  error: function(model, error) {
				alert('New object NOT created with objectId: ' + error.message);
			  }
			});
		
			//setInterval( function(){
			//	alert(name);
			//}, 3000);
	};

	this.pGetHW = function(getHW){
		var Homework = Parse.Object.extend("fHomework");
		var query = new Parse.Query(Homework);
		query.get("bHDuYBDy8k", {
			success: function(homework) {
				getHW(homework);
			},
			error: function(object, error) {
				alert("err " + error.msg);
			}
		});
	};
		
	*/
		
})();
