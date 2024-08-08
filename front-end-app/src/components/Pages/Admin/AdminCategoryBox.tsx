import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";

interface AdminCategoryBoxProps {
  title: string;
  setter: React.Dispatch<React.SetStateAction<string[]>>;
}
const AdminCategoryBox = ({ title, setter }: AdminCategoryBoxProps) => {
  return (
    <div className="adminCategoryBox">
      <div className="adminCategoryBox-header">
        <h1>{title}</h1>
      </div>
      <div className="adminCategoryBox-content">
        <Button
          variant="contained"
          style={{ backgroundColor: "#F2F2F2", color: "#000" }}
          onClick={() => setter(["Create", title])}
        >
          Create
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#F2F2F2", color: "#000" }}
          onClick={() => setter(["Delete", title])}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#F2F2F2", color: "#000" }}
          onClick={() => setter(["Edit", title])}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default AdminCategoryBox;
