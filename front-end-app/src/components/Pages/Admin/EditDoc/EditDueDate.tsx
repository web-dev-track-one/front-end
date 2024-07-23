import React, { useState } from "react";
import { TextField, Button, FormControl, InputLabel } from "@mui/material";
import DueDate from "../../DueDates/DueDate"; // Assume this component is similar to Announcement component

interface EditDueDateProps {
  _id: string;
  title: string;
  author: string;
  datePosted: string;
  dueDate: string;
  keywords: string[];
  applicableTo: string;
  onEdit: (id: string, updatedDueDate: any) => void;
}

const EditDueDate = ({
  _id,
  title,
  author,
  datePosted,
  dueDate,
  keywords,
  applicableTo,
  onEdit,
}: EditDueDateProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [editedDatePosted, setEditedDatePosted] = useState(datePosted);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);
  const [editedKeywords, setEditedKeywords] = useState(keywords.join(", "));

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedDueDate = {
      Title: editedTitle,
      Author: editedAuthor,
      "Date Posted": editedDatePosted,
      "Due Date": editedDueDate,
      Keywords: editedKeywords.split(", ").map((keyword) => keyword.trim()),
    };
    onEdit(_id, updatedDueDate);
    setIsEditing(false);
  };

  return (
    <div className={`editable-doc ${isEditing ? "editing" : ""}`}>
      {!isEditing ? (
        <>
          <DueDate
            title={title}
            author={author}
            datePosted={datePosted}
            dateDue={dueDate}
            keywords={keywords}
            applicableTo={applicableTo}
          />
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        </>
      ) : (
        <div className="admin-edit-form">
          <h1>Edit Due Date</h1>
          <form onSubmit={handleSubmit} id="editForm">
            <TextField
              label="Title"
              name="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <TextField
              label="Author"
              name="Author"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={editedAuthor}
              onChange={(e) => setEditedAuthor(e.target.value)}
            />
            <TextField
              label="Date Posted"
              name="Date Posted"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
              value={editedDatePosted}
              onChange={(e) => setEditedDatePosted(e.target.value)}
            />
            <TextField
              label="Due Date"
              name="Due Date"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
            />
            <TextField
              label="Keywords"
              name="Keywords"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={editedKeywords}
              onChange={(e) => setEditedKeywords(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditDueDate;
