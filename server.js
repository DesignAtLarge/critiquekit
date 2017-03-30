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

// List of currently connected sockets and their users. 
// Format = { <IP address>: <socketid> }
var sockets = {}; 


var comment_obj = require('./comments.json');
var comments = comment_obj["comments"];
var comment_update_file = "comments_update.json";
var logs = [];
var log_file = "logs.json";

var user_comments = {} // { address: array holding comment objects }
var user_file = "users.json";

var options = {
    url: 'http://arielweingarten.com:8000/rate/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

var curate_options = {
	url: 'http://arielweingarten.com:8000/curate',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

const io = socketIO(server);

function updateJSON(file, obj) {
	jsonfile.writeFile(file, obj, {spaces: 4}, function(err) {
	  	if (err) console.error(err);
	});
	//console.log(file + ":");
	if (file == user_file) {
		//console.log(obj);
	} else {
		obj.forEach(function(element) {
			//console.log(element);
		});
	}
}

function curateComment(comment) {
	console.log("curating " + comment);
	// call curatecomment on python server
	curate_options.body = "comment=" + comment;

	request.post(curate_options, function (error, response, body) {
	  	if (error) {
	  		console.log('error:', error); // Print the error if one occurred
	  	}
	  	if (response && response.statusCode == 200) {
	  		console.log("got result");
	  		var result = JSON.parse(body);
	  		console.log(result);
	  	} else {
	  		console.log(response.statusCode);
	  		console.log(body);
	  	}	  	
	});

	return comment;
}

function saveNewComment(data, category_string, address, new_comment) {
	var category = category_string.lastIndexOf("1") + 1;
	var new_id;
	if (category == 0) {
		// comment sucks, don't add to corpus
		new_id = null;
	} else {
		// add comment to corpus
		new_id = parseInt(comments[comments.length-1]["ID"]) + 1;
		comments.push({"comment": new_comment,
	        "category": category,
	        "blank values": "",
	        "length": new_comment.split(" ").length,
	        "frequency": 1,
	        "rubric": data.rubric,
	        "ID": new_id,
	        "user": address,
	        "users ID": data.new_comment_id
	    });
	    updateJSON(comment_update_file, comments);
	}

    logs.push({ "time": new Date().toString(), 
					"user": address,
					"event": "new comment submitted", 
					"comment ID": new_id,
					"category string": category_string,
					"comment": data.comment_text,
					"location style": data.location_style});
	updateJSON(log_file, logs);
	
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
    
    for (var i = 0; i < output.length; i++) {
      	var category = output[i]["category"];
      	var shade = 0;
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
	//var address = socket.handshake.address;
	var address = socket.handshake.headers['x-forwarded-for'];
  	console.log('New connection from ' + address);

  	sockets[address] = socket.id;

  	logs.push({ "time": new Date().toString(), 
					"user": address,
					"event": "new connection"});
	updateJSON(log_file, logs);

	if (user_comments[address]) {
		// send back to user 
		console.log("sending saved comments");
		socket.emit('saved comments', {comments: user_comments[address]});
	} else {
		console.log("starting new save");
		user_comments[address] = [];
		updateJSON(user_file, user_comments);
		console.log("user commentS:");
		console.log(user_comments);
	}


	socket.on('loaded design', function(design_num) {
		logs.push({ "time": new Date().toString(), 
  						"user": address,
  						"event": "loaded design", 
  						"design num": design_num});
  		updateJSON(log_file, logs);
	});

	socket.on('done design', function(design_num) {
		logs.push({ "time": new Date().toString(), 
  						"user": address,
  						"event": "done design", 
  						"design num": design_num});
  		updateJSON(log_file, logs);
	});

  	// respond to request for comments for given rubric category
  	socket.on('get comments', function(rubric) {
  		//console.log(rubric);
  		var result = loadComments(rubric);
  		socket.emit('comments', {"rubric": rubric, "comments": result});
  	});

  	// user opened comment interface for given rubric
  	socket.on('clicked add comment', function(rubric) {
  		logs.push({ "time": new Date().toString(), 
  						"user": address,
  						"event": "clicked add comment", 
  						"rubric": rubric});
  		updateJSON(log_file, logs);
  	});

  	// a suggestion was posted, save it and update frequency if a suggestion was clicked
  	socket.on('comment submitted', function(data) {

  		// save to user data
  		user_comments[address].push({"comment_id": data.new_comment_id,
  									"comment_text": data.comment_text,
  									"rubric": data.rubric,
  									"category_string": data.category_string,
  									"location_style": data.location_style,
  									"design_num": data.design_num
  		});
  		updateJSON(user_file, user_comments);
  		console.log("user comments: "); 
  		console.log(user_comments);

  		// find the clicked comment in comments
  		if (data.comment_id != -1) {
  			// a suggestion was inserted
	  		var this_comment = comments.find(function(element) {
	  			return element["ID"] == data.comment_id;
	  		});

	  		this_comment["frequency"] = parseInt(this_comment["frequency"] + 1);
	  		updateJSON(comment_update_file, comments);
	  		var old_category = this_comment["category"];
	  		var new_category = data.category_string.lastIndexOf("1") + 1;

	  		if (data.comment_text == this_comment["comment"]) {
	  			// they are exactly the same, so don't add it again
	  			// but do update category if it's different
	  			this_comment["category"] = new_category;
	  			updateJSON(comment_update_file, comments);

	  			logs.push({ "time": new Date().toString(), 
		  						"user": address,
		  						"event": "reused comment", 
		  						"comment ID": data.comment_id,
		  						"old category": old_category,
		  						"new category": new_category,
		  						"location style": data.location_style,
		  						"design_num": data.design_num});
		  		updateJSON(log_file, logs);
	  			return;
	  		} else { // they are different
	  			var new_comment = curateComment(data.comment_text);
	  			if (new_category > old_category) {  // comment was supposedly improved

	  				logs.push({ "time": new Date().toString(), 
			  						"user": address,
			  						"event": "improved comment", 
			  						"comment ID": data.comment_id,
			  						"old category": old_category,
			  						"new category": new_category,
			  						"old comment": this_comment["comment"],
			  						"new_comment": new_comment,
			  						"location style": data.location_style,
			  						"design_num": data.design_num});
			  		updateJSON(log_file, logs);

			  		this_comment["comment"] = new_comment;
	  				this_comment["category"] = new_category;
	  			} else {
	  				// comment was not improved, so leave it
	  				logs.push({ "time": new Date().toString(), 
			  						"user": address,
			  						"event": "not improved comment", 
			  						"comment ID": data.comment_id,
			  						"old category": old_category,
			  						"new category": new_category,
			  						"old comment": this_comment["comment"],
			  						"new_comment": new_comment,
			  						"location style": data.location_style,
			  						"design_num": data.design_num});
			  		updateJSON(log_file, logs);
	  			}
	  		}
	  	} else {
	  		// no comment was clicked, it's new

	  		// TODO check if it's a duplicate of existing comment, if so log but don't add it, &frequency++ for that comment
	  		var new_comment = curateComment(data.comment_text);
	  		saveNewComment(data, data.category_string, address, new_comment);
	  		
	  	}
	  	// in both cases, yes_categories and no_categories hold the user-defined categories, so save those
  	});

  	// flag a comment
  	socket.on('flag comment', function(data) {
  		// find comment with this ID
  		comments.forEach(function(comment) {
  			if (comment["ID"] == data.comment_id) {
  				//console.log("found it, flagging comment ");
  				//console.log(comment["comment"]);
  				comment["flagged"] = true;
  				updateJSON(comment_update_file, comments);

  				logs.push({ "time": new Date().toString(), 
		  						"user": address,
		  						"event": "comment flag", 
		  						"comment ID": data.comment_id,
		  						"design_num": data.design_num});
		  		updateJSON(log_file, logs);
  			}
  		});
  	});

  	// user deleted a comment
  	socket.on('delete comment', function(data) {

  		user_comments[address] = user_comments[address].filter(function(comment) {
  			return comment.comment_id != data.comment_id || comment.design_num != data.design_num;
  		});
  		updateJSON(user_file, user_comments);
  		//console.log("user coments: ")
  		//console.log(user_comments);

  		// find the actual id of the comment they deleted
  		var actual_id = "unknown";
  		comments.forEach(function(comment) {
  			if (comment["user"] == address && comment["users ID"] == data.comment_id) {
  				actual_id = comment["ID"];
  			}
  		})

  		logs.push({ "time": new Date().toString(), 
  						"user": address,
  						"event": "comment delete", 
  						"comment ID": actual_id, 
  						"design_num": data.design_num});
  		updateJSON(log_file, logs);
  	});

  	// user canceled comment (closed comment window)
  	socket.on('cancel comment', function(rubric) {
  		logs.push({ "time": new Date().toString(), 
  						"user": address,
  						"event": "clicked cancel comment", 
  						"rubric": rubric});
  		updateJSON(log_file, logs);
  	});

  	// user inserted a suggested comment
  	socket.on('comment inserted', function(data) {
		logs.push({ "time": new Date().toString(), 
  						"user": address,
  						"event": "inserted suggestion", 
  						"rubric": data.rubric,
  						"comment ID": data.comment_id,
  						"comment text": data.comment_text,
  						// length of selection that was replaced by this comment:
  						"selection length": data.selection_length,
  						"design_num": data.design_num}); 
  		updateJSON(log_file, logs);
  	});

  	// user hit autocomplete on a comment
  	socket.on('autocompleted suggestion', function(data) {
  		logs.push({ "time": new Date().toString(), 
  						"user": address,
  						"event": "autocompleted suggestion", 
  						"rubric": data.rubric,
  						"comment ID": data.comment_id,
  						"design_num": data.design_num}); 
  		updateJSON(log_file, logs);
  	});

  	// user manually overrode a category
  	socket.on('user category added', function(data) {
  		logs.push({ "time": new Date().toString(), 
  						"user": address,
  						"event": "added category", 
  						"comment text": data.comment_text,
  						"category added": data.category,
  						"design_num": data.design_num}); 
  		updateJSON(log_file, logs);
  	});

  	// user manually overrode a category
  	socket.on('user category removed', function(data) {
  		logs.push({ "time": new Date().toString(), 
  						"user": address,
  						"event": "added category", 
  						"comment text": data.comment_text,
  						"category removed": data.category,
  						"design_num": data.design_num}); 
  		updateJSON(log_file, logs);
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
			  			logs.push({ "time": new Date().toString(), 
				  						"user": address,
				  						"event": "typing comment", 
				  						"rubric": data.rubric,
				  						"comment": data.comment,
				  						"prediction": body,
				  						"design_num": data.design_num});
				  		updateJSON(log_file, logs);
			  		}
			  	}		  	
			});
		} else {
			socket.emit('category', {rubric: data.rubric, category_string: "000"});
			logs.push({ "time": new Date().toString(), 
	  						"user": address,
	  						"event": "typing comment", 
	  						"rubric": data.rubric,
	  						"comment": data.comment,
	  						"prediction": "000",
	  						"design_num": data.design_num});
	  		updateJSON(log_file, logs);
		}

  	});
});
