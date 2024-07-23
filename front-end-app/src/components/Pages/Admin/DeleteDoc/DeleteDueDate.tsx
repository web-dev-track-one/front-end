import DueDate from "../../DueDates/DueDate";
import { useState } from "react";
interface DueDateData {
  _id: string;
  title: string;
  author: string;
  keywords: string[];
  datePosted: string;
  dateDue: string;
  applicableTo: string;
  onDelete: (id: string) => void;
}

const DeletableDueDate = ({
  _id,
  title,
  author,
  keywords,
  datePosted,
  dateDue,
  applicableTo,
  onDelete,
}: DueDateData) => {
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
      <DueDate
        title={title}
        author={author}
        keywords={keywords}
        datePosted={datePosted}
        dateDue={dateDue}
        applicableTo={applicableTo}
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

export default DeletableDueDate;
