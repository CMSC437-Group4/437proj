document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    const bookmarked = document.getElementById('bookmarkedBtn');

    const movieBtn = document.getElementById('movieBtn');
    const tvBtn = document.getElementById('tvBtn');
    const musicBtn = document.getElementById('musicBtn');
    
    const movieContainer = document.querySelector('.movie-container');
    const showContainer = document.querySelector('.shows-container');
    const musicContainer = document.querySelector('.music-container');

    const popularRow = document.querySelector('.popular-row');
    const continueRow = document.querySelector('.continue-row');
    const recommendedRow = document.querySelector('.recommended-row'); 

    const isGuest = localStorage.getItem('isGuest') === 'true';
    if (isGuest) { // won't display bookmarked tab option if the user is a guest
        bookmarked.style.display = 'none';
    }

    let movies = [];
    let shows = [];
    let musics = [];

    async function loadMovies(){
        try{
            const response = await fetch('movies.json');
            const data = await response.json();
            movies = data;
    
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
        
        }
        catch(err){
            console.error("Error loading music: ", err);
        }
    }

    function displayMovies(movieList){ //movie page
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

            if (!isGuest) {
                const bookmarkBtn = document.createElement('button');
                bookmarkBtn.textContent = 'Bookmark';
                bookmarkBtn.className = 'bookmark-btn'; 

                bookmarkBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); // prevent card toggle
                    addBookmark(movie, 'movie');
                });

                card.appendChild(bookmarkBtn);}

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(details);
            movieContainer.appendChild(card);

        });
    }

    function displayMoviesToRow(movieList, rowElement) {  //homepage functionality
        movieList.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';

            const img = document.createElement('img');
            img.src = movie.poster;
            img.alt = movie.title + " poster";

            const title = document.createElement('h3');
            title.className = 'movie-title';
            title.textContent = movie.title;

            if (!isGuest) {
                const bookmarkBtn = document.createElement('button');
                bookmarkBtn.textContent = 'Bookmark';
                bookmarkBtn.className = 'bookmark-btn';  

                bookmarkBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); // prevent card toggle
                    addBookmark(movie, 'movie');
                });
                card.appendChild(bookmarkBtn)}

            card.appendChild(img);
            card.appendChild(title);
            rowElement.appendChild(card);
        });
    }   
    

    function displayShows(showsList){ //show page
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

            if (!isGuest) {
                const bookmarkBtn = document.createElement('button');
                bookmarkBtn.textContent = 'Bookmark';
                bookmarkBtn.className = 'bookmark-btn';

                bookmarkBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); 
                    addBookmark(show, 'show');
                });
                card.appendChild(bookmarkBtn);}

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(details);
            showContainer.appendChild(card);
            
        });
    }

    function displayShowsToRow(showList, rowElement) { //homepage functionality
        showList.forEach(show => {
            const card = document.createElement('div');
            card.className = 'shows-card';

            const img = document.createElement('img');
            img.src = show.poster;
            img.alt = show.title + " poster";

            const title = document.createElement('h3');
            title.className = 'shows-title';
            title.textContent = show.title;

            if (!isGuest) {
            const bookmarkBtn = document.createElement('button');
            bookmarkBtn.textContent = 'Bookmark';
            bookmarkBtn.className = 'bookmark-btn'; 

            bookmarkBtn.addEventListener('click', function(e) {
                e.stopPropagation(); 
                addBookmark(show, 'show');
            });
            card.appendChild(bookmarkBtn);}

            card.appendChild(img);
            card.appendChild(title);
            rowElement.appendChild(card);
        });
    }

    function displayMusic(musicList){ //music page
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

            if (!isGuest) {
                const bookmarkBtn = document.createElement('button');
                bookmarkBtn.textContent = 'Bookmark';
                bookmarkBtn.className = 'bookmark-btn'; 

                bookmarkBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    addBookmark(music, 'music');
                });
                card.appendChild(bookmarkBtn);}

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(details);
            musicContainer.appendChild(card);
            
        });
    }

    function displayMusicToRow(musicList, rowElement) { //homepage functionality
        musicList.forEach(music => {
            const card = document.createElement('div');
            card.className = 'music-card';

            const img = document.createElement('img');
            img.src = music.cover;
            img.alt = music.title + " cover";

            const title = document.createElement('h3');
            title.className = 'music-title';
            title.textContent = music.title;

            if (!isGuest) {
                const bookmarkBtn = document.createElement('button');
                bookmarkBtn.textContent = 'Bookmark';
                bookmarkBtn.className = 'bookmark-btn'; 

                bookmarkBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); 
                    addBookmark(music, 'music');
                });
                card.appendChild(bookmarkBtn);}

            card.appendChild(img);
            card.appendChild(title);
            rowElement.appendChild(card);
        });
    }

    function searchContent(query){ //search bar functionality
        const lowerQuery = query.toLowerCase(); //for easier parsing
        
        const movieResults = movies.filter(movie =>
            movie.title.toLowerCase().includes(lowerQuery) ||
            movie.director.toLowerCase().includes(lowerQuery) ||
            movie.cast.some(actor => actor.toLowerCase().includes(lowerQuery)) ||
            movie.rating.toLowerCase().includes(lowerQuery)
        );

        const showResults = shows.filter(show =>
            show.title.toLowerCase().includes(lowerQuery) ||
            show.director.toLowerCase().includes(lowerQuery) ||
            show.cast.some(actor => actor.toLowerCase().includes(lowerQuery)) ||
            show.rating.toLowerCase().includes(lowerQuery)
        );

        const musicResults = musics.filter(music =>
            music.title.toLowerCase().includes(lowerQuery) ||
            music.artist.toLowerCase().includes(lowerQuery)
        );

        // Hide homepage sections
        document.querySelector('.popular-section').style.display = 'none';
        document.querySelector('.continue-section').style.display = 'none';
        document.querySelector('.recommended-section').style.display = 'none';

        // Show results
        movieContainer.style.display = 'flex';
        showContainer.style.display = 'flex';
        musicContainer.style.display = 'flex';

        displayMovies(movieResults);
        displayShows(showResults);
        displayMusic(musicResults);
    }


    searchButton.addEventListener('click', function() {
        const searchQuery = searchInput.value.trim();
        if (searchQuery === ''){
            return;
        }
        searchContent(searchQuery);
    })

    //when content category button is pressed, page shows only that content
    movieBtn.addEventListener('click', function() { 
        showOnlyCategory('movies');
        displayMovies(movies);
    })
    tvBtn.addEventListener('click', function() {
        showOnlyCategory('shows');
        displayShows(shows);
    })
    musicBtn.addEventListener('click', function() {
        showOnlyCategory('music');
        displayMusic(musics);
    })
    bookmarked.addEventListener('click', function(){
        showOnlyCategory('bookmarks');
        displayBookmarks();
    })

    function addBookmark(item, type) { //type refers to content category; function adds content to bookmarked page
         const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
         bookmarks.push({ ...item, type });
         localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    

    function displayBookmarks() {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

        movieContainer.innerHTML = '';
        showContainer.innerHTML = '';
        musicContainer.innerHTML = '';

        const movieBookmarks = bookmarks.filter(b => b.type === 'movie');
        const showBookmarks = bookmarks.filter(b => b.type === 'show');
        const musicBookmarks = bookmarks.filter(b => b.type === 'music');

        if (movieBookmarks.length) {//if any bookmarked, display
            movieContainer.style.display = 'flex';
            displayMovies(movieBookmarks);
        }

        if (showBookmarks.length) {
            showContainer.style.display = 'flex';
            displayShows(showBookmarks);
        }

        if (musicBookmarks.length) { 
            musicContainer.style.display = 'flex';
            displayMusic(musicBookmarks);
        }
}

    function showOnlyCategory(type){
    //concealing any content originally on the screen
    document.querySelector('.popular-section').style.display = 'none';
    document.querySelector('.continue-section').style.display = 'none';
    document.querySelector('.recommended-section').style.display = 'none';

    movieContainer.style.display = 'none';
    showContainer.style.display = 'none';
    musicContainer.style.display = 'none';

    if (type === 'movies') movieContainer.style.display = 'flex';
    if (type === 'shows') showContainer.style.display = 'flex';
    if (type === 'music') musicContainer.style.display = 'flex';
    }

    function loadHomePageSections(){ //loading the movies/shows/music to be shown on homepage
        popularRow.innerHTML = '';
        displayMoviesToRow(movies.slice(0, 1), popularRow); //random content to simulate entertainment home page
        displayShowsToRow(shows.slice(1, 2), popularRow);
        displayMusicToRow(musics.slice(0, 1), popularRow);

        continueRow.innerHTML = '';
        displayMoviesToRow(movies.slice(1, 2), continueRow);
        displayShowsToRow(shows.slice(-1), continueRow);

        recommendedRow.innerHTML = '';
        displayMoviesToRow(movies.slice(0, 1), recommendedRow);
        displayShowsToRow(shows.slice(0, 1), recommendedRow);
        displayMusicToRow(musics.slice(-1), recommendedRow);
    }

   async function loadContent(){
        await loadMovies();
        await loadShows();
        await loadMusic();
        loadHomePageSections();
    }

    loadContent();
    movieContainer.style.display = 'none';
    showContainer.style.display = 'none';
    musicContainer.style.display = 'none';
    

});
