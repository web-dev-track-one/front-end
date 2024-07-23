import TeamMember from "../../MeetTheTeam/TeamMember";
import { useState } from "react";

interface DeleteTeamMemberProps {
  index: number;
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  onDelete: (id: string) => void;
}

const DeletableTeamMember = ({
  index,
  _id,
  name,
  role,
  bio,
  image,
  onDelete,
}: DeleteTeamMemberProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(false);
    deleteImage(image);
    onDelete(_id);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const deleteImage = async (imageUrl: string) => {
    await fetch("http://localhost:3000/s3/s3Url", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });
  };

  return (
    <div className={`deletable-doc ${confirmDelete ? "confirm-delete" : ""}`}>
      <TeamMember
        index={index}
        name={name}
        role={role}
        bio={bio}
        image={image}
      />
      {confirmDelete ? (
        <div className="confirm-delete-buttons">
          <button
            className="confirm-delete-button"
            onClick={handleConfirmDelete}
          >
            Confirm Deletion
          </button>
          <button className="cancel-delete-button" onClick={handleCancelDelete}>
            No
          </button>
        </div>
      ) : (
        <button className="admin-action-button" onClick={handleDeleteClick}>
          Delete
        </button>
      )}
    </div>
  );
};

export default DeletableTeamMember;
