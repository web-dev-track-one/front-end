import { useState, useEffect } from "react";
import Announcements from "../Announcements/Announcements";
import DueDates from "../DueDates/DueDates";
import Events from "../Events/Events";
import Teams from "../MeetTheTeam/MeetTheTeam";

interface AnnouncementData {
  _id: string;
  Title: string;
  Author: string;
  Body: string;
  Keywords: string[];
  Date: string;
}

interface DueDateData {
  _id: string;
  Title: string;
  Author: string;
  Keywords: string[];
  "Date Posted": string;
  "Due Date": string;
  "Applicable to": string;
}

interface EventData {
  _id: string;
  Title: string;
  Author: string;
  Body: string;
  DatePosted: string;
  DateOfEvent: string;
  "Applicable to": string;
  Image: string;
}

interface TeamData {
  _id: string;
  Name: string;
  Role: string;
  Bio: string;
  Image: string;
}

interface GetAlltoDeleteProps {
  eventType: string;
  docType: string;
}

const GetAll = ({ eventType, docType }: GetAlltoDeleteProps) => {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [dueDates, setDueDates] = useState<DueDateData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [teams, setTeams] = useState<TeamData[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const response = await fetch(
        `http://localhost:3000/${docType.replace(/\s+/g, "").toLowerCase()}`
      );
      if (!response.ok) {
        console.error("Failed to fetch announcements");
        return;
      }
      const data: any = await response.json();

      if (docType === "Announcements") {
        setAnnouncements(data.announcements as AnnouncementData[]);
      } else if (docType === "Due Dates") {
        setDueDates(data.allDueDates as DueDateData[]);
      } else if (docType === "Events") {
        setEvents(data.allEvents as EventData[]);
      } else {
        // docType === "Team"
        setTeams(data as TeamData[]);
      }
    };
    fetchDocs();
  }, []);
  return (
    <>
      {docType === "Announcements" && (
        <Announcements
          announcementType={eventType}
          docs={announcements}
          setDocs={setAnnouncements}
        />
      )}
      {docType === "Due Dates" && (
        <DueDates eventType={eventType} docs={dueDates} setDocs={setDueDates} />
      )}
      {docType === "Events" && (
        <Events eventType={eventType} docs={events} setDocs={setEvents} />
      )}
      {docType === "Team" && (
        <Teams eventType={eventType} docs={teams} setDocs={setTeams} />
      )}
    </>
  );
};

export default GetAll;
