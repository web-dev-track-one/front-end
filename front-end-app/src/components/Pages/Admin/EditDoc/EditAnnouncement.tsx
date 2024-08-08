import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Announcement from "../../Announcements/Announcement";

interface EditableAnnouncementProps {
  _id: string;
  title: string;
  author: string;
  body: string;
  keywords: string[];
  date: string;
  onEdit: (id: string, updatedAnnouncement: any) => void;
}

const EditableAnnouncement = ({
  _id,
  title,
  author,
  body,
  keywords,
  date,
  onEdit,
}: EditableAnnouncementProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [editedBody, setEditedBody] = useState(body);
  const [editedKeywords, setEditedKeywords] = useState(keywords.join(", "));
  const [editedDate, setEditedDate] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let disappearDate = new Date();
    disappearDate.setDate(disappearDate.getDate() + 28);

    const updatedAnnouncement = {
      Title: editedTitle,
      Author: editedAuthor,
      Body: editedBody,
      Keywords: editedKeywords.split(", ").map((keyword) => keyword.trim()),
      Date: editedDate,
      "Disappear Date": disappearDate,
    };
    onEdit(_id, updatedAnnouncement);
    setIsEditing(false);
  };

  useEffect(() => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    setEditedDate(formattedDate);
  }, [date]);

  return (
    <div className={`editable-doc ${isEditing ? "editing" : ""}`}>
      {!isEditing ? (
        <>
          <Announcement
            title={title}
            author={author}
            body={body}
            keywords={keywords}
            date={date}
          />
          <button className="admin-action-button" onClick={handleEditClick}>
            Edit
          </button>
        </>
      ) : (
        <div className="admin-edit-form">
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
              label="Date"
              name="Date"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
            <TextField
              label="Body"
              name="Body"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
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

export default EditableAnnouncement;
