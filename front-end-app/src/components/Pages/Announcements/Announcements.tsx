import { useEffect, useState } from "react";
import Announcement from "./Announcement";
import "./Announcements.css";
import DeletableAnnouncement from "../Admin/DeleteAnnouncement";
import { deleteDoc } from "../Admin/deleteFunction";

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
            ) : (
              <Announcement
                key={index}
                title={announcement.Title}
                author={announcement.Author}
                body={announcement.Body}
                keywords={announcement.Keywords}
                date={announcement.Date}
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
