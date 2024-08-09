import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Event from "../../Events/Event";

interface EditEventProps {
  _id: string;
  title: string;
  author: string;
  body: string;
  datePosted: string; // Changed to string to ensure proper initialization
  dateOfEvent: string; // Changed to string to ensure proper initialization
  applicableTo: string;
  image: string;
  onEdit: (id: string, updatedEvent: any) => void;
}

const EditEvent = ({
  _id,
  title,
  author,
  body,
  datePosted,
  dateOfEvent,
  applicableTo,
  image,
  onEdit,
}: EditEventProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [editedBody, setEditedBody] = useState(body);
  const [editedDatePosted, setEditedDatePosted] = useState(datePosted);
  const [editedDateOfEvent, setEditedDateOfEvent] = useState(dateOfEvent);
  const [editedApplicableTo, setEditedApplicableTo] = useState(applicableTo);
  const [editedImage, setEditedImage] = useState(image);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const formattedDate = new Date(editedDatePosted)
      .toISOString()
      .split("T")[0];
    setEditedDatePosted(formattedDate);

    const formattedDate2 = new Date(editedDateOfEvent)
      .toISOString()
      .split("T")[0];
    setEditedDateOfEvent(formattedDate2);
  }, [editedDateOfEvent, editedDatePosted]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const deletePreviousImage = async (imageUrl: string) => {
    await fetch(process.env.REACT_APP_BACKEND_URL + "/s3/s3Url", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedEvent = {
      Title: editedTitle,
      Author: editedAuthor,
      Body: editedBody,
      DatePosted: editedDatePosted,
      DateOfEvent: editedDateOfEvent,
      "Applicable to": editedApplicableTo,
      Image: editedImage,
    };

    if (selectedFile) {
      try {
        // Delete the previous image if a new file is selected
        if (editedImage) {
          await deletePreviousImage(editedImage);
        }

        const { uploadUrl, fileUrl } = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/s3Url"
        ).then((res) => res.json());

        await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: selectedFile,
        });

        updatedEvent.Image = fileUrl;
        setEditedImage(fileUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        return;
      }
    }

    onEdit(_id, updatedEvent);
    setIsEditing(false);
  };

  return (
    <div className={`editable-event ${isEditing ? "editing" : ""}`}>
      {!isEditing ? (
        <>
          <Event
            title={title}
            author={author}
            body={body}
            datePosted={datePosted}
            dateOfEvent={dateOfEvent}
            applicableTo={applicableTo}
            image={image}
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
              label="Body"
              name="Body"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
            />
            <TextField
              label="Date Posted"
              name="DatePosted"
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
              label="Date Of Event"
              name="DateOfEvent"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
              value={editedDateOfEvent}
              onChange={(e) => setEditedDateOfEvent(e.target.value)}
            />
            <TextField
              label="Applicable to"
              name="ApplicableTo"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={editedApplicableTo}
              onChange={(e) => setEditedApplicableTo(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} />
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

export default EditEvent;
