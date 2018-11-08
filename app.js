
$(document).ready(function () {

    var topics = ["mario", "donkey kong", "link", "samus", "yoshi", "kirby", "fox", "pikachu", "luigi"];

    function makebutton() {
        for (i = 0; i < topics.length; i++) {
            var characters = $("<button>");
            characters.addClass("initialcharacters");
            characters.text(topics[i]);
            $("#wordbuttons").append(characters);
            console.log(topics[i]);
        };

    }
    makebutton();

    $(".initialcharacters").on("click", function () {
        console.log($(this).text());
        var search = ($(this).text());
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=m5yQIDCRuAIrUCrGRJcCYGp2STyLBjPq&q=" + search + "&limit=10&offset=0rating=G &lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After the data from the AJAX request comes back
            .then(function (response) {
                console.log(response);
                // Saving the image_original_url property
                for (i = 0; i < response.data.length; i++) {
                    var imageUrl = response.data[i].images.fixed_height_still.url;
                    var imageGif = response.data[i].images.original.url;
                    var rating = response.data[i].rating;


                    // Creating and storing an image tag
                    var characterImage = $("<img>");
                    var ratingContainer = $("<p>");



                    // Setting the catImage src attribute to imageUrl
                    characterImage.attr("src", imageUrl);
                    characterImage.attr("data-still", imageUrl);
                    characterImage.attr("data-animate", imageGif);
                    characterImage.attr("data-state", "still")
                    // characterImage.attr("alt", "character image");
                    characterImage.addClass("gif");
                    ratingContainer.text("Rating: " + rating);

                    // Prepending the catImage to the images div
                    $("#images").prepend(characterImage);
                    $("#images").prepend(ratingContainer);

                    // $("#images").prepend(characterImage);
                    // });

                };

            });
    });
    $("#submit").on("click", function () {
        var input = $("#inputBox").val().trim();
        topics.push(input);
        console.log(input);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=m5yQIDCRuAIrUCrGRJcCYGp2STyLBjPq&q=" + input + "&limit=10&offset=0rating=G &lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);


                var characters = $("<button>");
                characters.text(input);
                $("#wordbuttons").append(characters);

                // Saving the image_original_url property
                for (i = 0; i < response.data.length; i++) {
                    var imageUrl = response.data[i].images.fixed_height_still.url;
                    var imageGif = response.data[i].images.original.url;
                    var rating = response.data[i].rating;


                    // Creating and storing an image tag
                    var characterImage = $("<img>");
                    var ratingContainer = $("<p>");



                    // Setting the catImage src attribute to imageUrl
                    characterImage.attr("src", imageUrl);
                    characterImage.attr("data-still", imageUrl);
                    characterImage.attr("data-animate", imageGif);
                    characterImage.attr("data-state", "still")
                    // characterImage.attr("alt", "character image");
                    characterImage.addClass("gif");
                    ratingContainer.text("Rating: " + rating);

                    // Prepending the catImage to the images div
                    $("#images").prepend(characterImage);
                    $("#images").prepend(ratingContainer);

                    // $("#images").prepend(characterBox);
                };


            })





    });
    $(document).on("click", ".gif", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        console.log("hello world");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


});
