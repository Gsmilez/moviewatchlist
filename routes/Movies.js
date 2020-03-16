const movieRoute = require("express").Router();
const Movie = require("../models/Movie");

movieRoute.route("/").get((req, res) => {
  Movie.find((err, movies) => {
    if (err) {
      console.log(err);
    } else {
      res.json(movies);
      console.log(movies);
    }
  });
});

movieRoute.route("/:id").get((req, res) => {
  const id = req.params.id;
  Movie.findById(id, (err, movies) => {
    if (err) {
      console.log(err);
    } else {
      res.json(movies);
    }
  });
});

movieRoute.route("/add").post((req, res) => {
  const movies = new Movie(req.body);
  movies.save().then(movies => {
    res.status(200).json({ movies: "Movie added successfully" });
  });
});
module.exports = movieRoute;
