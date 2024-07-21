import { useEffect, useState } from "react";
import Event from "./Event";
import "./Events.css";

import DeleteEvent from "../Admin/DeleteEvent";
import { deleteDoc } from "../Admin/deleteFunction";

interface EventData {
  _id: string;
  Title: string;
  Author: string;
  Body: string;
  DatePosted: Date;
  DateOfEvent: Date;
  "Applicable to": string;
  Image: string;
}

interface dataResponse {
  allEvents: EventData[];
  totalEvents: number;
}

const Events = ({ eventType }: { eventType: string }) => {
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

  const handleDeleteEvent = async (id: string) => {
    const success = await deleteDoc(id, "Events");
    if (success) {
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    }
  };

  return (
    <div className="events-container">
      <h1>Events</h1>
      <div className="events-list">
        {events.map((event, index) => (
          <>
            {eventType === "view" ? (
              <Event
                key={index}
                title={event.Title}
                author={event.Author}
                body={event.Body}
                dateOfEvent={event.DateOfEvent}
                datePosted={event.DatePosted}
                applicableTo={event["Applicable to"]}
                image={event.Image}
              />
            ) : (
              <DeleteEvent
                _id={event._id}
                title={event.Title}
                author={event.Author}
                body={event.Body}
                dateOfEvent={event.DateOfEvent}
                datePosted={event.DatePosted}
                applicableTo={event["Applicable to"]}
                image={event.Image}
                onDelete={handleDeleteEvent}
              />
            )}
          </>
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
