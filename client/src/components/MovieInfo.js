import React from "react";
import axios from "axios";
const MovieInfo = ({ closeMovieInfo, currentMovie, onClickAdd }) => {
  onClickAdd = async () => {
    const movie = {
      movieTitle: currentMovie.title,
      moviePlot: currentMovie.overview,
      movieImage: currentMovie.poster_path,
      movieRating: currentMovie.vote_average,
      movieReleaseDate: currentMovie.release_date,
      movieId: currentMovie.id
    };
    await axios
      .post("http://localhost:5000/user/movie", { movies: movie })
      .then(r => console.log(r, "Successfully added to your watchlist"));
  };
  return (
    <div className="container">
      <div
        className="row"
        onClick={closeMovieInfo}
        style={{ cursor: "pointer", paddingTop: 50 }}
      >
        <i className="fas fa-arrow-left"> Back</i>
        <span style={{ marginLeft: 10 }}></span>
      </div>
      <div className="row">
        <div className="col s12 m4">
          {currentMovie.poster_path === null ? (
            <img
              src={
                "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image/jpg"
              }
              alt="card"
              style={{ width: "100%", height: 360 }}
            />
          ) : (
            <img
              src={`http://image.tmdb.org/t/p/w185${currentMovie.poster_path}`}
              alt="card"
              style={{ width: "100%", height: 360 }}
            />
          )}
        </div>
        <div className="col s12 m8">
          <div className="info-container">
            <p>{currentMovie.title}</p>
            <p>{currentMovie.release_date}</p>
            <p>{currentMovie.overview}</p>
          </div>
          <button onClick={onClickAdd}>Add To Watch List</button>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
