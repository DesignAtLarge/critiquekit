var express = require('express');
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

//app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));

/*app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
var io = require('socket.io')(app);*/
const io = socketIO(server);


// get comments for given rubric and sort them
function loadComments(rubric_category) {
	var output = [];
	output = comments.filter(function(comment) {
		return comment["rubric"] == rubric_category;
	});
	console.log(output);

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

  	// a suggestion was posted, save it and update frequency if a suggestion was clicked
  	socket.on('comment submitted', function(data) {
  		// find the clicked comment in comments
  		if (data.comment_id != -1) {
  			//console.log("a comment was clicked");
	  		var this_comment = comments.find(function(element) {
	  			return element["ID"] == data.comment_id;
	  		});

	  		this_comment["frequency"] = parseInt(this_comment["frequency"] + 1);

	  		// compare the text, if they are exactly the same do nothing
	  		// if they are not, maybe eventually (TODO) replace with whichever is better, 
	  		// but for now also just do nothing
	  		// TODO at least log the event though
	  	} else {
	  		//console.log("no comment clicked");
	  		// TODO run the whole algo on it and everything, then add the new comment to the corpus
	  		//data.new_comment_id is the id it was assigned by this user
	  		// will need to create a new id since that is client-specific, but still save it in case client deletes it
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
  			}
  		});
  	});

  	// user deleted a comment
  	socket.on('delete comment', function(data) {
  		//TODO
  		// log delete event
  	});

  	// user canceled comment (closed comment window)
  	socket.on('cancel comment', function() {
  		// TODO log comment canceled
  	});
});
