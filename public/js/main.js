var design_link = "http://cseweb.ucsd.edu/~cafraser/"; // LINK to the website to be evaluated

var full_sorted_comments = {"Readability": [], "Layout": [], "Balance": [], "Simplicity": [], "Emphasis": [], 
	"Consistency": [], "Appropriateness": []};
var rubric_categories = Object.keys(full_sorted_comments);
var latest_comment_inserted = -1;
var socket;

var flagging_comment_id = "";
var flagging_comment_rubric = "";
var deleting_comment_id = "";
var correcting_category = 0;
var correcting_rubric = "";

var newest_comment_id = 0;
var current_rubric = "";

// user submitted a comment, add it to the posted comments and notify the server
function submitComment(comment_text, dom_container) {

	var rubric = dom_container.parents(".rubric_cat").attr("id");
	var comment_location = $("#location_" + newest_comment_id);
	if (comment_location.size() > 0) {
		comment_location.html(comment_text);
	}

	if (comment_text != "") {

		var yes_categories = dom_container.find(".comment_text").attr("data-categories");
		var no_categories = dom_container.find(".comment_text").attr("data-nocategories");

		// if comment_location.size() > 0, this comment was pasted on somehwere
		// send the location?

		// send to server
		socket.emit('comment submitted', 
			{comment_id: latest_comment_inserted, new_comment_id: newest_comment_id, comment_text: comment_text, 
				rubric: rubric, yes_categories: yes_categories, no_categories: no_categories});
		latest_comment_inserted = -1; // reset

		var comments_section = dom_container.parents(".rubric_cat").find(".posted_comments");
		comments_section.append("<div class='posted_comment' id='new_comment_" + newest_comment_id + "'>" + 
			"<span class='new_comment_text'>" + comment_text + "</span>" +
				"<span class='trash_comment glyphicon glyphicon-trash' title='Delete comment' " + 
					"data-toggle='modal' data-target='#delete_modal'></span></div>");

		$("#new_comment_" + newest_comment_id + " .trash_comment").click(function() {
			var comment_text = $(this).parent().find(".new_comment_text").html();
			$("#delete_text").html(comment_text);

			deleting_comment_id = $(this).parents(".posted_comment").attr("id").split("new_comment_")[1];
			console.log(deleting_comment_id);
		});

		$("#new_comment_" + newest_comment_id).hover(function() {
			commentHover($(this).attr("id").split("new_comment_")[1]);
			}, function() {
			commentUnHover($(this).attr("id").split("new_comment_")[1]);
		});
		$("#location_" + newest_comment_id).hover(function() {
			commentHover($(this).attr("id").split("location_")[1]);
			}, function() {
			commentUnHover($(this).attr("id").split("location_")[1]);
		});


		dom_container.find(".comment_text").val("");
		displayComments(rubric, full_sorted_comments[rubric]);

		dom_container.parents(".comment_interface").hide();
		dom_container.parents(".rubric_cat").find(".add_comment").show();

		newest_comment_id++;
	} else if (comment_text == "") {
		alert("You can't submit an empty comment!");
	}
}

function commentHover(comment_id) {
	$("#new_comment_" + comment_id).css("background-color", "rgba(28, 169, 196, 0.5)");
	$("#location_" + comment_id).css("background-color", "rgba(28, 169, 196, 0.5)");
}

function commentUnHover(comment_id) {
	$("#new_comment_" + comment_id).css("background-color", "white");
	$("#location_" + comment_id).css("background-color", "rgba(200, 200, 200, 0.7)");
}

function updateComment(rubric) {
	// get comment text
	setTimeout(function() { // let it update
		var comment_text = $("#" + current_rubric).find(".comment_text.tt-input").val();

		// send to server.js
		socket.emit("comment update", {comment: comment_text, rubric: current_rubric});
	}, 100);
}

