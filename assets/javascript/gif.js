$( document ).ready(function() {

var characters = ["Jon Snow", "Khaleesi", "Ned Stark", "Arya Stark", "Jamie Lannister"];

function displayGif() {

	var gif = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=84dcd3b355e447dcbd9edc575ee14e49&limit=10";

	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

    	console.log(response);

    	var results = response.data;

    	for (var x = 0; x < results.length; x++) {

    		var charDiv = $("<div>");

    		var rating = results[x].rating;

    		var p = $("<p>").text("Rating: " + rating);

    		var charImg = $("<img>");

    		var animated = results[x].images.fixed_height.url;

    		var still = results[x].images.fixed_height_still.url

    		charImg.attr("src", still);

    		charImg.attr("data-state", "still"); // may need to be deleted

    		charDiv.prepend(p);

    		charDiv.append(charImg);

    		$("#gif-div").prepend(charDiv);

    		$("img").on("click", function() {

				console.log(charImg.attr("src"));	

				console.log(charImg.attr("data-state"));

				var state = $(this).attr("data-state");

				if (state === "still") {
			        charImg.attr("src", animated);
			      } else {
			        $(this).attr("src", $(this).attr("data-still"));
			        $(this).attr("data-state", "still");
			      }

			    });

    	};
    });
};

function renderButtons() {

	$("#buttons-view").empty();

	for (var x = 0; x < characters.length; x++) {

		var newBtn = $("<button>");

		newBtn.addClass("character");

		newBtn.attr("data-name", characters[x]);

		newBtn.text(characters[x]);

		$("#buttons-view").append(newBtn);

	};

};

$("#add-gif").on("click", function(event) {

	event.preventDefault();

	var character = $("#gif-input").val().trim();

	characters.push(character);

	renderButtons();

});

renderButtons();

$(document).on("click", ".character", displayGif);

});