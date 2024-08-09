import { TextField, Button } from "@mui/material";
import "./Admin.css";
import Announcements from "../Announcements/Announcements";
import DueDates from "../DueDates/DueDates";
import Events from "../Events/Events";
import Teams from "../MeetTheTeam/MeetTheTeam";
import { useState, useEffect } from "react";

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

type DocData = AnnouncementData | DueDateData | EventData | TeamData;

interface SearchByProps {
  eventType: string;
  docType: string;
}

// eventType: "view" | "edit" | "delete
// docType: "Announcements" | "Due Dates" | "Events" | "Team"
const SearchBy = ({ eventType, docType }: SearchByProps) => {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [dueDates, setDueDates] = useState<DueDateData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [docType, eventType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(typeof formData);
    const searchQuery: string = formData.get("text") as string;

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/search/${docType
          .replace(/\s+/g, "")
          .toLowerCase()}?q=${searchQuery}`
      );
      const data: DocData[] = await response.json();
      if (data.length === 0) {
        setNoResults(true);
      }
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const setData = (docs: DocData[]) => {
    if (docType === "Announcements") {
      console.log(docs);
      setAnnouncements(docs as AnnouncementData[]);
    } else if (docType === "Due Dates") {
      setDueDates(docs as DueDateData[]);
    } else if (docType === "Events") {
      setEvents(docs as EventData[]);
    } else {
      // docType === "Team"
      setTeams(docs as TeamData[]);
    }
    setLoaded(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="createForm">
        <TextField
          label="Search"
          name="text"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />

        <Button variant="contained" type="submit">
          Find
        </Button>
      </form>
      <div className="search-results">
        {loaded && (
          <>
            {docType === "Announcements" && (
              <Announcements
                announcementType={eventType}
                docs={announcements}
                setDocs={setAnnouncements}
              />
            )}
            {docType === "Due Dates" && (
              <DueDates
                eventType={eventType}
                docs={dueDates}
                setDocs={setDueDates}
              />
            )}

            {docType === "Events" && (
              <Events eventType={eventType} docs={events} setDocs={setEvents} />
            )}
            {docType === "Team" && (
              <Teams eventType={eventType} docs={teams} setDocs={setTeams} />
            )}
            {noResults && <h4>No results found</h4>}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBy;
