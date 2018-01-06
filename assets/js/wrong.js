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
        console.log(sinopsis);
        var database = firebase.database();
        function saveToDb(movieTitle, runtime) {
            var saveData = {
                movieTitle: movieTitle,
                moviePoster: moviePoster,
                runtime: runtime,
                ratingImbd: ratingImbd,
                ratingRoten: ratingRoten,
                sinopsis: sinopsis
            };
        }
        
    });
}
$("#selectMovie").on("click", function(saveToDb) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
   
    var movie = $("#movieInput").val().trim();
    searchMovie(movie);
  });