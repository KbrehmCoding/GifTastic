var cartoons = ["My Little Pony", "Kim Possible", "Star vs. The Forces Of Evil", "Catdog"];
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10";

function renderButtons() {
    $("#buttonsContainer").empty();
    for (var i = 0; i < cartoons.length; i++) {
        var button = $("<button>");
        button.addClass("cartoon");
        button.attr("data-name", cartoons[i]);
        button.text(cartoons[i]);
        $("#buttonsContainer").append(button);
    }
}

$("#addCartoon").on("click", function(event) {
    event.preventDefault();
    var cartoon = $("#cartoonInput").val().trim();
    cartoons.push(cartoon);
    renderButtons();
});

$("#buttonsContainer").on("click", ".cartoon", function(event) {
    $.ajax({
        url: `${queryURL}&q=${$(this).attr("data-name")}`,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            var imageUrl = response.data[i].images.original.url;
            var cartoonImage = $("<img>");
            cartoonImage.attr("src", imageUrl);
            cartoonImage.attr("alt", "cartoon image");
            $("#imagesContainer").prepend(cartoonImage);
        }
    });
    // still not sure where to put this to make it work
    // .then(function(response) {
    //     var results = response.data;
    //     for (var i = 0; i < results.length; i++) {
    //         if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
    //             var gifDiv = $("<div>");
    //             var rating = results[i].rating;
    //             var p = $("<p>").text("Rating: " + rating);
    //             var cartoons = $("<img>");
    //             cartoons.attr("src", results[i].images.fixed_height.url);
    //             gifDiv.append(p);
    //             gifDiv.append(cartoons);
    //         $("#imagesContainer").prepend(gifDiv);
    //         }
    //     }
    //     });
});

renderButtons();