// called everytime categories are updated
// update submit button colour to match
function categoryUpdate(rubric) {
	var num_green = 0;
	for (var i = 1; i <=3; i++) {
		var icon = $("#" + rubric).find(".indicator_" + i)
		if (icon.hasClass("glyphicon-ok")) {
			num_green++;
		}
	}
	var selector = $("#" + rubric).find(".submit_comment");

	if (num_green == 0) { // red
		selector.css("background-color", "rgba(139, 0, 0, 0.2)");
		selector.hover(function() {
		  	$(this).css("background-color","rgba(139, 0, 0, 0.5)")
			}, function() {
				$(this).css("background-color","rgba(139, 0, 0, 0.2)")
		});
	} else if (num_green == 3) { // green
		selector.css("background-color", "rgba(0, 150, 0, 0.2)");
		selector.hover(function() {
		  	$(this).css("background-color","rgba(0, 150, 0, 0.5)")
			}, function() {
			$(this).css("background-color","rgba(0, 150, 0, 0.2)")
		});
	} else { // orange
		selector.css("background-color", "rgba(186, 99, 0, 0.2)");
		selector.hover(function() {
		  	$(this).css("background-color","rgba(186, 99, 0, 0.5)")
			}, function() {
			$(this).css("background-color","rgba(186, 99, 0, 0.2)")
		});
	}
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
	        	"<td><span class='insert_btn glyphicon glyphicon-circle-arrow-right' title='Insert this comment'></span></td>" +
	        	"<td class='comment_val comment_" + i + "'>" + comment["comment"] + "</td>" + 
	        	"<td><span class='glyphicon glyphicon-flag flag_btn' title='Flag this comment' " + 
	        		"data-toggle='modal' data-target='#flag_modal'></span></td>" +
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

	$("#" + rubric + " .flag_btn").click(function() {
		var comment_text = $(this).parents("tr").find(".comment_val").html();
		// remove the blanky stuff
		comment_text = comment_text.replace(/<input.*?>/g, "_____");
		$("#flag_text").html(comment_text);

		flagging_comment_id = $(this).parents("tr").attr("id").split("comment_")[1];
		flagging_comment_rubric = rubric;
	});

	// set blank widths
	$("input[placeholder]").each(function () {
        $(this).attr('size', Math.max($(this).attr('placeholder').length, 10));
    });

	// INSERT A SUGGESTION
	$(".insert_btn").unbind();
	$(".insert_btn").click(function(obj) { 
		$(".typeahead").typeahead('close');

		var comment_id = $(this).parents(".comment").attr("id").split("comment_")[1];

		current_rubric = $(this).parents(".rubric_cat").attr("id");

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
		var comment_textarea = suggestion_box.find(".comment_text.tt-input");
		//console.log(comment_textarea[0].selectionStart);
		//console.log(comment_textarea[0].selectionEnd);

		comment_textarea.val(comment_textarea.val().substring(0, comment_textarea[0].selectionStart) + 
				comment_textarea.val().substring(comment_textarea[0].selectionEnd));
		comment_textarea.val(comment_textarea.val() + comment);
		comment_textarea.select();

		comment = comment.replace(/"/g, '\\"').replace(/'/g, "\\'");

		// remember that we inserted it
		latest_comment_inserted = comment_id;

		// scroll back to top of div so you can see inserted comment
		suggestion_box.animate({ scrollTop: 0 }, "fast");

		updateComment();

	});
}

// search comments, called whenever used types in text box
function searchComments(query, suggestion_box) {
	var rubric = suggestion_box.parents(".rubric_cat").attr("id");
	var result_comments = getMatchingComments(query, rubric);
	
	displayComments(rubric, result_comments);
}

var typeAheadSearch = function(rubric) {
	return function findMatches(q, cb) {
		var matches = getMatchingComments(q, rubric);
		var strings = matches.map(function(element) {
			return element["comment"].replace(/<input.*?>/g, "_____");
		});
		//console.log(strings);
		cb(strings);
	};
};

function getMatchingComments(query, rubric) {
	var result_comments = [];
	var comments_to_search = full_sorted_comments[rubric];
	for (var i = 0; i < comments_to_search.length; i++) {
		var comment = comments_to_search[i];
		if (comment["comment"].toLowerCase().includes(query.toLowerCase())) {
			result_comments.push(comment);
		}
	}
	return result_comments;
}

function addLocation(dom_container) {
	// disable links in iframe by making its div container have a layer over it 
	$("#design_container").addClass("choosing_location");

	var rubric = dom_container.attr("id");

	// wait for user click
	$("#design_container").click(function(event) {		
		$("#main_container").append("<div id='location_" + newest_comment_id + 
				"' class='comment_location' style='top: " + event.pageY + 
				"px; left: " + event.pageX + "px;'><i>Press Submit to see your comment here.</i></div>");

		// remove the layer & click event
		$("#design_container").unbind();
		$("#design_container").removeClass("choosing_location");
	});
}


