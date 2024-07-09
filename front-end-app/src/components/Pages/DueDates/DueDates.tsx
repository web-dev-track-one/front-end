import { useEffect, useState } from "react";
import "../../../css/DueDates.css";
import DueDate from "./DueDate";

interface DueDateData {
  Title: string;
  Author: string;
  Keywords: string[];
  "Date Posted": string;
  "Due Date": string;
  "Applicable to": string;
}

const DueDates = () => {
  const [duedates, setDuedates] = useState<DueDateData[]>([]);

  useEffect(() => {
    // Fetch announcements from backend
    const fetchAnnouncements = async () => {
      const response = await fetch("http://localhost:3000/duedates");
      if (!response.ok) {
        console.error("Failed to fetch announcements");
        return;
      }

      const data: DueDateData[] = await response.json();
      setDuedates(data);
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="duedates-container">
      <h1>Due Dates</h1>
      <div className="duedates-list">
        {duedates.map((duedate, index) => (
          <DueDate
            key={index}
            title={duedate.Title}
            author={duedate.Author}
            keywords={duedate.Keywords}
            datePosted={duedate["Date Posted"]}
            dateDue={duedate["Due Date"]}
            applicableTo={duedate["Applicable to"]}
          />
        ))}
      </div>
    </div>
  );
};

export default DueDates;
