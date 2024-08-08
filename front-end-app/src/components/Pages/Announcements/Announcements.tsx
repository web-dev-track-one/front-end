import { useEffect, useState } from "react";
import Announcement from "./Announcement";
import "./Announcements.css";
import DeletableAnnouncement from "../Admin/DeleteDoc/DeleteAnnouncement";
import { deleteDoc, editDoc } from "../Admin/helperFunctions";
import EditableAnnouncement from "../Admin/EditDoc/EditAnnouncement";
interface AnnouncementData {
  _id: string;
  Title: string;
  Author: string;
  Body: string;
  Keywords: string[];
  Date: string;
}

interface AnnouncementsProps {
  announcementType: string;
  docs: AnnouncementData[];
  setDocs: React.Dispatch<React.SetStateAction<AnnouncementData[]>>;
  loadMoreAnnouncements?: () => void;
  totalAnnouncements?: number;
  loading?: boolean;
}

const Announcements = ({
  announcementType,
  docs,
  setDocs,
  loadMoreAnnouncements,
  totalAnnouncements,
  loading,
}: AnnouncementsProps) => {
  const handleDeleteAnnouncement = async (id: string) => {
    const success = await deleteDoc(id, "Announcements");
    if (success) {
      setDocs((prevAnnouncements) =>
        prevAnnouncements.filter((announcement) => announcement._id !== id)
      );
    }
  };

  const handleEditAnnouncement = async (
    id: string,
    updatedAnnouncement: AnnouncementData
  ) => {
    const success = await editDoc(id, updatedAnnouncement, "announcement");
    if (success) {
      setDocs((prevAnnouncements) =>
        prevAnnouncements.map((announcement) =>
          announcement._id === id
            ? { ...announcement, ...updatedAnnouncement }
            : announcement
        )
      );
    }
  };

  return (
    <div className="announcements-container">
      <h1>Announcements</h1>
      <div className="announcements-list">
        {docs.map((announcement, index) => (
          <>
            {announcementType === "delete" ? (
              <div className="deletable-announcement">
                <DeletableAnnouncement
                  _id={announcement._id}
                  title={announcement.Title}
                  author={announcement.Author}
                  body={announcement.Body}
                  keywords={announcement.Keywords}
                  date={announcement.Date}
                  onDelete={handleDeleteAnnouncement}
                />
              </div>
            ) : announcementType === "view" ? (
              <Announcement
                key={index}
                title={announcement.Title}
                author={announcement.Author}
                body={announcement.Body}
                keywords={announcement.Keywords}
                date={announcement.Date}
              />
            ) : (
              <EditableAnnouncement
                key={index}
                _id={announcement._id}
                title={announcement.Title}
                author={announcement.Author}
                body={announcement.Body}
                keywords={announcement.Keywords}
                date={announcement.Date}
                onEdit={handleEditAnnouncement}
              />
            )}
          </>
        ))}
      </div>
      {announcementType === "view" &&
        !loading &&
        totalAnnouncements &&
        docs.length < totalAnnouncements && (
          <div className="loadMoreButton-container">
            <button className="loadMoreButton" onClick={loadMoreAnnouncements}>
              Load More
            </button>
          </div>
        )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Announcements;
