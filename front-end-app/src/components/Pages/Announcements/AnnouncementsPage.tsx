import { useEffect, useState } from "react";
import Announcements from "./Announcements";

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

const AnnouncementsPage = () => {
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
        process.env.REACT_APP_BACKEND_URL + `/announcements?offset=${offset}&limit=${limit}`
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

  return (
    <Announcements
      announcementType="view"
      docs={announcements}
      setDocs={setAnnouncements}
      loadMoreAnnouncements={loadMoreAnnouncements}
      totalAnnouncements={totalAnnouncements}
      loading={loading}
    />
  );
};

export default AnnouncementsPage;
