var topics = ["mario", "donkey kong", "link", "samus", "yoshi", "kirby", "fox", "pikachu", "luigi"];
$(document).ready(function () {

    //m5yQIDCRuAIrUCrGRJcCYGp2STyLBjPq
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
                    var imageUrl = response.data[i].images.original.url;
                    var rating = response.data[i].rating;


                    // Creating and storing an image tag
                    var characterImage = $("<img>");
                    var ratingContainer = $("<p>");
                    var characterBox = $("<div>");


                    // Setting the catImage src attribute to imageUrl
                    characterImage.attr("src", imageUrl);
                    characterImage.attr("alt", "character image");
                    ratingContainer.text("Rating: " + rating);

                    // Prepending the catImage to the images div
                    characterBox.append(characterImage);
                    characterBox.append(ratingContainer);

                    $("#images").prepend(characterBox);
                    // });

                };

            });
    });
});