const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Movie = require("../models/Movie");

const signToken = userID => {
  return JWT.sign(
    {
      iss: "GusCoder",
      sub: userID
    },
    "GusCoder",
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      return res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true }
      });
    if (user)
      return res.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true }
      });
    else {
      const newUser = new User({ username, password });
      newUser.save(err => {
        if (err)
          return res.status(500).json({
            message: {
              msgBody: "Error has occured in adding new user",
              msgError: true
            }
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false
            }
          });
      });
    }
  });
});
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username } });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "" }, success: true });
  }
);

userRouter.post(
  "/movie",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const movie = new Movie(req.body);
    movie.save(err => {
      if (err)
        return res.status(500).json({
          message: { msgBody: "Error has occured", msgError: true }
        });
      else {
        req.user.movies.push(movie);
        req.user.save(err => {
          if (err)
            return res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true }
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Successfully added Movie",
                msgError: false
              }
            });
        });
      }
    });
  }
);

userRouter.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("movies")
      .exec((err, document) => {
        if (err)
          return res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true }
          });
        else {
          res
            .status(200)
            .json({ movies: document.movies, authenticated: true });
        }
      });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
);

module.exports = userRouter;
