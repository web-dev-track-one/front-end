import { useEffect, useState } from "react";
import Event from "./Event";
import "./Events.css";
import { off } from "process";

interface EventData {
  Title: string;
  Author: string;
  Body: string;
  DatePosted: Date;
  DateOfEvent: Date;
  ApplicableTo: string;
  Image: string;
}
interface dataResponse {
  allEvents: EventData[];
  totalEvents: number;
}

const Events = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch announcements from backend
    setLoading(true);
    const fetchEvents = async () => {
      const response = await fetch(
        `http://localhost:3000/events?offset=${offset}&limit=${limit}`
      );
      if (!response.ok) {
        console.error("Failed to fetch events");
        return;
      }

      const data: dataResponse = await response.json();
      setTotalEvents(data.totalEvents);
      setEvents((prevEvents) => [...prevEvents, ...data.allEvents]);
      setLoading(false);
    };

    fetchEvents();
  }, [offset]);

  const loadMoreEvents = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className="events-container">
      <h1>Events</h1>
      <div className="events-list">
        {events.map((event, index) => (
          <Event
            key={index}
            title={event.Title}
            author={event.Author}
            body={event.Body}
            dateOfEvent={event.DateOfEvent}
            datePosted={event.DatePosted}
            applicableTo={event.ApplicableTo}
            image={event.Image}
          />
        ))}
      </div>
      {events.length < totalEvents && !loading && (
        <div className="loadMoreButton-container">
          <button className="loadMoreButton" onClick={loadMoreEvents}>
            Load More
          </button>
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Events;
