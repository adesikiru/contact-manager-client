// client/src/App.jsx

import React, { createContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import axios from "axios";
import Contacts from "./Components/Contacts.jsx";
import AddContact from "./Components/AddContact.jsx";
import EditContact from "./Components/EditContact.jsx";
import Logout from "./Components/Logout.jsx";
import ProtectedRoutes from "./Components/ProtectedRoutes.jsx";
import NotFound from "./Pages/NotFound.jsx";

export const UserContext = createContext(null);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Contacts />,
      },
      {
        path: "/dashboard/add-contact",
        element: <AddContact />,
      },
      {
        path: "/dashboard/edit-contact/:id",
        element: <EditContact />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get("https://contact-manager-server-three.vercel.app/api/contactmsyt/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};

export default App;
