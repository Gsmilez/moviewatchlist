import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MyMovieList from "./components/MyMovieList";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import NavBar from "./components/navBar";
import "./App.css";
import Login from "./components/Login";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/mymovielist" component={MyMovieList} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
