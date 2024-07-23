import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import React from "react";
import AdminCategoryBox from "./AdminCategoryBox";
import "./Admin.css";
import CreateForm from "./CreateForm";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";
interface AdminProps {
  setAuthToken: Dispatch<SetStateAction<string | null>>;
}

const Admin = ({ setAuthToken }: AdminProps) => {
  const navigate = useNavigate();
  const [create, setCreate] = React.useState(false);
  const [deleteForm, setdeleteForm] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [typeWindow, setTypeWindow] = React.useState("");

  // Indexes for the different categories. The first element is the Action of the button, the second element is the name of the category
  const [typeActionIndex, setTypeActionIndex] = useState(["", ""]);

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>("#createForm");
    form?.reset();

    if (typeActionIndex[0] === "Create") {
      // Create Button was pressed
      setCreate(true);
      setdeleteForm(false);
      setEdit(false);
    }
    if (typeActionIndex[0] === "Delete") {
      // Delete Button was pressed
      setCreate(false);
      setdeleteForm(true);
      setEdit(false);
    }
    if (typeActionIndex[0] === "Edit") {
      // Edit Button was pressed
      setCreate(false);
      setdeleteForm(false);
      setEdit(true);
    }
    // TypeWidnow, comes from the second element of the array. Once setTypeActionIndex in the AdminCategoryBoxes
    // changes the state of typeActionIndex, this useEffect will run and set the typeWindow to the second element of the array
    setTypeWindow(typeActionIndex[1]);
  }, [typeActionIndex]);

  return (
    <div className="admin-page">
      <div className="admin-head">
        <div className="admin-header">
          <h1>Welcome, Admin</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              localStorage.removeItem("token");
              console.log("Token removed from local storage");
              setAuthToken(null);
              navigate("/");
            }}
          >
            Log Out
          </Button>
        </div>
        <h2> What would you like to do today?</h2>
      </div>
      <div className="admin-boxes">
        <AdminCategoryBox title="Announcements" setter={setTypeActionIndex} />
        <AdminCategoryBox title="Events" setter={setTypeActionIndex} />
        <AdminCategoryBox title="Due Dates" setter={setTypeActionIndex} />
        <AdminCategoryBox title="Team" setter={setTypeActionIndex} />
      </div>
      {create && <CreateForm type={typeWindow} />}
      {deleteForm && <DeleteForm type={typeWindow} />}
      {edit && <EditForm type={typeWindow} />}
    </div>
  );
};

export default Admin;
