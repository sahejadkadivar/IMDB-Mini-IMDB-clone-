
let favGrid = document.getElementById('fav-grid');

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.innerHTML = `
    <div class="fav-card">
        <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}" title="Movie poster">
        <div >
            <h4 title="Movie Title">${movie.Title}</h4>
            <button class="btn btn-danger btn-sm remove-button" title="Click button to remove movie from favourite" onclick="removeFav('${movie.imdbID}')">Remove from Favourites</button>
            <a href="movie_detail.html?id=${movie.imdbID}" class="btn btn-secondary btn-sm more-button" title="Click button to know more about movie">know More</a>
        </div>
        </div>
    `;

    return movieCard;
}


function removeFav(imdbID) {
    //Retrive favourites from localstorage
    const favouritesList = JSON.parse(localStorage.getItem('favourites'));

    //find index of the movie with the give imdbID

    const indexToRemove = favouritesList.findIndex(movie => movie.imdbID == imdbID);
    if (indexToRemove != -1) {
        //remove the movie from favouritesList
        // Store the removed movie's title in a variable
        const removedMovieTitle = favouritesList[indexToRemove].Title;

        favouritesList.splice(indexToRemove, 1);
        localStorage.setItem('favourites', JSON.stringify(favouritesList));
        alert(`${removedMovieTitle} is successfully removed  from your favourites`);
    }
    displayFav();
}

function displayFav() {
    // I am parsed the string to get data in array
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];
    //Clear the previous content of favGrid and it is necessary other wise our removeFav function will not work.
    favGrid.innerHTML = '';

    // console.log(favouritesList);
    /// if favouritesList length is 0 then there is no element in favouritesList
    if (favouritesList.length == 0) {
        const emptyMessage = document.createElement('h2');
        emptyMessage.classList.add('text-danger');
        emptyMessage.textContent = 'Your favourite movies list is empty';
        favGrid.appendChild(emptyMessage);
    }
    else {
        // we have to  display all the movies
        favouritesList.forEach(movie => {
            const movieCard = createMovieCard(movie);
            //console.log(movieCard);
            favGrid.appendChild(movieCard);
        })
    }

}