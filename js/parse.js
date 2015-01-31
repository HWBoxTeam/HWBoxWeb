(function() {

	var app = angular.module('parse', []);

	Parse.initialize("cf86jsjcwXfhr8OkIHl0Viizqtyh3XdfMmRc0Fmr", "kwQA7fHYuwjOLWDMXBJtPATFwKeJwmINGw5GgqT3");

	this.Homework = Parse.Object.extend("fHomework", {
	// Instance methods
    getName: function(){ return this.get("hwName"); },
    getDescription: function(){ return this.get("hwDescription"); },
    isDone: function(){ return this.get("hwDone"); },
    getDueDate: function(){ return this.get("hwDueDate"); },
    markAs: function(bool){
        this.set("hwDone", bool);
        this.update();
    },
    insert: function(callback){
	  	this.save(null, {
			  success: function(object) {                
                callback(true, "Homework " + object.get("hwName") + " added successfully!");
			  },
			  error: function(model, error) {
                callback(false, "Cannot be added becasue: " + error.msg);
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
    
    this.Courses = 
    {
        data: [],
        refresh: function(callback){
            var that = this;
            new Parse.Query(Course).find({
                success: function(results){},
                error: function(error){}
            });
        }
    };

	/*

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