$(function(){
	socket = io();

    $("#navbar_container").load("navbar.html"); 

    $("#design_frame").attr("src", design_link);

    // event handlers for modal dialogs
    $("#confirm_flag").click(function() {
    	socket.emit('flag comment', {rubric: flagging_comment_rubric, comment_id: flagging_comment_id});
    	$("#comment_" + flagging_comment_id).find(".flag_btn").css("color", "#CF0000");
    	flagging_comment_rubric = "";
    	flagging_comment_id = "";
    });

    $("#confirm_delete").click(function() {
    	socket.emit('delete comment', {comment_id: deleting_comment_id});
    	$("#new_comment_" + deleting_comment_id).remove();
    	$("#location_" + deleting_comment_id).remove();
    	deleting_comment_id = "";
    });

    $("#correct_yes").click(function() {
    	$("#" + correcting_rubric).find(".comment_text").attr("data-categories", 
    		$("#" + correcting_rubric).find(".comment_text").attr("data-categories") + correcting_category);

    	$("#" + correcting_rubric).find(".comment_text").attr("data-nocategories", 
    		$("#" + correcting_rubric).find(".comment_text").attr("data-nocategories").replace(correcting_category, ""));

    	$("#" + correcting_rubric).find(".indicator_" + correcting_category)
    		.addClass("glyphicon-ok")
    		.removeClass("glyphicon-remove");

    	categoryUpdate(correcting_rubric);
    });

	$("#correct_no").click(function() {
    	$("#" + correcting_rubric).find(".comment_text").attr("data-categories", 
    		$("#" + correcting_rubric).find(".comment_text").attr("data-categories").replace(correcting_category, ""));

    	$("#" + correcting_rubric).find(".comment_text").attr("data-nocategories", 
    		$("#" + correcting_rubric).find(".comment_text").attr("data-nocategories") + correcting_category);

    	$("#" + correcting_rubric).find(".indicator_" + correcting_category)
    		.removeClass("glyphicon-ok")
    		.addClass("glyphicon-remove");

    	categoryUpdate(correcting_rubric);
    });

    $(window).on("autocompleted", function() { 
    	var comment_text = $("#" + current_rubric).find(".comment_text").val();
    	full_sorted_comments[current_rubric].forEach(function(check_comment) {
    		if (check_comment["comment"].replace(/<input.*?>/g, "_____") == comment_text) {
    			latest_comment_inserted = check_comment["ID"];
    			updateComment();
    		}
    	});
    });

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
			    	$(this).parents(".suggestion_box").find(".comment_text.tt-input").val("");
			    	updateComment();
			    	$(this).parents(".comment_interface").hide();
			    	$(this).parents(".rubric_cat").find(".add_comment").show();
			    	socket.emit('cancel comment');
			    });
			    $(".submit_comment").click(function() {
			    	// get the contents of comment box
			    	var dom_container = $(this).parents(".suggestion_box");
			    	var comment_text = dom_container.find(".comment_text.tt-input").val();
			    	submitComment(comment_text, dom_container);
			    });
			    $(".add_location").click(function() {
			    	var dom_container = $(this).parents(".rubric_cat");
			    	addLocation(dom_container);
			    });
			    $(".indicator").hover(function() {
			    	// function for hovering in and out of button
			    	if ($(this).hasClass("glyphicon-remove")) {
			    		$(this).removeClass("glyphicon-remove");
			    		$(this).addClass("glyphicon-ok");
			    	} else {
			    		$(this).removeClass("glyphicon-ok");
			    		$(this).addClass("glyphicon-remove");
			    	}
			    });

			    $(".indicator").click(function() {
			    	if ($(this).hasClass("indicator_1")) {
			    		correcting_category = 1;
			    	} else if ($(this).hasClass("indicator_2")) {
			    		correcting_category = 2;
			    	} else if ($(this).hasClass("indicator_3")) {
			    		correcting_category = 3;
			    	}
			    	correcting_rubric = $(this).parents(".rubric_cat").attr("id");
			    	var category_text = "";
			    	if (correcting_category == 1) {
			    		category_text = "positive statement";
			    	} else if (correcting_category == 2) {
			    		category_text = "problem statement";
			    	} else if (correcting_category == 3) {
			    		category_text = "suggested solution";
			    	}
			    	$("#correction_type").html(category_text);
			    });

			    $(".comment_text").each(function() {
			    	var rubric = $(this).parents(".rubric_cat").attr("id");
			    	$(this).typeahead({
						minLength: 2,
						hint: true
					},
					{
						source: typeAheadSearch(rubric),
						limit: 5
					});
					$(this).typeahead('val', '');

					$(this).keydown(function(e) {
						var this_rubric = $(this).parents(".rubric_cat").attr("id");
						current_rubric = this_rubric;
						updateComment();
					});
				});
				$(".comment_text").on('typeahead:open', function() {
					$(this).typeahead('val', $(this).val());
				});
				$(".comment_text").on('typeahead:select', function() {
					console.log("select");
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

    // got a categorization for this comment
    socket.on('category', function(data) {
    	console.log("category: " + data.category_string)
    	var rubric = data.rubric;

    	for (var i = 1; i <=3; i++) {
    		var icon = $("#" + rubric).find(".indicator_" + i)
    		if (parseInt(data.category_string[i-1])) {
    			// category i is YES
    			icon.addClass("glyphicon-ok").removeClass("glyphicon-remove");
    		} else {
    			// category i is NO
    			icon.addClass("glyphicon-remove").removeClass("glyphicon-ok");
    		}
    		categoryUpdate(rubric);
    	}
    });
});