document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterButton = document.getElementById('filter-button');
    const movieContainer = document.querySelector('.movie-container');
    const showContainer = document.querySelector('.shows-container');
    const musicContainer = document.querySelector('.music-container');

    let movies = [];
    let shows = [];
    let musics = [];

    async function loadMovies(){
        try{
            const response = await fetch('movies.json');
            const data = await response.json();
            movies = data;
            displayMovies(movies);
        }
        catch(err){
            console.error("Error loading movies: ", err);
        }
    }

    async function loadShows(){
        try{
            const response = await fetch('shows.json');
            const data = await response.json();
            shows = data;
            displayShows(shows);
        }
        catch(err){
            console.error("Error loading shows: ", err);
        }
    }

    async function loadMusic(){
        try{
            const response = await fetch('music.json');
            const data = await response.json();
            musics = data;
            displayMusic(musics);
        }
        catch(err){
            console.error("Error loading music: ", err);
        }
    }

    function displayMovies(movieList){
        movieContainer.innerHTML = ''; //clears previous search results
        if (movieList.length == 0){
            movieContainer.textContent = 'No movies found.';
            return;
        }
        movieList.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';

            const img = document.createElement('img');
            img.src = movie.poster;
            img.alt = movie.title + " poster";

            const title = document.createElement('h3'); //h3 due to semantic meaning
            title.className = 'movie-title';
            title.textContent = movie.title; //inserts movie title into h3

            const details = document.createElement('div');
            details.className = 'movie-details';
            details.style.display = 'none'; // hide initially
            details.innerHTML = 
                '<span>Director: </span>'+ movie.director + '<br>' +
                '<span>Year: </span>' + movie['release year'] + '<br>' +
                '<span>Duration: </span>' + movie.duration + 'min<br>' +
                '<span>Rating: </span>' + movie.rating + '<br>' +
                '<span>Cast: </span>' + movie.cast.join(', ')
            ;

            card.addEventListener('click', function(){
                if (details.style.display == 'none'){ //if details are currently hidden, display them
                    details.style.display = 'block';
                }
                else{ //if not hidden, hide them
                    details.style.display = 'none';
                }
            })
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(details);
            movieContainer.appendChild(card);

        });
    }

    function displayShows(showsList){
        showContainer.innerHTML = ''; //clears previous search results
        if (showsList.length == 0){
            showContainer.textContent = 'No shows found.';
            return;
        }
        showsList.forEach(show => {
            const card = document.createElement('div');
            card.className = 'shows-card';

            const img = document.createElement('img');
            img.src = show.poster;
            img.alt = show.title + " poster";

            const title = document.createElement('h3'); //h3 due to semantic meaning
            title.className = 'shows-title';
            title.textContent = show.title; //inserts movie title into h3

            const details = document.createElement('div');
            details.className = 'shows-details';
            details.style.display = 'none'; // hide initially
            details.innerHTML = 
                '<span>Director: </span>'+ show.director + '<br>' +
                '<span>Year: </span>' + show['release year'] + '<br>' +
                '<span>Number of Episodes: </span>' + show['number of episodes'] + 'min<br>' +
                '<span>Rating: </span>' + show.rating + '<br>' +
                '<span>Cast: </span>' + show.cast.join(', ')
            ;

            card.addEventListener('click', function(){
                if (details.style.display == 'none'){ //if details are currently hidden, display them
                    details.style.display = 'block';
                }
                else{ //if not hidden, hide them
                    details.style.display = 'none';
                }
            })
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(details);
            showContainer.appendChild(card);
            
        });
    }

    function displayMusic(musicList){
        musicContainer.innerHTML = ''; //clears previous search results
        if (musicList.length == 0){
            musicContainer.textContent = 'No music found.';
            return;
        }
        musicList.forEach(music => {
            const card = document.createElement('div');
            card.className = 'music-card';

            const img = document.createElement('img');
            img.src = music.cover;
            img.alt = music.title + " cover";

            const title = document.createElement('h3'); //h3 due to semantic meaning
            title.className = 'music-title';
            title.textContent = music.title; //inserts movie title into h3

            const details = document.createElement('div');
            details.className = 'music-details';
            details.style.display = 'none'; // hide initially
            details.innerHTML = 
                '<span>Artist: </span>'+ music.artist + '<br>' +
                '<span>Year: </span>' + music['release year'] + '<br>' +
                '<span>Duration: </span>' + music.duration + 'min<br>' 
            ;

            card.addEventListener('click', function(){
                if (details.style.display == 'none'){ //if details are currently hidden, display them
                    details.style.display = 'block';
                }
                else{ //if not hidden, hide them
                    details.style.display = 'none';
                }
            })
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(details);
            musicContainer.appendChild(card);
            
        });
    }

    searchButton.addEventListener('click', function() {
        const searchQuery = searchInput.value.trim();

        if (searchQuery === ''){
            return;
        }
    })
    loadMovies();
    loadShows();
    loadMusic();

});