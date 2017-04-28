var design_id; 
var consent = false;
var mode;
var design_ids = ["A12345", "A54321", "A99999"];

var full_sorted_comments = {"VisualDesign": [], "ContentFunctionality": [], "AdditionalFeedback": []};
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
var saved_comments;

var current_help_page = 0;
var num_help_pages = 8;
var cookie_val;

var name = "Ailie";
var pid = "A12345";
//var pid = "A54321";

/*if (Math.random() < 0.5) {
	window.location.href = "http://critiquekit-study.herokuapp.com";
}*/

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
		var location_style = "";
		if (location) location_style = comment_location.attr("style");
			
		// send to server
		socket.emit('comment submitted', 
			{comment_id: latest_comment_inserted, new_comment_id: newest_comment_id, comment_text: comment_text, 
				rubric: rubric, category_string: category_string, location_style: location_style, 
				design_id: design_id, cookie_val: cookie_val});
		latest_comment_inserted = -1; // reset

		var comments_section = dom_container.parents(".rubric_cat").find(".posted_comments");
		appendNewComment(comments_section, newest_comment_id, comment_text);


		dom_container.find(".comment_text").val("");
		displayComments(rubric, full_sorted_comments[rubric]);

		dom_container.parents(".comment_interface").hide();
		dom_container.parents(".rubric_cat").find(".add_comment").show();

		newest_comment_id++;
	} else if (comment_text == "") {
		alert("You can't submit an empty comment!");
	}
}

function appendNewComment(comments_section, comment_id, comment_text) {
	comments_section.append("<div class='posted_comment' id='new_comment_" + comment_id + "'>" + 
		"<span class='new_comment_text'>" + comment_text + "</span>" +
			"<span class='trash_comment glyphicon glyphicon-trash' title='Delete comment' " + 
				"data-toggle='modal' data-target='#delete_modal'></span></div>");

	$("#new_comment_" + comment_id + " .trash_comment").click(function() {
		var comment_text = $(this).parent().find(".new_comment_text").html();
		$("#delete_text").html(comment_text);

		deleting_comment_id = $(this).parents(".posted_comment").attr("id").split("new_comment_")[1];
		console.log(deleting_comment_id);
	});

	$("#new_comment_" + comment_id).hover(function() {
		commentHover($(this).attr("id").split("new_comment_")[1]);
		}, function() {
		commentUnHover($(this).attr("id").split("new_comment_")[1]);
	});

	if (mode == "view") {
		$(".trash_comment").hide();
	}
}

function commentHover(comment_id) {
	if (!choosing_location) {
		$("#new_comment_" + comment_id).css("background-color", "rgba(255, 156, 209, 1.0)");
		iframe.find("#location_" + comment_id).css("background-color", "rgba(255, 156, 209, 1.0))");
		iframe.find("#location_" + comment_id).css("z-index", "10001");
	}
}

function commentUnHover(comment_id) {
	if (!choosing_location) {
		$("#new_comment_" + comment_id).css("background-color", "white");
		iframe.find("#location_" + comment_id).css("background-color", "rgba(255, 156, 209, 0.7)");
		iframe.find("#location_" + comment_id).css("z-index", "10000");
	}
}

function updateComment(rubric) {
	// get comment text
	setTimeout(function() { // let it update
		var comment_text = $("#" + current_rubric).find(".comment_text.tt-input").val();
		iframe.find("#location_" + newest_comment_id + " .location_text").html(comment_text);

		// send to server.js
		socket.emit("comment update", {comment: comment_text, rubric: current_rubric, design_id: design_id,
			cookie_val: cookie_val});
	}, 100);
}

