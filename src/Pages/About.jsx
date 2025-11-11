import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>About Contact Manager</h1>
      <p style={{marginTop: '10px'}}>
        This is a simple contact management application built by <b> <Link to='https://github.com/adesikiru'>ADE SIKIRU</Link></b>  using the MERN stack:
        MongoDB, Express, React and Node.js.
      </p>
      <p style={{marginTop: '10px'}}>
        It allows users to register, log in, and manage their contacts
        efficiently.
      </p>
      <p style={{marginTop: '10px'}}>
        Features include adding, editing, and deleting contacts, as well as
        viewing contact details.
      </p>
      <p style={{marginTop: '10px'}}>
        This project is designed to help users keep their contact information
        organized and easily accessible.
      </p>
      <p style={{marginTop: '10px'}}>Thank you for using Contact Manager!</p>
      <Link to='/' style={{display: 'block', marginTop: '20px'}}>Go to Home Page</Link>
    </div>
  );
};

export default About;
