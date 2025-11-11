import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/CSS/form.css";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUserPlus,
  FaAt,
  FaPhoneFlip,
  FaRegAddressCard,
} from "react-icons/fa6";

const EditContact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("https://contact-manager-server-three.vercel.app/api/contactmsyt/update-contact/" + id, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Contact has been successfully updated", {
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

  useEffect(() => {
    axios
      .get("https://contact-manager-server-three.vercel.app/api/contactmsyt/contact/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setValues({
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phone,
            address: res.data.address,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="add-form-container">
      <form onSubmit={handleSubmit} className="add-form">
        <h2> Edit Contact</h2>
        <div className="form-group">
          <FaUserPlus />
          <input
            onChange={handleInput}
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            className="form-control"
            value={values.name}
          />
        </div>
        <div className="form-group">
          <FaAt />
          <input
            value={values.email}
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
            value={values.phone}
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
            value={values.address}
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
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default EditContact;
