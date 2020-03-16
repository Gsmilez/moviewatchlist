import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Joi from "joi-browser";
import Form from "./../common/Form";
import Input from "./../common/input";
import axios from "axios";

const Register = props => {
  const [user, setUser] = useState({ username: "", password: "" });
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setUser({ username: "", password: "" });
  };
  const onSubmit = e => {
    e.preventDefault();
    AuthService.register(user).then(data => {
      const { message } = data;
      console.log(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="username"
          label="Username"
          // error={errors.username}
        />
        <Input
          onChange={onChange}
          name="password"
          label="Password"
          // error={errors.password}
          type="password"
        />
        <button
          //  disabled={this.validate()}
          className="btn btn-primary"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

// export default Register;
// class Register extends Form {
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
//       .min(5)
//   };
//   doSubmit = async () => {
//     const user = {
//       username: this.state.data.username,
//       password: this.state.data.username
//     };
//     await axios
//       .post("http://localhost:5000/user/register", user)
//       .then(r => console.log(r, "successfully Registered"));
//   };
//   render() {
//     const { data, errors } = this.state;
