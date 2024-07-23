import "./Admin.css";
import Search from "./Search";

import { useState, useEffect } from "react";

interface DeleteFormProps {
  type: string;
}

const DeleteForm = ({ type }: DeleteFormProps) => {
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
    <div className="admin-form-container">
      <h1>Delete {description}</h1>
      <Search type={type} searchPurpose="delete" />
    </div>
  );
};

export default DeleteForm;
