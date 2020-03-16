import React, { Component } from "react";
import Search from "./Search";
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import MovieInfo from "./MovieInfo";

class Home extends Component {
  state = {
    movies: [],
    search: "",
    totalResults: 0,
    currentPage: 1,
    currentMovie: null
  };

  handleSubmit = async e => {
    e.preventDefault();
    const result = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ed1b18e9826bd1190664c17b9c51cd83&query=${this.state.search}`
    )
      .then(data => data.json())
      .then(data => {
        console.log(data, "get request successful");
        this.setState({
          movies: [...data.results],
          totalResults: data.total_results
        });
      });
  };
  handleChange = e => {
    this.setState({ search: e.target.value });
  };
  handlePageChange = page => {
    console.log(page);
  };
  nextPage = pageNumber => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ed1b18e9826bd1190664c17b9c51cd83&query=${this.state.search}&page=${pageNumber}`
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({ movies: [...data.results], currentPage: pageNumber });
      });
  };
  viewMovieInfo = id => {
    const filteredMovie = this.state.movies.filter(movie => movie.id === id);
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({ currentMovie: newCurrentMovie });
  };
  closeMovieInfo = () => {
    this.setState({ currentMovie: null });
  };
  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);

    return (
      <div>
        {this.state.currentMovie === null ? (
          <div>
            <Search
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
            <MovieList
              viewMovieInfo={this.viewMovieInfo}
              movies={this.state.movies}
            />
          </div>
        ) : (
          <MovieInfo
            currentMovie={this.state.currentMovie}
            closeMovieInfo={this.closeMovieInfo}
          />
        )}
        {this.state.totalResults > 20 && this.state.currentMovie === null ? (
          <Pagination
            pages={numberPages}
            nextPage={this.nextPage}
            currentPage={this.currentPage}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Home;
