import Event from "../../Events/Event";
import { useState } from "react";

interface EventDataProps {
  _id: string;
  title: string;
  author: string;
  body: string;
  datePosted: string;
  dateOfEvent: string;
  applicableTo: string;
  image: string;
  onDelete: (id: string) => void;
}

const DeletableEvent = ({
  _id,
  title,
  author,
  body,
  datePosted,
  dateOfEvent,
  applicableTo,
  image,
  onDelete,
}: EventDataProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(false);
    onDelete(_id);
    deleteImage(image);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const deleteImage = async (imageUrl: string) => {
    await fetch(process.env.REACT_APP_BACKEND_URL + "/s3/s3Url", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });
  };

  return (
    <div className={`deletable-doc ${confirmDelete ? "confirm-delete" : ""}`}>
      <Event
        title={title}
        author={author}
        body={body}
        datePosted={datePosted}
        dateOfEvent={dateOfEvent}
        applicableTo={applicableTo}
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

export default DeletableEvent;
