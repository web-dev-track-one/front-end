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

interface dataResponse {
  announcements: AnnouncementData[];
  totalAnnouncements: number;
}

const Announcements = ({ announcementType }: { announcementType: string }) => {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [totalAnnouncements, setTotalAnnouncements] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch announcements from backend
    const fetchAnnouncements = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/announcements?offset=${offset}&limit=${limit}`
      );

      if (!response.ok) {
        console.error("Failed to fetch announcements");
        return;
      }
      const data: dataResponse = await response.json();
      setAnnouncements((prevAnnouncements) => [
        ...prevAnnouncements,
        ...data.announcements,
      ]);

      setTotalAnnouncements(data.totalAnnouncements);
      setLoading(false);
    };

    fetchAnnouncements();
  }, [offset]);

  const loadMoreAnnouncements = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handleDeleteAnnouncement = async (id: string) => {
    const success = await deleteDoc(id, "Announcements");
    if (success) {
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter((announcement) => announcement._id !== id)
      );
    }
  };

  return (
    <div className="announcements-container">
      <h1>Announcements</h1>
      <div className="announcements-list">
        {announcements.map((announcement, index) => (
          <>
            {announcementType === "delete" ? (
              <div className="deletable-announcement">
                <DeletableAnnouncement
                  id={announcement._id}
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
      {announcements.length < totalAnnouncements && !loading && (
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
