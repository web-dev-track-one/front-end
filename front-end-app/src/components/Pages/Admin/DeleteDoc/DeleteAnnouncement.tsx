import Announcement from "../../Announcements/Announcement";
import { useState } from "react";

interface DeletableAnnouncementProps {
  _id: string;
  title: string;
  author: string;
  body: string;
  keywords: string[];
  date: string;
  onDelete: (id: string) => void;
}

const DeletableAnnouncement = ({
  _id,
  title,
  author,
  body,
  keywords,
  date,
  onDelete,
}: DeletableAnnouncementProps) => {
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
      <Announcement
        title={title}
        author={author}
        body={body}
        keywords={keywords}
        date={date}
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

export default DeletableAnnouncement;
