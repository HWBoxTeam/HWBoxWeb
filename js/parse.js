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
	update: function(callback){
	  	this.save(null, {
			  success: function(object) {                
                callback(true, "Homework " + object.get("hwName") + " updated successfully!");
			  },
			  error: function(model, error) {
                callback(false, "Cannot be updated becasue: " + error.msg);
			  }
        });
	  },
	delete: function(callback){
	  	this.destroy(null, {
			  success: function(object) {                
                callback(true, "Homework " + object.get("hwName") + " deleted successfully!");
			  },
			  error: function(model, error) {
                callback(false, "Cannot be deleted becasue: " + error.msg);
			  }
        });
	  },
	  
	  // Instance properties go in an initialize method
	  initialize: function (attrs, options) {
		//this.hwName = "Unknown";
	  }
	}, 
	{
	  // Class methods
	  getById: function(id, callback) {
			new Parse.Query(Homework).equalTo("objectId", id).find({
				success: function(results){ callback(results[0]); },
				error: function(error){ console.error("cannot homework getById because: " + error.msg); }
			});
	  }
	});

	this.Homeworks = 
	{
		data : [],
		query: new Parse.Query(Homework), //default query object
		setQuery: function(queryObj){
			this.query = queryObj;
		},
		load : function(callback){
			var that = this;
			that.query.find({
				  success: function(results) {
						console.log("Successfully retrieved " + results.length + " homework objects.");
						/*results.forEach(function(item){
							alert(JSON.stringify(item, null, 4));
						});*/
					
						that.data = results;
					   callback();
				  },
				  error: function(error) {
						console.log("Error while loading homeworks: " + error.code + " " + error.message);
				  }
			});
		}
	};
    
    this.Courses = 
    {
        data: [],
        load: function(callback){
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
