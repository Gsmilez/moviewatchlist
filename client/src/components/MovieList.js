import React from "react";
import Movie from "./Movie";
const MovieList = props => {
  return (
    <div>
      <div>
        <div>
          {props.movies.map((movie, i) => {
            return (
              <Movie
                key={i}
                image={movie.poster_path}
                viewMovieInfo={props.viewMovieInfo}
                movieId={movie.id}
                movieTitle={movie.original_title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
