import { Button } from "@mui/material";
import "./Admin.css";
import Search from "./Search";

import { useState, useEffect } from "react";

interface EditFormProps {
  type: string;
}

const EditForm = ({ type }: EditFormProps) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (type === "Events") {
      setDescription("Events");
    } else if (type === "Announcements") {
      setDescription("Announcements");
    } else if (type === "Due Dates") {
      setDescription("Due Dates");
    } else {
      setDescription("a Team member");
    }
  }, [type]);

  return (
    <div className="edit-form-container">
      <h1>Edit {description}</h1>
      <Search type={type} searchPurpose="edit" />
    </div>
  );
};

export default EditForm;
