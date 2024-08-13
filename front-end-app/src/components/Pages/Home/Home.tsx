import "./Home.css";
import { useEffect, useState } from "react";

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

const Home = () => {
  const [dueDates, setDueDates] = useState<DueDateData[]>([]);

  useEffect(() => {
    const fetchDueDates = async () => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/duedates?offset=0&limit=6`
      );
      if (!response.ok) {
        console.error("Failed to fetch due dates");
        return;
      }

      const data: dataResponse = await response.json();
      setDueDates(data.allDueDates);
    };

    fetchDueDates();
  }, []);

  return (
    <div className="container">
      <div className="card-home" style={{ width: "30%" }}>
        <h2 className="card-title">About Us</h2>

        <p className="about-us-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ligula
          ligula, hendrerit ut aliquam ac, vestibulum porttitor augue. In
          convallis malesuada bibendum. Donec sit amet hendrerit ante. Nullam
          scelerisque ex nec mauris placerat interdum in sit amet sapien. Proin
          sed massa et sem hendrerit rhoncus in vel risus. Aliquam pulvinar
          mollis purus, sed lobortis velit suscipit sed. Vivamus lobortis, felis
          sed euismod pellentesque, lorem nibh dignissim mauris, ac tincidunt
          urna ligula in metus.
        </p>
      </div>

      <div className="card-home" style={{ width: "60%" }}>
        <h2 className="card-title">Upcoming Due Dates</h2>

        <div className="due-dates">
          {dueDates.map((dueDate, index) => (
            <div key={index} className="due-date">
              <h3 className="due-date-title">{dueDate.Title}</h3>
              <p className="due-date-text">{dueDate.Author}</p>
              <p className="due-date-text">
                Applicable to: {dueDate["Applicable to"]}
              </p>
              <p className="due-date-text due-date-date">
                Due Date: {dueDate["Due Date"].split("T")[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
