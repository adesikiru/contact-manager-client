import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const customStyles = {
  headCells: {
    style: {
      fontWeight: 600,
      fontSize: 15 + "px",
    },
  },
  cells: {
    style: {
      fontSize: 13 + "px",
      fontWeight: 500,
    },
  },
};
const MySwal = withReactContent(Swal);
const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const deleteContact = (id) => {
    MySwal.fire({
      title: "Are you sure you want to delete this contact?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://contact-manager-server-sepia.vercel.app/contactmsyt/contact/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              setContacts(res.data.contacts);
              MySwal.fire({
                title: "Deleted!",
                text: "Contact has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link to={`/dashboard/edit-contact/${row._id}`}>
            <FaPenToSquare className="table-icon1" id={row} />
          </Link>
          <FaRegTrashCan
            className="table-icon2"
            onClick={() => deleteContact(row._id)}
          />
        </>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://contact-manager-server-sepia.vercel.app/contactmsyt/contacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setContacts(res.data.contacts);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader">
          <CircleLoader
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="contact-list">
          <DataTable
            columns={columns}
            data={contacts}
            pagination
            highlightOnHover
            customStyles={customStyles}
          />
          {contacts.length === 0 ? (
            <h3>No Contacts Found, Pls Add Contacts</h3>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Contacts;
