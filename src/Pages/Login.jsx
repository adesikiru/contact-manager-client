import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/CSS/form.css";
import Validation from "../Components/Validation";
import axios from "axios";
import { toast } from "react-toastify";
import {UserContext}  from "../App";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errrs = Validation(values);
    setErrors(errrs);
    if (errrs.password === "" && errrs.email === "") {
      axios
        .post("https://contact-manager-server-three.vercel.app/contactmsyt/login", values)
        .then((res) => {
          if (res.data.success) {
            toast.success("Login Successfully", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
            });
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            console.log(user);
            navigate("/dashboard");
          }
          console.log(res);
          console.log(serverErrors);
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setServerErrors(err.response.data.errors);
          } else {
            console.log(err);
          }
          if (err.response && err.response.data && err.response.data.errors) {
            const serverErr = err.response.data.errors.map(
              (error) => error.msg,
            );
            setServerErrors(serverErr);
            serverErr.forEach((errorMsg) => {
              toast.error(errorMsg, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
              });
            });
          } else {
            toast.error("An unexpected error occurred", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
            });
            console.log(err);
          }
          console.log(err);
        });
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2> Login </h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            onChange={handleInput}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="form-control"
            autoComplete="off"
          />
          {errors.email && <i className="form-error">{errors.email}</i>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password :
          </label>
          <input
            onChange={handleInput}
            type="password"
            name="password"
            id="password"
            placeholder="* * * * * *"
            className="form-control"
            autoComplete="off"
          />
          {errors.password && <i className="form-error">{errors.password}</i>}
        </div>
        {/*  {serverErrors.length > 0 &&
          serverErrors.map((error, index) => {
            console.log("error msg", error.msg);
            <i className="form-error" key={index}>
              {error.msg}
            </i>;
          })} */}
        <button type="submit" className="form-btn">
          Login
        </button>
        <p>
          {" "}
          Don't have an account? <Link to="/register">Register</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
