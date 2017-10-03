/* --- --- GLOBAL VARIABLES --- ---*/

topics = ['horse', 'pony', 'giraffe', 'parrot', 'puffin']


/* --- --- GLOBAL LOGIC --- ---*/


//create a button for each element of topics array
function drawButtons(){
	$('#button-bar').html('');
	for( var i = 0; i < topics.length; i++){
		var newButton = $('<button>');
		newButton.text(topics[i]);
		newButton.addClass('btn gif-button btn-default navbar-btn');
		$('#button-bar').append(newButton);
	}
}

/* --- --- MAIN LOGIC --- ---*/

drawButtons();


//when topic button clicked...
$(document).on("click", ".gif-button", function(){
	//log contents of button
	console.log($(this).text());

	//create URL for query
	var searchTerm = $(this).text();
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({ url: queryURL, method: "GET" }).done(function(response) {

		console.log(response);

		// for each member of the returned data array...
		for( var i = 0; i < response.data.length; i++ ){

			//create a div

			var currentImageDiv = $('<div>');

			//put the still image in the div

			var currentImageImg = $('<img>');

			currentImageImg.attr('src', response.data[i].images.fixed_height_still.url);

			currentImageDiv.append(currentImageImg);

			//attached classes to div for animated URL, still URL, state, and onclick class

			currentImageDiv.attr('data-state', 'still');
			currentImageDiv.attr('data-still', response.data[i].images.fixed_height_still.url);
			currentImageDiv.attr('data-animated', response.data[i].images.fixed_height.url);
			currentImageDiv.addClass('gif-div');

			//add rating below image

			var currentRating = $('<h3>')
			currentRating.text('Rating: ' +response.data[i].rating.toUpperCase());
			currentImageDiv.append(currentRating);

			// append to document

			$('#main-panel').prepend(currentImageDiv);

			console.log(response.data[i].embed_url);	
		
		}

	});


	//submit AJAX request

	//append results to page

});


//when add button clicked...
$(document).on('click', '#add-button', function(){
	//prevent page reload
	event.preventDefault();

	//set contents of text box to currentInput
	var currentInput = $('#add-box').val();

	//if input already in topics array, alert
	if (topics.indexOf(currentInput) !== -1){

		alert ('Already in topics!');
		$('#add-box').val('');

	//if input not blank, add to topics array and redraw
	} else if (currentInput !== '' ){

			$('#add-box').val('');

			topics.push(currentInput);
			drawButtons();
		
	}

});


$(document).on('click', '.gif-div', function(){
	//if state "still"
	if ($(this).attr('data-state') === 'still'){

		//change to animate
		$(this).attr('data-state', 'animated');

		//replace img with animate image
		$(this).children().attr('src', $(this).attr('data-animated'))
	}
	//if state animate
	else if ($(this).attr('data-state') === 'animated'){

		//change to still
		$(this).attr('data-state', 'still');

		//replace img with still image
		$(this).children().attr('src', $(this).attr('data-still'))
	}
});


/* --- --- Notes to self ---

* Check giphy key


--- */