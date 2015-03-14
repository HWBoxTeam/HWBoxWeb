(function() {

	var app = angular.module('parse', []);

	Parse.initialize("cf86jsjcwXfhr8OkIHl0Viizqtyh3XdfMmRc0Fmr", "kwQA7fHYuwjOLWDMXBJtPATFwKeJwmINGw5GgqT3");

	this.User = Parse.User.extend({
		// Instance methods
	    /*getName: function(){ return this.get("hwName"); },
	    getDescription: function(){ return this.get("hwDescription"); },
	    isDone: function(){ return this.get("hwDone"); },
	    getDueDate: function(){ return this.get("hwDueDate"); },
	    markAs: function(bool){
	        this.set("hwDone", bool);
	        this.update(function(bool,msg){});
	    },*/
	    signIn: function(){
	    	console.info("ParseUser extended class' logIn called");
	    	this.logIn(this.getUsername(), this.getPassword(), {
	    		success: function(pUser){
	    			console.log("signIn on success");
	    			that.user = pUser;
	    			that.isSuccessful = true;
	    			that.isSubmitted = true;
	    			that.msg = "Successfully logged in.";
	    		},
	    		error: function(pUser, error){
	    			console.log("signIn on failure");
	    			that.isSuccessful = false;
	    			that.isSubmitted = true;
	    			that.msg = error.msg;
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
				/*new Parse.Query(Homework).equalTo("objectId", id).find({
					success: function(results){ callback(results[0]); },
					error: function(error){ console.error("cannot homework getById because: " + error.msg); }
				});*/
		  }
	});

	this.Homework = Parse.Object.extend("fHomework", {
		// Instance methods
	    getName: function(){ return this.get("hwName"); },
	    getDescription: function(){ return this.get("hwDescription"); },
	    isDone: function(){ return this.get("hwDone"); },
	    getDueDate: function(){ return this.get("hwDueDate"); },
	    markAs: function(bool){
	        this.set("hwDone", bool);
	        this.update(function(bool,msg){});
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
	                callback(false, "Cannot be updated because: " + error.msg);
				  }
	        });
		  },
		delete: function(callback){
			this.destroy({
			  success: function(object) {
			    console.log("Homework's delete function called - SUCCESS");            
                callback(true, "Homework deleted successfully!");
			  },
			  error: function(object, error) {
			     callback(false, "Cannot be deleted because: " + error.msg);
			     console.log("Homework's delete function called - FAILURE");
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
			var that = this; //this refers to the Homeworks object, so we assign it to "that" in order to make
								//available for async function calls
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
