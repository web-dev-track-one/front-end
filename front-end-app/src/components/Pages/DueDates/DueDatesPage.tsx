import { useEffect, useState } from "react";
import DueDates from "./DueDates";
import exp from "constants";

interface DueDateData {
  _id: string;
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

const DueDatesPage = () => {
  const [dueDates, setDueDates] = useState<DueDateData[]>([]);
  const [totalDueDates, setTotalDueDates] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch due dates from backend
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
      setDueDates((prevDueDates) => {
        return [...prevDueDates, ...data.allDueDates];
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
    <DueDates
      eventType="view"
      docs={dueDates}
      setDocs={setDueDates}
      loadMoreDueDates={loadMoreDueDates}
      totalDueDates={totalDueDates}
      loading={loading}
    />
  );
};

export default DueDatesPage;
