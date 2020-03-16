import React from "react";
const Movie = props => {
  return (
    <div>
      <div>
        <div>
          {props.image == null ? (
            <img
              src={
                "https://s3-ap-southest-1.amazonaws.com/upcode/static/default-image.jpg"
              }
              alt="card"
              style={{ width: "100%", height: 360 }}
              onClick={() => props.viewMovieInfo(props.movieid)}
            />
          ) : (
            <img
              src={`http://image.tmdb.org/t/p/w185${props.image}`}
              alt="card "
              style={{ width: "100%", height: 360 }}
              onClick={() => props.viewMovieInfo(props.movieId)}
            />
          )}
        </div>
        <div>
          <p>
            <a onClick={() => props.viewMovieInfo(props.movieId)}>
              {props.movieTitle}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
