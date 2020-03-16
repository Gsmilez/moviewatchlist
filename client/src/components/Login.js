import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "./../context/AuthContext";
// import Form from "../common/Form";
import Input from "../common/input";

const Login = props => {
  const [user, setUser] = useState({ username: "", password: "" });
  const authContext = useContext(AuthContext);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    AuthService.login(user).then(data => {
      console.log(data);
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/home");
      }
    });
  };
  return (
    <div>
      <h1> Login</h1>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          onChange={onChange}
          name="username"
          label="Username"
        />
        <Input
          onChange={onChange}
          name="password"
          label="Password"
          type="password"
        />
        <button
          // disabled={this.validate()}
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

// class Login extends Form {

//   state = {
//     data: { username: "", password: "" },
//     errors: {}
//   };
//   schema = {
//     username: Joi.string()
//       .required()
//       .label("Username"),
//     password: Joi.string()
//       .required()
//       .label("Password")
//   };

//   doSubmit = async () => {
//     const user = {
//       username: this.state.data.username,
//       password: this.state.data.username
//     };
//     await axios
//       .post("http://localhost:5000/user/login", user)
//       .then(r => console.log(r, "successfully logged in"));
//   };