// called everytime categories are updated 
// update submit button colour to match
function categoryUpdate(rubric) {
	var color = "red";
	var icon1 = $("#" + rubric).find(".indicator_1");
	var icon2 = $("#" + rubric).find(".indicator_2");
	var icon3 = $("#" + rubric).find(".indicator_3");
	var icon4 = $("#" + rubric).find(".indicator_4");
	if (icon1.hasClass("glyphicon-ok") && icon4.hasClass("glyphicon-ok") ||
		icon2.hasClass("glyphicon-ok") && icon3.hasClass("glyphicon-ok")) {
		color = "green";
	} else if (icon1.hasClass("glyphicon-ok") || icon2.hasClass("glyphicon-ok") ||
		icon3.hasClass("glyphicon-ok") || icon4.hasClass("glyphicon-ok")) {
		color = "orange";
	}

	var selector = $("#" + rubric).find(".submit_comment");

	if (color == "red") { // red
		selector.css("background-color", "rgba(139, 0, 0, 0.2)");
		selector.hover(function() {
		  	$(this).css("background-color","rgba(139, 0, 0, 0.5)")
			}, function() {
				$(this).css("background-color","rgba(139, 0, 0, 0.2)")
		});
	} else if (color == "green") { // green
		selector.css("background-color", "rgba(0, 150, 0, 0.2)");
		selector.hover(function() {
		  	$(this).css("background-color","rgba(0, 150, 0, 0.5)")
			}, function() {
			$(this).css("background-color","rgba(0, 150, 0, 0.2)")
		});
	} else if (color == "orange") { // orange
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
		if (comment["flagged"] != true) {
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
			var blank_value = $(this).parents("tr").find(".blank").get(blank_i).value;
			if (blank_value == "") blank_value = "______";
			comment = comment.replace(/<input.*?>/, blank_value);
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

		socket.emit("suggestion inserted", {rubric: current_rubric, comment_id: comment_id, 
			comment_text: comment, selection_length: selection_end - selection_start, design_id: design_id, 
			cookie_val: cookie_val});

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

function selectLocation(element) {
	var side;
	var x_location;
	var target = $(element.target);
	console.log(target);
	var targetX = element.pageX;
	var targetY = element.pageY;

	if (targetX < ($("#design_container").width() / 2)) {
		side = "left";
		x_location = targetX;
	} else {
		side = "right";
		x_location = iframe.find("body").width() - targetX;
	}

	var style = "top: " + targetY + "px; " + side + ": " + x_location + "px;";
	var comment_text = $("#" + current_rubric).find(".comment_text.tt-input").val();
	appendLocationComment(current_rubric, newest_comment_id, comment_text, style);

	$("#" + current_rubric).find(".add_location").hide();
	$("#" + current_rubric).find(".remove_location").show();

	cancelLocation();
}

function appendLocationComment(rubric, comment_id, comment_text, style) {
	var side;
	if (style.indexOf("left") != -1) {
		side = "left";
	} else {
		side = "right";
	}


	iframe.find("body").append(
		"<div id='location_" + comment_id + 
			"' class='comment_location' style='" + style + "'><div class='location_text'></div>" + 
			"<div class='location_marker_" + side + "'></div>" + 
		"</div>"
	);

	iframe.find("#location_" + comment_id + " .location_text").html(comment_text);

	iframe.find("#location_" + comment_id).hover(function() {
		commentHover($(this).attr("id").split("location_")[1]);
		}, function() {
		commentUnHover($(this).attr("id").split("location_")[1]);
	});
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

function urlParam(param_name){
    var results = new RegExp('[\?&]' + param_name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
    	return 0;
    }
    else{
       return results[1] || 0;
    }
}

function showSavedComments() {
	saved_comments.forEach(function(comment) {
		if (comment.design_id == design_id) {
			if (comment.comment_id >= newest_comment_id) {
				newest_comment_id = comment.comment_id + 1;
			}
			var comments_section = $("#" + comment.rubric).find(".posted_comments");
			appendNewComment(comments_section, comment.comment_id, comment.comment_text)
			if (comment.location_style != "") {
				appendLocationComment(comment.rubric, comment.comment_id, comment.comment_text, comment.location_style);
			}
		}
	});	
}

function resetHelp() {
	current_help_page = 1;
	$("#done_help").hide();
    $("#next_help").show();
    $("#next_help").removeClass("disabled");
    $("#prev_help").show();
    for (var i = 0; i < num_help_pages; i++) {
    	$("#help_page_" + i).hide();
    }
    $("#help_page_1").show();
    $("#close_help").show();
}

function switchHelpImage(help_page_num, filename, orig_filename, action) {
	$("#help_page_" + help_page_num).find(".help_pic").attr("src", "help_pics/" + filename);

	if (action == "show") {
		$("#help_page_" + help_page_num).find(".show_help").hide();
		$("#help_page_" + help_page_num).find(".hide_help").show();
	} else {
		$("#help_page_" + help_page_num).find(".show_help").show();
		$("#help_page_" + help_page_num).find(".hide_help").hide();
	}
}

function preloadImages(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = "help_pics/" + this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

function loadDesign(d_id) {
	design_id = d_id;
	$("#design_frame").attr("src", "design/" + d_id + ".html");
	mode = "review";
}

$(function(){
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
		$("body").html("Please use a desktop or laptop computer. ");
		return;
	}

	socket = io();

	design_id = "A12345";

	// check for cookie
	if (Cookies.get('critiquekit-cookie') != undefined) {
		cookie_val = Cookies.get('critiquekit-cookie');
		socket.emit('set cookie', cookie_val);
		consent = true;
	} else {
		cookie_val = pid;
		Cookies.set('critiquekit-cookie', cookie_val, { expires: 52 });
		socket.emit('set cookie', cookie_val);
		consent = false;
	}

    $("#navbar_container").load("navbar.html"); 

    $("#welcome_modal").load("welcome.html", function() {
    	$("#name_span").html(name);
    	$("#view_submission").click(function() {
    		$("#design_frame").attr("src", "design/" + pid + ".html");
    		design_id = pid;
    		mode = "view";
    		$(".add_comment").hide();
    	});
    	$("#review_peers").click(function() {
    		$("#welcome_intro").hide();
    		$("#welcome_choose").show();
    		$("#peer_submissions").html("");
    		var peer_i = 1;
    		design_ids.forEach(function(d_id) {
    			if (d_id != pid) {
	    			$("#peer_submissions").append(
	    				"<button type='button' class='btn' data-dismiss='modal' onclick='loadDesign(\"" + d_id + "\")'>" +
	    					"Peer &#35; " + peer_i + "</button><br/>");
	    			peer_i++;
	    		}
    		});

    		$("#welcome_footer").hide();
    		$("#choose_footer").show();
    	});
    	$("#welcome_back").click(function() {
			$("#welcome_intro").show();
    		$("#welcome_choose").hide();
    		$("#welcome_footer").show();
    		$("#choose_footer").hide();
    	});
    });

    $("#help_modal").load("help.html", function() {
    	preloadImages(["feedback_autocomplete.png", "feedback_blanks.png", "feedback_box.png",
    					"feedback_checks.png", "feedback_insert.png", "feedback_location.png",
    					"menu.png", "sidebar.png"]);

		if (consent) {
	    	resetHelp();
	    }

    	$("#next_help").click(function() {
    		$("#help_page_" + current_help_page).hide();
    		current_help_page++;
    		$("#help_page_" + current_help_page).show();
    		if (current_help_page > 0) {
    			$("#prev_help").show();
    		}
    		if (current_help_page == num_help_pages-1) {
    			$("#next_help").hide();
    			$("#done_help").show();
    		}
    	});
    	$("#prev_help").click(function() {
    		$("#help_page_" + current_help_page).hide();
    		current_help_page--;
    		$("#help_page_" + current_help_page).show();
    		if (current_help_page == 0) {
    			$("#prev_help").hide();
    		}
    		$("#done_help").hide();
    		$("#next_help").show();
    	});

    	$("#consent_yes").change(function() {
    		if ($(this).is(':checked')) {
    			$("#next_help").removeClass("disabled");
    		} else {
    			$("#next_help").addClass("disabled");
    		}
    	});
    	$("#consent_no").change(function() {
    		if ($(this).is(':checked')) {
    			$("#next_help").addClass("disabled");
    		} else {
    			$("#next_help").removeClass("disabled");
    		}
    	});

    	$("#done_help").click(function() { // reset current page to first one after consent
    		resetHelp();
    		$("#welcome_modal").modal('show');
    	});
    });

    $("#done_modal").load("done.html", function() {
    	$("#confirm_done").click(function() {
    		// go back to initial modal
	    	socket.emit('done design', {design_id: design_id, cookie_val: cookie_val});
	    	// reload the page so welcome modal will appear again
	    	location.reload();
	    });
    });


    if (consent == false) {
	    $('#help_modal').modal('show'); 
    } else {
    	resetHelp();
    	$('#welcome_modal').modal('show');
    }

    $("#design_frame").load(function() {
    	socket.emit('loaded design', {design_id: design_id, cookie_val: cookie_val});
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

		socket.emit('get saved', design_id);
    });
    

    $(window).keydown(function(e) {
    	if (e.which == 27 && choosing_location == true) { // esc key while choosing location
    		cancelLocation();
    	}
    });

    // event handlers for modal dialogs
    $("#confirm_flag").click(function() {
    	socket.emit('flag comment', {rubric: flagging_comment_rubric, comment_id: flagging_comment_id, 
    		design_id: design_id, cookie_val: cookie_val});
    	$("#comment_" + flagging_comment_id).remove();
    	full_sorted_comments[flagging_comment_rubric].forEach(function(comment) {
    		if (comment["ID"] == flagging_comment_id) {
    			comment["flagged"] = true;
    		}
    	});
    	flagging_comment_rubric = "";
    	flagging_comment_id = "";
    });

    $("#confirm_delete").click(function() {
    	socket.emit('delete comment', {comment_id: deleting_comment_id, design_id: design_id, cookie_val: cookie_val});
    	$("#new_comment_" + deleting_comment_id).remove();
    	iframe.find("#location_" + deleting_comment_id).remove();
    	deleting_comment_id = "";
    });

    $("#correct_yes").click(function() {

    	var category_string = $("#" + correcting_rubric).find(".comment_text").attr("data-categorystring");
    	var index = correcting_category - 1;
    	if (correcting_category < 4) {
     		category_string = category_string.substring(0, index) + "1" + category_string.substring(index+1);
     	}
    	$("#" + correcting_rubric).find(".comment_text").attr("data-categorystring", category_string);

    	$("#" + correcting_rubric).find(".indicator_" + correcting_category)
    		.addClass("glyphicon-ok corrected")
    		.removeClass("glyphicon-remove");

    	socket.emit('user category added', {comment_text: $("#" + correcting_rubric).find(".comment_text.tt-input").val(),
    										category: correcting_category, design_id: design_id, 
    									cookie_val: cookie_val});

    	categoryUpdate(correcting_rubric);
    });

	$("#correct_no").click(function() {
    	var category_string = $("#" + correcting_rubric).find(".comment_text").attr("data-categorystring");
    	var index = correcting_category - 1;
    	if (correcting_category < 4) {
    		category_string = category_string.substring(0, index) + "0" + category_string.substring(index+1);
    	}
    	$("#" + correcting_rubric).find(".comment_text").attr("data-categorystring", category_string);

    	$("#" + correcting_rubric).find(".indicator_" + correcting_category)
    		.removeClass("glyphicon-ok")
    		.addClass("glyphicon-remove corrected");

    	socket.emit('user category removed', {comment_text: $("#" + correcting_rubric).find(".comment_text.tt-input").val(),
    										category: correcting_category, design_id: design_id, cookie_val: cookie_val});

    	categoryUpdate(correcting_rubric);
    });

    $(window).on("autocompleted", function() { 
    	var comment_text = $("#" + current_rubric).find(".comment_text").val();
    	full_sorted_comments[current_rubric].forEach(function(check_comment) {
    		if (check_comment["comment"].replace(/<input.*?>/g, "_____").toLowerCase() == comment_text.toLowerCase()) {
    			latest_comment_inserted = check_comment["ID"];
    			socket.emit('autocompleted suggestion', {rubric: current_rubric, comment_id: latest_comment_inserted, 
    				design_id: design_id, cookie_val: cookie_val});
    			updateComment();
    		}
    	});
    });

    // load comment box for each rubric category
    rubric_categories.forEach(function(rubric_cat, i) {
    	rubric_cat_orig = rubric_cat;
    	if (rubric_cat == "VisualDesign") rubric_cat_orig = "Visual Design";
    	if (rubric_cat == "ContentFunctionality") rubric_cat_orig = "Content / Functionality";
    	if (rubric_cat == "AdditionalFeedback") rubric_cat_orig = "Additional Feedback";
    	$("#rubrics_container").append("<h4>" + rubric_cat_orig + "</h4><div id='" + rubric_cat + "' class='rubric_cat'></div>");
    	$("#" + rubric_cat).load("commenting.html", function() {
    		if (mode == "view") {
    			$(".add_comment").hide();
    		}

    		if (i == rubric_categories.length - 1) {
    			// last one added, so set all the event handlers
    			$(".add_comment").click(function() {
	    			$(this).hide();
			    	$(this).parents(".rubric_cat").find(".comment_interface").show();
			    	socket.emit("clicked add comment", {rubric: $(this).parents(".rubric_cat").attr("id"), cookie_val: cookie_val});
			    });
			    $(".cancel_comment").click(function() {
			    	$(this).parents(".suggestion_box").find(".comment_text.tt-input").val("");
			    	//searchComments("", $(this).parents(".suggestion_box")); // clear search
			    	updateComment();
			    	$(this).parents(".comment_interface").hide();
			    	if (mode != "view") $(this).parents(".rubric_cat").find(".add_comment").show();
			    	// delete location if one was made
			    	iframe.find("#location_" + newest_comment_id).remove();
			    	socket.emit('cancel comment', {rubric: $(this).parents(".rubric_cat").attr("id"), cookie_val: cookie_val});
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
			    $(".remove_location").click(function() {
			    	iframe.find("#location_" + newest_comment_id).remove();
			    	var dom_container = $(this).parents(".rubric_cat");
			    	dom_container.find(".add_location").show();
					dom_container.find(".remove_location").hide();
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
			    	} else if ($(this).hasClass("indicator_4")) {
			    		correcting_category = 4;
			    	}
			    	correcting_rubric = $(this).parents(".rubric_cat").attr("id");
			    	var category_text = "";
			    	if (correcting_category == 1) {
			    		category_text = "positive statement";
			    	} else if (correcting_category == 2) {
			    		category_text = "problem statement";
			    	} else if (correcting_category == 3) {
			    		category_text = "suggested solution";
			    	} else if (correcting_category == 4) {
			    		category_text = "specific statement";
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
						deleting = (e.which == 46 || e.which == 8); // true for delete or backspace

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

    		socket.emit('get comments', {rubric: rubric_cat, cookie_val: cookie_val});
    	});
    });

    // comments received, so display them
    socket.on('comments', function(data) {
    	var rubric = data.rubric;
    	full_sorted_comments[rubric] = data.comments;
    	displayComments(data.rubric, data.comments);

		// search functionality
		$(".comment_text").on("input", function() {
			//searchComments($(this).val(), $(this).parent());
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
	    	if (i == 1) {
	    		if (icon.hasClass("glyphicon-ok")) {
		    		// 1 is true so check for 4
		    		if ($("#" + rubric).find(".comment_text.tt-input").val().split(" ").length >= 4) {
		    			// probably specific enough
		    			checkIcon($("#" + rubric).find(".indicator_4"));
		    		} else {
		    			if (!$("#" + rubric).find(".indicator_4").hasClass("corrected") || deleting == true) {
		    				uncheckIcon($("#" + rubric).find(".indicator_4"));
		    			}
		    		}
		    	} else {
		    		if (!$("#" + rubric).find(".indicator_4").hasClass("corrected") || deleting == true) {
		    			uncheckIcon($("#" + rubric).find(".indicator_4"));
		    		}
		    	}
	    	}
    	}
    });

    // got back comments saved from before
    socket.on('saved comments', function(data) {
    	console.log("got saved comments");
    	console.log(data.comments);
    	if (data.comments != undefined) {
    		saved_comments = data.comments;
    		showSavedComments();
    	}
    });
});