const baseUrl = 'https://www.omdbapi.com/?';
const apiKey = 'f873996f';

function movie() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const movieId = urlParams.get('id');

    if (movieId) {
        // Fetch details for the specific movie using the movieId
        fetchMovieDetails(movieId);
    } else {
        console.error('Movie ID not provided in the URL.');
    }
}

async function fetchMovieDetails(id) {


    // Fetch details for the specific movie using the movieId
    const response = await fetch(`${baseUrl}i=${id}&apikey=${apiKey}`);
    const movieDetails = await response.json();
    //display movieDetails
    displayMovieDetails(movieDetails);

}

function displayMovieDetails(movieDetails) {
    // I am placing movie inside mov-main
    const movieDetailsContainer = document.getElementById('mov-main');

    if (movieDetails.Response && movieDetails.Response === 'True') {
        // Update the content of the movie details container with the fetched details
        movieDetailsContainer.innerHTML = `
            
            <div id ="movie-container">
           
                <img src="${movieDetails.Poster}" alt="${movieDetails.Title}" title="Movie poster">
            
            
                <div id="movie-details">
                    <div id="movie-head">
                        <h2 title="Movie Title (released year)">${movieDetails.Title} (${movieDetails.Year})</h2>
                    </div> 
                    <span class="genre" title="Movie genre"> ${movieDetails.Genre}</span>
                    <p>IMDb RATING⭐ ${movieDetails.imdbRating}/10</p>
                    <p class="mov-details"><strong>Creators:</strong> ${movieDetails.Director}</p>
                    <p class="mov-details"><strong>Stars:</strong> ${movieDetails.Actors}</p>
                    <p class="mov-details" title="About story"> ${movieDetails.Plot}</p>
                </div>
            </div>
            `;
    } else {
        movieDetailsContainer.innerHTML = 'Movie details not found.';
    }
}
