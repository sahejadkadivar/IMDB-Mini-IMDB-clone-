// welcome handling - to show welcome not for 6sec
/** document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.getElementById("welcome-container").style.visibility = "hidden";
        document.getElementById("main-content").style.display = "block";
    }, 6000); // after this time in the welcome section will be disappeared
}); */

// Above function was loading welcome text every time when we visit index but below function will not be loaded when returning from favourites or movie details
document.addEventListener("DOMContentLoaded", function () {
    var welcomeContainer = document.getElementById("welcome-container");
    var mainContent = document.getElementById("main-content");

    var alreadyHidden = sessionStorage.getItem("welcomeHidden");

    if (!alreadyHidden) {
        setTimeout(function () {
            welcomeContainer.style.visibility = "hidden";
            mainContent.style.display = "block";
            sessionStorage.setItem("welcomeHidden", "true");
        }, 6000); // after this time in the welcome section will be disappeared
    } else {
        welcomeContainer.style.display = "none"; // hide on page load if already hidden
        mainContent.style.display = "block";
    }
});
//omdb api url
const baseUrl = "https://www.omdbapi.com/?";

//api -key
const apiKey = "f873996f";
// format to search movie using search e.g. avengers
// http://www.omdbapi.com/?s="avengers"&apikey=f873996f

//fetching elements to show searched movies
let searchInput = document.getElementById('search-input');
let movieGrid = document.getElementById('movie-grid');


//add event listner at searchInput
searchInput.addEventListener("input", fetchMoviesDisplay);

function fetchMoviesDisplay() {
    let inputTerm = searchInput.value.trim();
    if (inputTerm != "") {
        // aysnc function to fetech the movie from OMDB
        fetchMovies(inputTerm);
    }
}



async function fetchMovies(inputTerm) {
    console.log(inputTerm);
    //Uses the fetch function to make an asynchronous HTTP request to the OMDB API.
    const response = await fetch(`${baseUrl}s=${inputTerm}&apikey=${apiKey}`);
    //Parses the response from the API as JSON. The await keyword is used to wait for the completion of the JSON parsing operation, and the result is stored in the search variable.
    const responeJSON = await response.json();
    displayMovies(responeJSON.Search);
    // console.log(responeJSON);
    // console.log(responeJSON.Search);
}

// below function is to limit letter in movie title to insure same design in every card
function limitTextToLetters(text, letterLimit) {
    if (text.length > letterLimit) {
        return `${text.substring(0, letterLimit)}...`;
    } else {
        return text;
    }
};


async function displayMovies(movies) {

    if (movies) {
        // placing the movieCard inside movieGrid div by interploation string
        //also I have added onclick on button Add to favourites for adding to favourites
        movieGrid.innerHTML = movies.map(movie => {
            return `
            <div>
            <div class="movie-card">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}" title="Movie poster">
                <h4 title="Movie Title">${limitTextToLetters(movie.Title, 16)}</h4>
                <button class="btn btn-success btn-sm remove-button" title="Click button to add movie in favourite movie list" onclick="addToFavorites('${movie.imdbID}')">Add Favourites</button>
                <a href="movie_detail.html?id=${movie.imdbID}" class="btn btn-secondary btn-sm more-button" title="Click button to know more about movie">know More</a>
            </div>
            </div>
        `;

        }).join("");
    }
    else {
        movieGrid.innerHTML = "<h2 class='text-danger'>Movie does not exist with given Keyword</h2>";
    }
};


// Function to add movie in favourite list
async function addToFavorites(id) {

    //get movie details by id
    const movie = await getMovieDetails(id);
    // console.log(movie);
    if (movie) {
        //fetching out  date with favourites key from localstorage
        const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];
        //if movie is not present then add to favourites otherwise display alert that movies is already exists in favourites
        if (!favouritesList.some(m => m.imdbID == movie.imdbID)) {
            favouritesList.push(movie);
            localStorage.setItem('favourites', JSON.stringify(favouritesList));
            alert(`${movie.Title} is added successfully to your favourites`);
        }
        else {
            alert(`${movie.Title} is already in your favourites`);
        }
    }

}

//method to fetch movies using id.
async function getMovieDetails(imdbID) {
    const response = await fetch(`${baseUrl}apikey=${apiKey}&i=${imdbID}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}






