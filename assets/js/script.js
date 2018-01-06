var config = {
    apiKey: "AIzaSyDDGxyuPuALf2awTKBKqvF5yJGn7yBj2YE",
    authDomain: "movieswatchlist-b2318.firebaseapp.com",
    databaseURL: "https://movieswatchlist-b2318.firebaseio.com",
    projectId: "movieswatchlist-b2318",
    storageBucket: "",
    messagingSenderId: "575390323178"
  };
  firebase.initializeApp(config);
function searchMovie(movie){
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
        console.log(response);
        var movieTitle = response.Title;
        var moviePoster = response.Poster;
        var runtime = response.Runtime;
        var ratingImbd = response.Ratings[0].Value;
        var ratingRoten = response.Ratings[1].Value;
        var sinopsis = response.Plot;
        var actors = response.Actors;
        var director = response.Director;
        var year = response.Year;
        //console.log(sinopsis);
        var database = firebase.database();
        function saveToDb() {
            var saveData = {
                movieTitle: movieTitle,
                moviePoster: moviePoster,
                runtime: runtime,
                ratingImbd: ratingImbd,
                ratingRoten: ratingRoten,
                sinopsis: sinopsis,
                actors: actors,
                director: director,
                year: year
            };
            

            database.ref("/movies").push(saveData);
            console.log("This is the data saved to the DB " + saveData);
        }
        saveToDb();
        
    });

}
$("#selectMovie").on("click", function(event) {
    // Preventing the button from trying to submit the form
   
    event.preventDefault();
   
    var movie = $("#movieInput").val().trim();
    searchMovie(movie);

    //Clear text from the input form
     $("#movieInput").val("");
  });

firebase.database().ref("/movies").on("child_added", function(snapshot){

    $("tbody").append("<tr>" +  "<td>" + 
                                    `<img src='${snapshot.val().moviePoster}'>` + 
                                "</td>" +
                                
                                "<td>" + 
                                    "<h3>" + snapshot.val().movieTitle + "</h3>" + "<br>" +
                                    "<h5>" + "<b>Year: </b>" + snapshot.val().year + "</h5>" +
                                    "<h5>" + "<b>Runtime: </b>" + snapshot.val().runtime + "</h5>" +
                                    "<h5>" + "<b>IMDB: </b>" + snapshot.val().ratingImbd + "</h5>" +
                                    "<h5>" + "<b>Rotten Tomatoes: </b>" + snapshot.val().ratingRoten + "</h5>" +
                                    

                                "</td>" +
                                

                                "<td>" + 
                                    "<p>" + "<b>Directed by: </b>" + snapshot.val().director + "</p>" +
                                    "<p>" + "<b>Cast: </b>" + snapshot.val().actors + "</p>" +
                                    "<p>" + "<b>Sinopsis: </b>" + snapshot.val().sinopsis + "</p>" + 
                                "</td>" + "</tr>" + "<br>");
   

});