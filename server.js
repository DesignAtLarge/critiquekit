var express = require('express');
var request = require('request');
var jsonfile = require('jsonfile');
var fs = require('fs');
var https = require('https');

const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 8080;
const INDEX = path.join(__dirname, '/public');
//var app = express();

/*var options = {
    key: fs.readFileSync('/etc/ssl/private/d.ucsd.edu.key'),
    cert: fs.readFileSync('/etc/ssl/certs/d.ucsd.edu.crt'),
    ca: fs.readFileSync('/etc/ssl/certs/incommon-interim.crt')
};*/

var server = express()
	.all('/', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    next();
	})
	.use(express.static(__dirname + '/public'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

//var server = https.createServer(options, app)
//	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// List of currently connected sockets and their users. 
// Format = { <IP address>: <socketid> }
var sockets = {}; 

var comment_obj = require('./original_comments.json');
var comments = comment_obj["comments"];
// temp: recover from error
//var comments = require("./comments.json");
var comment_update_file = "comments.json";
var logs = [];
// temp: recover form error
//var logs = require("./logs.json");
var log_file = "logs.json";

var user_data = {} // { user id: {comments: <array holding comment objects>, consent: <whether or not they consented> } }
// temp: recover from error
//var user_data = require("./user_data.json");
var user_file = "user_data.json";

var design_data = {};
// temp: recover from error
//var design_data = require("./design_data.json")
var design_file = "design_data.json";

var students = require('./students.json');
var user_ids = Object.keys(students);
var user_assignments = {};
var group_ids = [];
// temp: recover from error
//var user_assignments = require("./user_assignments.json");
var assignment_file = "user_assignments.json";

var admin_id = "SecretAdmin";


//const io = socketIO(server, {path: 'api/critiquekit/', secure: false});
const io = socketIO(server);

var options = {
    url: 'http://104.131.160.94:8000/rate/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

var curate_options = {
	url: 'http://104.131.160.94:8000/curate',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}


function updateJSON(file, obj) {
	jsonfile.writeFile(file, obj, {spaces: 4}, function(err) {
	  	if (err) console.error(err);
	});
}

function saveNewComment(data, category_string, address, new_comment, blank_values) {
	var category = 0;
	if (category_string) {
		category = category_string.lastIndexOf("1") + 1;
	}
	
	var new_id;
	blank_values = blank_values.join(", ");
	if (category == 0) {
		// comment sucks, don't add to corpus
		new_id = null;
	} else {
		// add comment to corpus
		new_id = parseInt(comments[comments.length-1]["ID"]) + 1;
		comments.push({"comment": new_comment,
	        "category": category,
	        "blank values": blank_values,
	        "length": new_comment.split(" ").length,
	        "frequency": 1,
	        "rubric": data.rubric,
	        "ID": new_id,
	        "user": address,
	        "users ID": data.new_comment_id
	    });
	    updateJSON(comment_update_file, comments);
	}

    logs.push({ "time": new Date().getTime(), 
					"user": address,
					"event": "new comment submitted", 
					"comment ID": new_id,
					"category string": category_string,
					"comment": data.comment_text,
					"blank_values": blank_values,
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
      	var shade = "#000000";
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

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// make list of group ids
for (var user_id in students) {
	var group_id = students[user_id].group;
	if (group_ids.indexOf(group_id) == -1) {
		group_ids.push(group_id);
	}
}
console.log("group ids:");
console.log(group_ids);

// randomly shuffle user_ids
group_ids.sort(function(a, b){return 0.5 - Math.random()});

// make users evaluate the person before and after them
group_ids.forEach(function(group_id, i) {
	if (i != 0 && i != group_ids.length - 1) { // not last one or first one
		user_assignments[group_id] = [group_ids[i+1], group_ids[i-1]];
	} else if (i != 0) { // last one
		user_assignments[group_id] = [group_ids[0], group_ids[i-1]];
	} else { // first one
		user_assignments[group_id] = [group_ids[i+1], group_ids[group_ids.length-1]];
	}
});

updateJSON(assignment_file, user_assignments);

// Socket response to new connections
io.on('connection', function(socket) {
	//var address = socket.handshake.address;
	var address = socket.handshake.headers['x-forwarded-for'];
	if (address == undefined) address = "local";
  	console.log('New connection from ' + address);

  	sockets[address] = socket.id;

  	socket.on('student id', function(pid) {
  		if (pid == admin_id) {
  			socket.emit('admin', {confirmed: true});
  			logs.push({ "time": new Date().getTime(), 
					"event": "admin login"});
  			updateJSON(log_file, logs);
  		} else {
	  		var pid_index = user_ids.indexOf(pid);
	  		if (pid_index == -1) {
	  			socket.emit('student name', {confirmed: false});
	  		} else {
	  			var fullname = students[pid].name;
	  			var firstname = fullname.split(",")[1];
	  			var group_id = students[pid].group;
	  			console.log("student " + pid + " group is " + group_id);
	  			socket.emit('student name', {confirmed: true, pid: pid, firstname: firstname, group_id: group_id});
	  		}
	  	}
  	});

  	socket.on('set cookie', function(userid) {
  		console.log("setting cookie");
  		console.log(userid);
  		logs.push({ "time": new Date().getTime(), 
					"user": userid,
					"event": "new connection"});
		updateJSON(log_file, logs);
		
		if (user_data[userid] == undefined) {
			console.log("starting new save");
			user_data[userid] = {consent: null, comments: []};
			updateJSON(user_file, user_data);
		}
  	});

  	socket.on('get peers', function(groupid) {
  		console.log("getting peers for group " + groupid);
  		console.log(user_assignments[groupid]);
  		socket.emit('peers', {design_ids: user_assignments[groupid]});
  	});

  	socket.on('get all students', function() {
  		socket.emit('all students', {students: Object.keys(user_assignments)});
  	});

  	socket.on('get all groups', function() {
  		socket.emit('all groups', {groups: group_ids});
  	});

  	socket.on('consent', function(data) {
  		user_data[data.userid]["consent"] = data.consent;
  		updateJSON(user_file, user_data);
  	});


	socket.on('get saved', function(data) {
		var comments_to_send = design_data[data.design_id]; // all comments made by everyone

		if (data.mode == "review" && comments_to_send != undefined) {
			// return only comments made by the given user
			comments_to_send = comments_to_send.filter(function(comment) {
				return comment.userid == data.userid;
			});
		} 
		// otherwise mode is view or admin so send all comments made by everyone
		socket.emit('saved comments', {comments: comments_to_send});
	});

	socket.on('loaded design', function(data) {
		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "loaded design", 
  						"design id": data.design_id});
  		updateJSON(log_file, logs);
	});

	socket.on('done design', function(data) {
		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "done design", 
  						"design id": data.design_id});
  		updateJSON(log_file, logs);
	});

  	// respond to request for comments for given rubric category
  	socket.on('get comments', function(data) {
  		//console.log(rubric);
  		var result = loadComments(data.rubric);
  		socket.emit('comments', {"rubric": data.rubric, "comments": result});
  	});

  	// user opened comment interface for given rubric
  	socket.on('clicked add comment', function(data) {
  		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "clicked add comment", 
  						"rubric": data.rubric});
  		updateJSON(log_file, logs);
  	});

  	// user opened comment interface to edit
  	socket.on('clicked edit comment', function(data) {
  		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "clicked edit comment", 
  						"comment ID": data.comment_id,
  						"rubric": data.rubric});
  		updateJSON(log_file, logs);
  	});

  	// a comment was edited
  	socket.on('edit submitted', function(data) {

  		console.log("edit submitted by " + data.userid + " for design " + data.design_id);
  		console.log("comment is:");
  		console.log(data.comment_text);
  		console.log("---------");

  		var new_category = data.category_string.lastIndexOf("1") + 1;
 	
	 	user_data[data.userid].comments.forEach(function(comment) {
	 		if (comment["comment_id"] == data.new_comment_id) {
	 			comment["comment_text"] = data.comment_text;
	 			comment["location_style"] = data.location_style;
	 			comment["category_string"] = data.category_string;
	 		}
	 	});
	 	updateJSON(user_file, user_data);

	 	design_data[data.design_id].forEach(function(comment) {
	 		if (comment["comment_id"] == data.new_comment_id && comment["userid"] == data.userid) {
	 			comment["comment_text"] = data.comment_text;
	 			comment["location_style"] = data.location_style;
	 			comment["category_string"] = data.category_string;
	 		}
	 	});
	 	updateJSON(design_file, design_data);

	 	var this_comment = comments.find(function(element) {
  			return element["users ID"] == data.new_comment_id;
  		});

  		/*var edited_id = this_comment["ID"];
  		this_comment["comment"] = data.comment_text;
  		this_comment["category"] = new_category;
  		this_comment["length"] = data.comment_text.split(" ").length;
  		updateJSON(comment_update_file, comments);*/

	 	// log it
	 	logs.push({ "time": new Date().getTime(), 
			"user": data.userid,
			"event": "comment edited", 
			"users ID": data.new_comment_id,
			"category": data.category_string,
			"comment": data.comment_text,
			"location style": data.location_style,
			"design_id": data.design_id
		});
		updateJSON(log_file, logs);

  	});

  	// a suggestion was posted, save it and update frequency if a suggestion was clicked
  	socket.on('comment submitted', function(data) {

  		console.log("comment submitted by " + data.userid + " for design " + data.design_id);
  		console.log("comment is:");
  		console.log(data.comment_text);
  		console.log("---------");

  		var new_com = {"comment_id": data.new_comment_id,
  									"comment_text": data.comment_text,
  									"rubric": data.rubric,
  									"category_string": data.category_string,
  									"location_style": data.location_style,
  									"design_id": data.design_id,
  									"userid": data.userid
  		};

  		// save to user data
  		user_data[data.userid].comments.push(new_com);
  		updateJSON(user_file, user_data);
  		
  		if (design_data[data.design_id] != undefined) {
  			design_data[data.design_id].push(new_com);
  		} else {
  			design_data[data.design_id] = [new_com];
  		}
  		updateJSON(design_file, design_data);

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

	  			logs.push({ "time": new Date().getTime(), 
		  						"user": data.userid,
		  						"event": "reused comment", 
		  						"comment ID": data.comment_id,
		  						"old category": old_category,
		  						"new category": new_category,
		  						"location style": data.location_style,
		  						"design_id": data.design_id});
		  		updateJSON(log_file, logs);
	  			return;
	  		} else { // they are different
	  			curate_options.body = "comment=" + data.comment_text;
	  			curate_options.headers["Content-Length"] = curate_options.body.length;

				request.post(curate_options, function (error, response, body) {
				  	if (error) {
				  		console.log('error:', error); // Print the error if one occurred
				  		console.log(curate_options.body);
				  	}
				  	if (response && response.statusCode == 200) {
				  		console.log("got result");
				  		var curated = JSON.parse(body);
				  		var new_comment = curated["comment"];
				  		var blank_values = curated["blanks"];
				  		if (new_category > old_category) {  // comment was supposedly improved

			  				logs.push({ "time": new Date().getTime(), 
				  						"user": data.userid,
				  						"event": "improved comment", 
				  						"comment ID": data.comment_id,
				  						"old category": old_category,
				  						"new category": new_category,
				  						"old comment": this_comment["comment"],
				  						"new_comment": new_comment,
				  						"blank_values": blank_values,
				  						"location style": data.location_style,
				  						"design_id": data.design_id});
					  		updateJSON(log_file, logs);

					  		this_comment["comment"] = new_comment;
			  				this_comment["category"] = new_category;
			  				updateJSON(comment_update_file, comments);
			  			} else {
			  				// comment was not improved, so leave it
			  				logs.push({ "time": new Date().getTime(), 
				  						"user": data.userid,
				  						"event": "not improved comment", 
				  						"comment ID": data.comment_id,
				  						"old category": old_category,
				  						"new category": new_category,
				  						"old comment": this_comment["comment"],
				  						"new_comment": new_comment,
				  						"blank_values": blank_values,
				  						"location style": data.location_style,
				  						"design_id": data.design_id});
					  		updateJSON(log_file, logs);
			  			}
				  	} else {
				  		console.log(response.statusCode, body);
				  		console.log(curate_options.body);
				  		// submit changed comment
				  		logs.push({ "time": new Date().getTime(), 
			  						"user": data.userid,
			  						"event": "maybe improved comment", 
			  						"comment ID": data.comment_id,
			  						"old category": old_category,
			  						"new category": new_category,
			  						"old comment": this_comment["comment"],
			  						"new_comment": data.comment_text,
			  						"blank_values": "",
			  						"location style": data.location_style,
			  						"design_id": data.design_id});
				  		updateJSON(log_file, logs);
				  	}	  	
				});
	  			
	  		}
	  	} else {
	  		// no comment was clicked, it's new

	  		// TODO check if it's a duplicate of existing comment, if so log but don't add it, &frequency++ for that comment
	  		curate_options.body = "comment=" + data.comment_text;
	  		curate_options.headers["Content-Length"] = curate_options.body.length;

			request.post(curate_options, function (error, response, body) {
			  	if (error) {
			  		console.log('error:', error); // Print the error if one occurred
			  		console.log(curate_options.body);
			  	}
			  	if (response && response.statusCode == 200) {
			  		console.log("got result");
			  		var curated = JSON.parse(body);
			  		var new_comment = curated["comment"];
			  		var blank_values = curated["blanks"];

	  				saveNewComment(data, data.category_string, data.userid, new_comment, blank_values);
	  			} else {
	  				// there was an error from the server
			  		console.log(response.statusCode, body);
			  		console.log(curate_options.body);
			  		// still save it
			  		saveNewComment(data, null, data.userid, data.comment_text, []);
			  	}	  	
			});
	  		
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

  				logs.push({ "time": new Date().getTime(), 
		  						"user": data.userid,
		  						"event": "comment flag", 
		  						"comment ID": data.comment_id,
		  						"design_id": data.design_id});
		  		updateJSON(log_file, logs);
  			}
  		});
  	});

  	// user deleted a comment
  	socket.on('delete comment', function(data) {

  		user_data[data.userid].comments = user_data[data.userid].comments.filter(function(comment) {
  			return comment.comment_id != data.comment_id || comment.design_id != data.design_id;
  		});
  		updateJSON(user_file, user_data);
  		
  		design_data[data.design_id] = design_data[data.design_id].filter(function(comment) {
  			return comment.comment_id != data.comment_id || comment.design_id != data.design_id || comment.userid != data.userid;
  		});
  		updateJSON(design_file, design_data);

  		// find the actual id of the comment they deleted
  		var actual_id = "unknown";
  		comments.forEach(function(comment) {
  			if (comment["user"] == data.userid && comment["users ID"] == data.comment_id) {
  				actual_id = comment["ID"];
  			}
  		})

  		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "comment delete", 
  						"comment ID": actual_id, 
  						"users ID": data.comment_id,
  						"design_id": data.design_id});
  		updateJSON(log_file, logs);
  	});

  	// user canceled comment (closed comment window)
  	socket.on('cancel comment', function(data) {
  		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "clicked cancel comment", 
  						"rubric": data.rubric});
  		updateJSON(log_file, logs);
  	});

  	// user inserted a suggested comment
  	socket.on('suggestion inserted', function(data) {
		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "inserted suggestion", 
  						"rubric": data.rubric,
  						"comment ID": data.comment_id,
  						"comment text": data.comment_text,
  						// length of selection that was replaced by this comment:
  						"selection length": data.selection_length,
  						"design_id": data.design_id}); 
  		updateJSON(log_file, logs);
  	});

  	// user hit autocomplete on a comment
  	socket.on('autocompleted suggestion', function(data) {
  		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "autocompleted suggestion", 
  						"rubric": data.rubric,
  						"comment ID": data.comment_id,
  						"design_id": data.design_id}); 
  		updateJSON(log_file, logs);
  	});

  	// user manually overrode a category
  	socket.on('user category added', function(data) {
  		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "added category", 
  						"comment text": data.comment_text,
  						"category added": data.category,
  						"design_id": data.design_id}); 
  		updateJSON(log_file, logs);
  	});

  	// user manually overrode a category
  	socket.on('user category removed', function(data) {
  		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "added category", 
  						"comment text": data.comment_text,
  						"category removed": data.category,
  						"design_id": data.design_id}); 
  		updateJSON(log_file, logs);
  	});

  	socket.on('done feedback', function(data) {
  		logs.push({ "time": new Date().getTime(), 
  						"user": data.userid,
  						"event": "user feedback", 
  						"feedback": data.feedback}); 
  		updateJSON(log_file, logs);
  	});

  	// user typed something, call real-time predictor and send result back
  	socket.on('comment update', function(data) {

  		if (data.comment && data.comment.length > 3) {
  			options.body = "comment=" + data.comment;
  			options.headers["Content-Length"] = options.body.length;

	  		request.post(options, function (error, response, body) {
			  	if (error) {
			  		console.log('error:', error); // Print the error if one occurred
			  		console.log(options.body);
			  	}
			  	if (response && response.statusCode == 200) {
			  		console.log('category:', body); 
			  		if (body.length != 3) {
			  			console.log("error with category string length");
			  		} else {
			  			socket.emit('category', {rubric: data.rubric, category_string: body});
			  			/*logs.push({ "time": new Date().getTime(), 
				  						"user": address,
				  						"event": "typing comment", 
				  						"rubric": data.rubric,
				  						"comment": data.comment,
				  						"prediction": body,
				  						"design_id": data.design_id});
				  		updateJSON(log_file, logs);*/
			  		}
			  	}		  	
			});
		} else {
			socket.emit('category', {rubric: data.rubric, category_string: "000"});
			/*logs.push({ "time": new Date().getTime(), 
	  						"user": address,
	  						"event": "typing comment", 
	  						"rubric": data.rubric,
	  						"comment": data.comment,
	  						"prediction": "000",
	  						"design_id": data.design_id});
	  		updateJSON(log_file, logs);*/
		}

  	});
});
