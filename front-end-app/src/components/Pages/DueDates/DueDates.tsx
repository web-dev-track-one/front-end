import { useEffect, useState } from "react";
import "./DueDates.css";
import DueDate from "./DueDate";

interface DueDateData {
  Title: string;
  Author: string;
  Keywords: string[];
  "Date Posted": string;
  "Due Date": string;
  "Applicable to": string;
}

interface dataResponse {
  allDueDates: DueDateData[];
  totalDueDates: number;
}

const DueDates = () => {
  const [duedates, setDuedates] = useState<DueDateData[]>([]);
  const [totalDueDates, setTotalDueDates] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch announcements from backend
    setLoading(true);

    const fetchDueDates = async () => {
      const response = await fetch(
        `http://localhost:3000/duedates?offset=${offset}&limit=${limit}`
      );
      if (!response.ok) {
        console.error("Failed to fetch due dates");
        return;
      }
      console.log(response);

      const data: dataResponse = await response.json();
      setDuedates((prevDuedates) => {
        return [...prevDuedates, ...data.allDueDates];
      });
      setTotalDueDates(data.totalDueDates);
      setLoading(false);
    };

    fetchDueDates();
  }, [offset]);

  const loadMoreDueDates = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

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
      {duedates.length < totalDueDates && !loading && (
        <div className="loadMoreButton-container">
          <button className="loadMoreButton" onClick={loadMoreDueDates}>
            Load More
          </button>
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default DueDates;
