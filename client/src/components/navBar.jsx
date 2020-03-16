import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../context/AuthContext";
const NavBar = props => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  const logoutHandler = () => {
    AuthService.logout().then(data => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };
  const unauthenticatedNavbar = () => {
    return (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </li>
      </>
    );
  };
  const authenticatedNavbar = () => {
    return (
      <>
        <li className="nav-item ">
          <NavLink className="nav-link" to="/mymovielist">
            My Movie List
          </NavLink>
        </li>
        <button
          type="button"
          className="btn btn-link nav-item nav-link"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Movie Watch List
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
