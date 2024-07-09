import { useEffect, useState } from "react";
import Event from "./Event";
import "../../../css/Events.css";

interface EventData {
  Title: string;
  Author: string;
  Body: string;
  DatePosted: Date;
  DateOfEvent: Date;
  ApplicableTo: string;
  Image: string;
}

const Events = () => {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    // Fetch announcements from backend
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      if (!response.ok) {
        console.error("Failed to fetch events");
        return;
      }

      const data: EventData[] = await response.json();

      console.log(data[0].Image, typeof data[0].Image);
      setEvents(data);
    };

    fetchEvents();
  }, []);

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
    </div>
  );
};

export default Events;
