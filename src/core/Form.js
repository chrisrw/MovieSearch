import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [titleFromClick, setTitleFromClick] = useState('');
  const KEY = process.env.REACT_APP_APIKEY;

  // GET Movies based on input value.
  const fetchMovies = () => {
    return axios
      .get(`https://www.omdbapi.com/?apikey=${KEY}&s=${searchTitle}`)
      .then((res) => {
        setMovies(res.data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //DELETE Movie by Id
  // Make API calls on click to avoid unnecessary calls
  const handleClick = () => {
    setTitleFromClick(searchTitle);
    fetchMovies();
  };
  // make a copy of movies array, splice by id
  const filterMovie = (id) => {
    const newMovies = [...movies]
    newMovies.splice(id, 1)
    setMovies(newMovies)
  };

  return (
    <div>
      <div className="Header">
      <h1>Movies</h1>
        <input
        type="text"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      /> 
      
        <button style={{ height: "35px" }} type="button" className="btn btn-primary" onClick={handleClick}>
        Fetch Post
      </button>
      </div>
      <div className="grid">
        {movies.length > 0 &&
          movies.map((movie, id) => (
            <div
              key={id}
            >
              
              <img className="imgSize" src={movie.Poster} alt={`${movie.Title} movie poster`} />
              <p>
                {movie.Title} {movie.Year}
              </p>
              <button className="btn btn-danger" onClick={() => filterMovie(id)}>
                Remove Movie
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Form;
