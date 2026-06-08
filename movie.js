const searchBtn = document.querySelector("button");
const searchInput = document.querySelector("input");
const movieContainer = document.getElementById("movie-container");

const API_KEY = "3ebc6c9031864025f8286e93c789b55d";

async function searchMovie() {

    const movieName = searchInput.value.trim();

    if(movieName === ""){
        alert("Please enter movie name");
        return;
    }

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`
        );

        const data = await response.json();

        console.log(data);

        movieContainer.innerHTML = "";

        if(data.results.length === 0){
            movieContainer.innerHTML = "<h2>No Movies Found</h2>";
            return;
        }

        data.results.forEach(movie => {

            const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450";

            const movieCard = document.createElement("div");

            movieCard.classList.add("movie-card");

            movieCard.innerHTML = `
                <img src="${posterPath}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>${movie.release_date}</p>
                <p>⭐ ${movie.vote_average}</p>
            `;

            movieContainer.appendChild(movieCard);

        });

    } catch(error) {

        console.log(error);

        movieContainer.innerHTML = "<h2>Something went wrong</h2>";
    }
}

// Button click
searchBtn.addEventListener("click", searchMovie);

// Enter key
searchInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        searchMovie();
    }

});

