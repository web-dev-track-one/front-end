import Event from "../Events/Event";
import { useState } from "react";

interface EventDataProps {
  _id: string;
  title: string;
  author: string;
  body: string;
  datePosted: Date;
  dateOfEvent: Date;
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
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
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
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
      )}
    </div>
  );
};

export default DeletableEvent;
