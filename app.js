$(document).ready(function () {

    //array of food
    var topics = ["Burger", "Sushi", "Pizza", "Sandwich", "Candy", "Dessert", "Chicken", "Steak", "Burrito", "Pasta"];
    console.log(topics);

    //for showButtons
    function showButtons() {
        $("#topics-display").empty();

        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>").text(topics[i]).attr("data-topic", topics[i]).addClass("topic-button");
            $("#topics-display").append(newButton);
            console.log("ha")
        }
    }


        // for showGifs
        function showGifs() {
            $("#gifs-display").empty();

            var topic = $(this).attr("data-topic");

            //for Giphy Query
            var queryURL = "http://api.giphy.com/v1/gifs/search?q="
                + topic + "&rating=pg&api_key=6CjfUAofGjvsi1tn9tiW0Cw4hixSKLFC&limit=10";
                

            // AJAX GET request
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .done(function(response) {
                    

                    var results = response.data;

                    // Grab the gifs

                    for (var i = 0; i < results.length; i++) {

                        var topicDiv = $("<div>").addClass("gif-div");

                        var rating = results[i].rating;

                        var still = results[i].images.fixed_height_still.url;

                        var animate = results[i].images.fixed_height.url;

                        var p = $("<p>").text("Rating: " + rating);

                        var topicImage = $("<img>").addClass("gif").attr({"src": still, "data-still": still, "data-animate": animate, "data-state": "still"});

                        topicDiv.append(topicImage);
                        topicDiv.append(p);

                        $("#gifs-display").prepend(topicDiv);
                        console.log(topicDiv);

                    }
                });
            }
        
            function changeAnimate() {
                var state = $(this).attr("data-state");
            
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              }
            
              //for "On clicks"
              $(document).on("click", ".topic-button", showGifs);
            
              $(document).on("click", ".gif", changeAnimate);
            
              $("#add-topic").on("click", function(event) {
                event.preventDefault();

                var topic= $("#topic-input").val().trim();
                $("#topic-input").val("");
                topics.push(topic);
                showButtons();
              

            
            }); 
              

    showButtons();
    
});