import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import TeamMember from "../../MeetTheTeam/TeamMember";

interface EditTeamProps {
  index: number;
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  onEdit: (id: string, updatedTeamMember: any) => void;
}

const EditTeam = ({
  index,
  _id,
  name,
  role,
  bio,
  image,
  onEdit,
}: EditTeamProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedRole, setEditedRole] = useState(role);
  const [editedBio, setEditedBio] = useState(bio);
  const [editedImage, setEditedImage] = useState(image);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    const updatedTeamMember = {
      Name: editedName,
      Role: editedRole,
      Bio: editedBio,
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

        updatedTeamMember.Image = fileUrl;
        setEditedImage(fileUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        return;
      }
    }

    onEdit(_id, updatedTeamMember);
    setIsEditing(false);
  };

  return (
    <div className={`editable-team-member ${isEditing ? "editing" : ""}`}>
      {!isEditing ? (
        <>
          <TeamMember
            name={name}
            role={role}
            bio={bio}
            image={image}
            index={index}
          />
          <button className="admin-action-button" onClick={handleEditClick}>
            Edit
          </button>
        </>
      ) : (
        <div className="admin-edit-form">
          <form onSubmit={handleSubmit} id="editForm">
            <TextField
              label="Name"
              name="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <TextField
              label="Role"
              name="Role"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
            />
            <TextField
              label="Bio"
              name="Bio"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
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

export default EditTeam;
