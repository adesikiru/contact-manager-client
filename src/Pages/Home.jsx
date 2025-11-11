import React from "react";
import Navbar from "../Components/Navbar";
import '../assets/CSS/home.css'

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="home">
      <h1 className="home-title">CONTACT MANAGEMENT SYSTEM</h1>
      <p className=".home-description">
        Begin collecting your contact in a very comfortable way.
        We provide you with an easy to use and user-friendly interface to manage
        your contacts.
      </p>
    </div>
    </>
  );
};

export default Home;
