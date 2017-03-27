var express = require('express');
var request = require('request');
var jsonfile = require('jsonfile');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 5000;
const INDEX = path.join(__dirname, '/public');
//var app = express();
const server = express()
	.use(express.static(__dirname + '/public'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));


var comment_obj = require('./comments.json');
var comments = comment_obj["comments"];
var comment_update_file = "comments_update.json";
var logs = {"logs": []};
var log_file = "logs.json";

var options = {
    url: 'http://arielweingarten.com:8000/rate/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

//app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));

/*app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
var io = require('socket.io')(app);*/
const io = socketIO(server);

function updateJSON(file, obj) {
	jsonfile.writeFile(file, obj, {spaces: 4}, function(err) {
	  	console.error(err);
	});
}

function saveNewComment(data, category_string) {
	var category = category_string.lastIndexOf("1") + 1;
	if (category == 0) {
		return; // comment sucks, don't add to corpus
	} 
	// add comment to corpus
	comments.push({"comment": data.comment_text,
        "category": category,
        "blank values": "",
        "length": data.comment_text.split(" ").length,
        "frequency": 1,
        "rubric": data.rubric,
        "ID": parseInt(comments[comments.length-1]["ID"]) + 1,
    });
    updateJSON(comment_update_file, comments);
	
}

// get comments for given rubric and sort them
function loadComments(rubric_category) {
	var output = [];
	output = comments.filter(function(comment) {
		return comment["rubric"] == rubric_category;
	});
	//console.log(output);

	// sort comments ascending by length & frequency
    output = output.sort(function(info1, info2) {
		var length1 = parseInt(info1["length"]);
		var length2 = parseInt(info2["length"]);
		var freq1 = parseInt(info1["frequency"]);
		var freq2 = parseInt(info2["frequency"]);
		if (freq2 < freq1) {
			return -1;
		} else if (freq1 == freq2) {
			if (length1 < length2) {
				return -1;
			} else if (length1 == length2) {
				return 0;
			} else {
				return 1;
			}
		} else {
			return 1;
		}
    });

    // get max and min frequency
    var max_freq = parseInt(output[0]["frequency"]);
    var min_freq = parseInt(output[0]["frequency"]);
    for (var i = 0; i < output.length; i++) {
      	if (parseInt(output[i]["frequency"]) > max_freq) {
        	max_freq = parseInt(output[i]["frequency"]);
      	}
      	if (parseInt(output[i]["frequency"]) < min_freq) {
        	min_freq = parseInt(output[i]["frequency"]);
      	} 
    }
    
    // for determining what shade to use on text
    var num_shades;
    if ((max_freq - min_freq) == 0) {
    	num_shades = 1;
    } else {
    	num_shades = 150 / (max_freq - min_freq);
    }
    
    for (var i = 0; i < output.length; i++) {
      	var category = output[i]["category"];
      	var shade = num_shades * (max_freq - parseInt(output[i]["frequency"]));
      	output[i]["shade"] = shade;

      	var comment = output[i]["comment"];

      	var blank_values = [];
	    if (output[i]["blank values"] != undefined) {
		    blank_values = output[i]["blank values"].split(", ");
		    var blank_loc = comment.indexOf("_blank_");
			var blank_i = 0;

			while (blank_loc != -1) {
				comment = comment.replace(/_blank_/, 
					"<input type='text' class='blank' placeholder='" + blank_values[blank_i] + "'/>");
				blank_i++;
				blank_loc = comment.indexOf("_blank_");
			}
		}

		output[i]["comment"] = comment;
	}

	return output;
}

// Socket response to new connections
io.on('connection', function(socket) {
	var address = socket.handshake.address;

  	console.log('New connection from ' + address);

  	// respond to request for comments for given rubric category
  	socket.on('get comments', function(rubric) {
  		var result = loadComments(rubric);
  		socket.emit('comments', {"rubric": rubric, "comments": result});
  	});

  	// user opened comment interface for given rubric
  	socket.on('clicked add comment', function(rubric) {
  		logs.logs.push({ "time": new Date().toString(), 
  						"event": "clicked add comment", 
  						"rubric": rubric});
  		updateJSON(log_file, logs);
  	});

  	// a suggestion was posted, save it and update frequency if a suggestion was clicked
  	socket.on('comment submitted', function(data) {
  		// find the clicked comment in comments
  		if (data.comment_id != -1) {
  			//console.log("a comment was clicked");
	  		var this_comment = comments.find(function(element) {
	  			return element["ID"] == data.comment_id;
	  		});

	  		this_comment["frequency"] = parseInt(this_comment["frequency"] + 1);
	  		updateJSON(comment_update_file, comments);

	  		// compare the text, if they are exactly the same do nothing
	  		// if they are not, maybe eventually (TODO) replace with whichever is better, 
	  		// but for now also just do nothing
	  		// TODO at least log the event though
	  	} else { // no comment was clicked
	  		//console.log("no comment clicked");
	  		// TODO run the whole algo on it and everything, then add the new comment to the corpus
	  		//data.new_comment_id is the id it was assigned by this user
	  		// will need to create a new id since that is client-specific, but still save it in case client deletes it
	  		// updateJSON(comment_update_file, comments);
	  		
	  		// categorize new comment
	  		if (data.comment_text.length > 3) {
	  			options.body = "comment=" + data.comment_text;

		  		request.post(options, function (error, response, body) {
				  	if (error) {
				  		console.log('error:', error); // Print the error if one occurred
				  	}
				  	if (response && response.statusCode == 200) {
				  		console.log('category:', body); 
				  		if (body.length != 3) {
				  			console.log("error with category string length");
				  		} else {
				  			saveNewComment(data, body);
				  		}
				  	}		  	
				});
			} else {
				saveNewComment(data, "000");
			}

	  	}
	  	// in both cases, yes_categories and no_categories hold the user-defined categories, so save those
  	});

  	// flag a comment
  	socket.on('flag comment', function(data) {
  		// find comment with this ID
  		comments.forEach(function(comment) {
  			if (comment["ID"] == data.comment_id) {
  				console.log("found it, flagging comment ");
  				console.log(comment["comment"]);
  				comment["flagged"] = true;
  				updateJSON(comment_update_file, comments);
  			}
  		});
  	});

  	// user deleted a comment
  	socket.on('delete comment', function(data) {
  		logs.logs.push({ "time": new Date().toString(), 
  						"event": "comment delete", 
  						"comment ID": data.comment_id});
  		updateJSON(log_file, logs);
  	});

  	// user canceled comment (closed comment window)
  	socket.on('cancel comment', function() {
  		// TODO log comment canceled
  	});

  	// user typed something, call real-time predictor and send result back
  	socket.on('comment update', function(data) {

  		if (data.comment && data.comment.length > 3) {
  			options.body = "comment=" + data.comment;

	  		request.post(options, function (error, response, body) {
			  	if (error) {
			  		console.log('error:', error); // Print the error if one occurred
			  	}
			  	if (response && response.statusCode == 200) {
			  		console.log('category:', body); 
			  		if (body.length != 3) {
			  			console.log("error with category string length");
			  		} else {
			  			socket.emit('category', {rubric: data.rubric, category_string: body});
			  		}
			  	}		  	
			});
		} else {
			socket.emit('category', {rubric: data.rubric, category_string: "000"});
		}

  	});
});
