import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/CSS/form.css";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUserPlus,
  FaAt,
  FaPhoneFlip,
  FaRegAddressCard,
} from "react-icons/fa6";

const AddContact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://contact-manager-server-three.vercel.app/api/contactmsyt/add-contact", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Contact has been successfully added", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
          });
          navigate("/dashboard");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="add-form-container">
      <form onSubmit={handleSubmit} className="add-form">
        <h2> Create Contact</h2>
        <div className="form-group">
          <FaUserPlus />
          <input
            onChange={handleInput}
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <FaAt />
          <input
            onChange={handleInput}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <FaPhoneFlip />
          <input
            onChange={handleInput}
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter Phone Number"
            className="form-control"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <FaRegAddressCard />
          <input
            onChange={handleInput}
            type="text"
            name="address"
            id="address"
            placeholder="Enter Contact Address"
            className="form-control"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="form-btn">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;
