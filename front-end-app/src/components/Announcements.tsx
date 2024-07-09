import { useEffect, useState } from "react";
import Announcement from "./Announcement";
import "../css/Announcements.css";

interface AnnouncementData {
  Title: string;
  Author: string;
  Body: string;
  Keywords: string[];
  Date: string;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);

  useEffect(() => {
    // Fetch announcements from backend
    const fetchAnnouncements = async () => {
      const response = await fetch("http://localhost:3000/announcements");
      if (!response.ok) {
        console.error("Failed to fetch announcements");
        return;
      }

      const data: AnnouncementData[] = await response.json();
      setAnnouncements(data);
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="announcements-container">
      <h1>Announcements</h1>
      <div className="announcements-list">
        {announcements.map((announcement, index) => (
          <Announcement
            key={index}
            title={announcement.Title}
            author={announcement.Author}
            body={announcement.Body}
            keywords={announcement.Keywords}
            date={announcement.Date}
          />
        ))}
      </div>
    </div>
  );
};

export default Announcements;
