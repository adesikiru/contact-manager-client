import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/CSS/form.css";
import Validation from "../Components/Validation";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
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
    if (errrs.name === "" && errrs.password === "" && errrs.email === "") {
      axios
        .post("http://127.0.0.1:3000/contactmsyt/register", values)
        .then((res) => {
          if (res.data.success) {
            toast.success("Registered Successfully", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
            });
            navigate("/login");
          }
          console.log(res);
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
    console.log(serverErrors);
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2> Create Account</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            onChange={handleInput}
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            className="form-control"
          />
          {errors.name && <i className="form-error">{errors.name}</i>}
        </div>
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
          Register
        </button>
        <p>
          {" "}
          Already have an account? <Link to="/login">Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
