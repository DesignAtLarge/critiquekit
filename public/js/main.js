var full_sorted_comments = {"Readability": [], "Layout": [], "Balance": [], "Simplicity": [], "Emphasis": [], 
	"Consistency": [], "Appropriateness": []};
var rubric_categories = Object.keys(full_sorted_comments);
var latest_comment_inserted = -1;
var socket;

// user submitted a comment, add it to the posted comments and notify the server
function submitComment(comment_text, dom_container) {

	var rubric = dom_container.parents(".rubric_cat").attr("id");
	
	// send to server
	socket.emit('comment submitted', 
		{comment_id: latest_comment_inserted, comment_text: comment_text, rubric: rubric});
	latest_comment_inserted = -1; // reset

	var comments_section = dom_container.parents(".rubric_cat").find(".posted_comments");
	comments_section.append("<div class='posted_comment'>" + comment_text + "</div>");
	dom_container.find(".comment_text").val("");
	displayComments(rubric, full_sorted_comments[rubric]);

	dom_container.parents(".comment_interface").hide();
	dom_container.parents(".rubric_cat").find(".add_comment").show();
}

// display comments for the given rubric item
function displayComments(rubric, comments) {
	var good_section = $("#" + rubric).find(".comments_good");
	var bad_section = $("#" + rubric).find(".comments_bad");
	var should_section = $("#" + rubric).find(".comments_should");

	good_section.html("");
	bad_section.html("");
	should_section.html("");

	comments.forEach(function(comment, i) {
		var shade = comment["shade"];

		var string = "<tr id='comment_" + comment["ID"] + 
	        "' class='comment' style='color: rgb(" + shade + ", " + shade + ", " + shade + ")'>" + 
	        	"<td><span class='insert_btn glyphicon glyphicon-circle-arrow-right'></span></td>" +
	        	"<td class='comment_val comment_" + i + "'>" + comment["comment"] + "</td>" + 
	        "</tr>";

		if (comment["category"] == "1") {
			good_section.append(string);
		} else if (comment["category"] == "2")	{
	        bad_section.append(string);
	    } else if (comment["category"] == "3") {
	        should_section.append(string);
	    } else {
	        good_section.append("error with comment category");
	    }
	});

	// callback for when a suggestion is clicked
	$(".insert_btn").unbind();
	$(".insert_btn").click(function(obj) { 
		var comment_id = $(this).parents(".comment").attr("id").split("comment_")[1];

		var suggestion_box = $(this).parents(".suggestion_box")

		var comment = $(this).parents("tr").find(".comment_val").html();

		// remove the blanky stuff
		var blank_loc = comment.indexOf("<input");
		var blank_i = 0;
		while (blank_loc != -1) {
			comment = comment.replace(/<input.*?>/, $(this).parents("tr").find(".blank").get(blank_i).value);
			blank_i++;
			blank_loc = comment.indexOf("<input");
		}

		suggestion_box.find(".comment_text").val(comment);
		console.log(comment);
		console.log(suggestion_box.find(".comment_text"));

		comment = comment.replace(/"/g, '\\"').replace(/'/g, "\\'");

		// remember that we inserted it
		latest_comment_inserted = comment_id;

	});
}

// search comments, called whenever used types in text box
function searchComments(query, suggestion_box) {
	var result_comments = [];
	var rubric = suggestion_box.parents(".rubric_cat").attr("id");
	var comments_to_search = full_sorted_comments[rubric];
	for (var i = 0; i < comments_to_search.length; i++) {
		var comment = comments_to_search[i];
		if (comment["comment"].toLowerCase().includes(query.toLowerCase())) {
			result_comments.push(comment);
		}
	}
	displayComments(rubric, result_comments);
}


$(function(){
	socket = io();

    $("#navbar_container").load("navbar.html"); 

    // load comment box for each rubric category
    rubric_categories.forEach(function(rubric_cat, i) {
    	$("#rubrics_container").append("<h4>" + rubric_cat + "</h4><div id='" + rubric_cat + "' class='rubric_cat'></div>");
    	$("#" + rubric_cat).load("commenting.html", function() {
    		if (i == rubric_categories.length - 1) {
    			// last one added, so set all the event handlers
    			$(".add_comment").click(function() {
	    			$(this).hide();
			    	$(this).parent().find(".comment_interface").show();
			    });
			    $(".cancel_comment").click(function() {
			    	$(this).parents(".comment_interface").hide();
			    	$(this).parents(".rubric_cat").find(".add_comment").show();
			    });
			    $(".submit_comment").click(function() {
			    	// get the contents of comment box
			    	var dom_container = $(this).parent();
			    	var comment_text = dom_container.find(".comment_text").val();
			    	submitComment(comment_text, dom_container);
			    });
    		}

    		socket.emit('get comments', rubric_cat);
    	});
    });

    // comments received, so display them
    socket.on('comments', function(data) {
    	var rubric = data.rubric;
    	full_sorted_comments[rubric] = data.comments;
    	displayComments(data.rubric, data.comments);

		// search functionality
		$(".comment_text").on("input", function() {
			searchComments($(this).val(), $(this).parent());
		});
    });
});