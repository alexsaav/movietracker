import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//TMDB API
const tmdbKey = process.env.REACT_APP_TMDB_API_KEY;
// API’s base URL
const tmdbBaseUrl = "https://api.themoviedb.org/3";



// SEARCH MOVIES
export const searchMovies = createAsyncThunk(
    "movies/searchMovies",

    async ({title, page = 1}) => {
        //Search Movie endpoint
        const searchMovieEndpoint = "/search/movie";
        
        const urlToFetch = new URL(`${tmdbBaseUrl}${searchMovieEndpoint}`)

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")
        if (title !== "") {
            urlToFetch.searchParams.append("query", title)
        }
        urlToFetch.searchParams.append("page", page)
        urlToFetch.searchParams.append("include_adult", "false")

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const movies = await response.json();
            return movies;
        }
        
    }
);

//GET LATEST MOVIE
export const getLatestMovies = createAsyncThunk(
    "movies/getLastestMovies",

    async() => {
        const latestMoviesEndpoint = "/movie/latest";

        const urlToFetch = new URL(`${tmdbBaseUrl}${latestMoviesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const latestMovies = await response.json();
            return latestMovies;
        }

    }
);

//GET POPULAR MOVIE
export const getPopularMovies = createAsyncThunk(
    "movies/getPopularMovies",

    async(page = 1) => {
        const popularMoviesEndpoint = "/movie/popular";

        const urlToFetch = new URL(`${tmdbBaseUrl}${popularMoviesEndpoint}`);

        //query params
        urlToFetch.searchParams.append("api_key", tmdbKey)
        urlToFetch.searchParams.append("language", "en-US")
        urlToFetch.searchParams.append("page", page);

        const response = await fetch(urlToFetch);

        if(response.ok) {
            const popularMovies = await response.json();
            console.log(popularMovies)
            return popularMovies;
        }

    }
);

//GET NOW PLAYING MOVIES


//GET TOP RATED MOVIES
//GET UPCOMING MOVIES
//GET RELEASE DATES 
//GET RECOMMENDATIONS
//Get Changes
//Get Release Dates
//Get Trending /trending/{media_type}/{time_window}



// SLICE
export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: {
            page: 1,
            results: [],
            total_pages: 0
        },
        popularMovies: {
            page: 1,
            results: []
        }
    },
    extraReducers: {
        [searchMovies.fulfilled]: (state, action) => {
            state.movies = action.payload;
        },
        [getPopularMovies.fulfilled]: (state, action) => {
            state.popularMovies = action.payload;
        },
    }
});

//SELECTORS
export const selectSearchMovies = state => state.movies.movies;
//export const selectLatestMovies = state => state.movies.latestMovies;
export const selectPopularMovies = state => state.movies.popularMovies;

//REDUCER
export default moviesSlice.reducer;