// LINKs to the websites to be evaluated
var design_links = ["./design/design1.html", "./design/design2.html", "./design/design3.html"]; 
var design_num; // index of design currently being evaluated

var full_sorted_comments = {"VisualAesthetics": [], "Functionality": [], "AdditionalFeedback": []};
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
var iframe;
var previous_highlight = undefined;
var choosing_location = false;
var location_words = ["this", "that", "there", "here"];

// user submitted a comment, add it to the posted comments and notify the server
function submitComment(comment_text, dom_container) {

	var rubric = dom_container.parents(".rubric_cat").attr("id");
	var comment_location = iframe.find("#location_" + newest_comment_id);
	if (comment_location.size() > 0) {
		comment_location.find(".location_text").html(comment_text);
	}

	if (comment_text != "") {

		var category_string = dom_container.find(".comment_text").attr("data-categorystring");
		var location = (comment_location.size() > 0); // whether this comment was pasted on somehwere
		// send the location?
			
		// send to server
		socket.emit('comment submitted', 
			{comment_id: latest_comment_inserted, new_comment_id: newest_comment_id, comment_text: comment_text, 
				rubric: rubric, category_string: category_string, location: location});
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
		iframe.find("#location_" + newest_comment_id).hover(function() {
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
	iframe.find("#location_" + comment_id).css("background-color", "rgba(177, 218, 226, 1.0)");
	iframe.find("#location_" + comment_id).css("z-index", "1001");
}

function commentUnHover(comment_id) {
	$("#new_comment_" + comment_id).css("background-color", "white");
	iframe.find("#location_" + comment_id).css("background-color", "rgba(200, 200, 200, 0.7)");
	iframe.find("#location_" + comment_id).css("z-index", "1000");
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
		var selection_start = comment_textarea[0].selectionStart;
		var selection_end = comment_textarea[0].selectionEnd;

		comment_textarea.val(comment_textarea.val().substring(0, selection_start) + 
				comment_textarea.val().substring(selection_end));
		comment_textarea.val(comment_textarea.val() + comment);
		comment_textarea.select();

		comment = comment.replace(/"/g, '\\"').replace(/'/g, "\\'");

		// remember that we inserted it
		latest_comment_inserted = comment_id;

		// scroll back to top of div so you can see inserted comment
		suggestion_box.animate({ scrollTop: 0 }, "fast");

		updateComment();

		socket.emit("suggestion inserted", {rubric: current_rubric, comment_id: comment_id, 
			comment_text: comment, selection_length: selection_end - selection_start});

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

function selectLocation(element) {
	var side;
	var x_location;
	var target = $(element.target);
	console.log(target);
	var targetX = target.offset().left;
	var targetY = target.offset().top;

	if (targetX < ($("#design_container").width() / 2)) {
		side = "left";
		x_location = targetX;
	} else {
		side = "right";
		x_location = iframe.find("body").width() - targetX;
	}

	iframe.find("body").append(
		"<div id='location_" + newest_comment_id + 
			"' class='comment_location' style='top: " + targetY + 
			"px; " + side + ": " + x_location + "px;'><div class='location_text'>" + 
				"<i>Press Submit to see your comment here.</i></div>" + 
			"<div class='location_marker_" + side + "'></div>" + 
		"</div>"
	);

	cancelLocation();
}

function cancelLocation() {
	choosing_location = false;
	stopHighlightDOMElements();
	$("#adding_location_modal").hide();
}

function addLocation(dom_container) {

	$("#adding_location_modal").show();
	highlightDOMElements();
	choosing_location = true;
}

// activate when user is choosing where to place their comment
function highlightDOMElements() {
	console.log(iframe);
	if (iframe != undefined) {
		iframe.mouseover(function(element) {
			var target = $(element.target);
			console.log(target);
			if (!(target.hasClass("comment_location") || target.parent().hasClass("comment_location"))) {
				if (previous_highlight != undefined) {
					previous_highlight.removeClass("highlight");
				}
				target.addClass("highlight");
				previous_highlight = target;
			}
		});
		iframe.mouseout(function(element) {
			var target = $(element.target);
			if (!(target.hasClass("comment_location") || target.parent().hasClass("comment_location"))) {
				if (previous_highlight != undefined) {
					previous_highlight.removeClass("highlight");
				}
			}
		});
	} else {
		console.log("ERROR, iframe not loaded yet");
	}
}

// when user has chosen location, stop highlighting
function stopHighlightDOMElements() {
	if (previous_highlight != undefined) {
		previous_highlight.removeClass("highlight");
		previous_highlight = undefined;
	}
	if (iframe != undefined) {
		iframe.unbind("mouseover");
		iframe.unbind("mouseout");
	}
}

function checkIcon(icon) {
	if (!icon.hasClass("glyphicon-ok")) {
		icon.addClass("glyphicon-ok").removeClass("glyphicon-remove");
		icon.parent().css("background-color", "rgb(0, 128, 0, 0.3)");
		icon.parent().animate({ "background-color": "transparent"}, 500);
	}
}

function uncheckIcon(icon) {
	if (!icon.hasClass("glyphicon-remove")) {
		icon.addClass("glyphicon-remove").removeClass("glyphicon-ok");
		icon.parent().css("background-color", "rgb(178, 0, 0, 0.3)");
		icon.parent().animate({ "background-color": "transparent"}, 500);
	}
}

function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}


$(function(){
	socket = io();

    $("#navbar_container").load("navbar.html"); 
    $("#help_modal").load("help.html", function() {
    	$("#next_help").click(function() {
    		$("#help_page_1").hide();
    		$("#help_page_2").show();
    		$("#prev_help").show();
    		$("#next_help").hide();
    		$("#done_help").show();
    	});
    	$("#prev_help").click(function() {
    		$("#help_page_2").hide();
    		$("#help_page_1").show();
    		$("#prev_help").hide();
    		$("#next_help").show();
    		$("#done_help").hide();
    	});

    });

    $("#done_modal").load("done.html", function() {
    	$("#confirm_done").click(function() {
	    	// go to next design
	    	socket.emit('done design', design_num);
	    	var url_parts = window.location.href.split("=");
	    	design_num++;
	    	if (design_num < design_links.length) {
	    		window.location.href = url_parts[0] + "=" + design_num
	    	} else {
	    		// show message that you're done
	    		$("#done_modal").find(".modal-body").html(
	    			"Thank you for the feedback! You have completed the study and may now close this window.");
	    		$("#done_modal").find(".modal-footer").html("");
	    		$("#done_modal").find(".close").hide();
	    	}
	    });
    });

    design_num = urlParam("design");

    $("#design_frame").attr("src", design_links[design_num]);

    $("#design_frame").load(function() {
    	socket.emit('loaded design', design_num);
    	iframe = $("#design_frame").contents();
    	console.log("iframe loaded");
    	// disable all clicks / links on iframe
    	iframe.get(0).addEventListener("click", function(e) {
		    e.stopPropagation();
		    e.preventDefault();
		    if (choosing_location) {
		    	selectLocation(e);
		    }
		}, true);
    });

    $("#location_cancel").click(function() {
    	cancelLocation();
    });

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
    	iframe.find("#location_" + deleting_comment_id).remove();
    	deleting_comment_id = "";
    });

    $("#correct_yes").click(function() {

    	var category_string = $("#" + correcting_rubric).find(".comment_text").attr("data-categorystring");
    	var index = correcting_category - 1;
    	category_string = category_string.substring(0, index) + "1" + category_string.substring(index+1);
    	$("#" + correcting_rubric).find(".comment_text").attr("data-categorystring", category_string);

    	$("#" + correcting_rubric).find(".indicator_" + correcting_category)
    		.addClass("glyphicon-ok corrected")
    		.removeClass("glyphicon-remove");

    	socket.emit('user category added', {comment_text: $("#" + correcting_rubric).find(".comment_text.tt-input").val(),
    										category: correcting_category});

    	categoryUpdate(correcting_rubric);
    });

	$("#correct_no").click(function() {
    	var category_string = $("#" + correcting_rubric).find(".comment_text").attr("data-categorystring");
    	var index = correcting_category - 1;
    	category_string = category_string.substring(0, index) + "0" + category_string.substring(index+1);
    	$("#" + correcting_rubric).find(".comment_text").attr("data-categorystring", category_string);

    	$("#" + correcting_rubric).find(".indicator_" + correcting_category)
    		.removeClass("glyphicon-ok")
    		.addClass("glyphicon-remove corrected");

    	socket.emit('user category removed', {comment_text: $("#" + correcting_rubric).find(".comment_text.tt-input").val(),
    										category: correcting_category});

    	categoryUpdate(correcting_rubric);
    });

    $(window).on("autocompleted", function() { 
    	var comment_text = $("#" + current_rubric).find(".comment_text").val();
    	full_sorted_comments[current_rubric].forEach(function(check_comment) {
    		if (check_comment["comment"].replace(/<input.*?>/g, "_____").toLowerCase() == comment_text.toLowerCase()) {
    			latest_comment_inserted = check_comment["ID"];
    			socket.emit('autocompleted suggestion', {rubric: current_rubric, comment_id: latest_comment_inserted});
    			updateComment();
    		}
    	});
    });

    // load comment box for each rubric category
    rubric_categories.forEach(function(rubric_cat, i) {
    	rubric_cat_orig = rubric_cat;
    	if (rubric_cat == "VisualAesthetics") rubric_cat_orig = "Visual Aesthetics";
    	if (rubric_cat == "AdditionalFeedback") rubric_cat_orig = "Additional Feedback";
    	$("#rubrics_container").append("<h4>" + rubric_cat_orig + "</h4><div id='" + rubric_cat + "' class='rubric_cat'></div>");
    	$("#" + rubric_cat).load("commenting.html", function() {
    		if (i == rubric_categories.length - 1) {
    			// last one added, so set all the event handlers
    			$(".add_comment").click(function() {
	    			$(this).hide();
			    	$(this).parent().find(".comment_interface").show();
			    	socket.emit("clicked add comment", $(this).parents(".rubric_cat").attr("id"));
			    });
			    $(".cancel_comment").click(function() {
			    	$(this).parents(".suggestion_box").find(".comment_text.tt-input").val("");
			    	searchComments("", $(this).parents(".suggestion_box")); // clear search
			    	updateComment();
			    	$(this).parents(".comment_interface").hide();
			    	$(this).parents(".rubric_cat").find(".add_comment").show();
			    	// delete location if one was made
			    	iframe.find("#location_" + newest_comment_id).remove();
			    	socket.emit('cancel comment', $(this).parents(".rubric_cat").attr("id"));
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
						deleting = (e.which == 46 || e.which == 8) // true for delete or backspace

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
    	var rubric = data.rubric;

    	for (var i = 1; i <=3; i++) {
    		var icon = $("#" + rubric).find(".indicator_" + i)
    		if (!icon.hasClass("corrected") || deleting == true) {
	    		if (parseInt(data.category_string[i-1])) {
	    			// category i is YES
	    			checkIcon(icon);
	    		} else {
	    			// category i is NO
	    			uncheckIcon(icon);
	    		}
	    		// save category
	    		$("#" + rubric).find(".comment_text").attr("data-categorystring", data.category_string);
	    		categoryUpdate(rubric);
	    	}
    	}
    });
});