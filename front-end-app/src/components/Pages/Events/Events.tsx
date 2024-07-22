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

interface EventsProps {
  eventType: string;
  docs: EventData[];
  setDocs: React.Dispatch<React.SetStateAction<EventData[]>>;
  loadMoreEvents?: () => void;
  totalEvents?: number;
  loading?: boolean;
}

const Events = ({
  eventType,
  docs,
  setDocs,
  loadMoreEvents,
  totalEvents,
  loading,
}: EventsProps) => {
  const handleDeleteEvent = async (id: string) => {
    const success = await deleteDoc(id, "Events");
    if (success) {
      setDocs((prevEvents) => prevEvents.filter((event) => event._id !== id));
    }
  };

  return (
    <div className="events-container">
      <h1>Events</h1>
      <div className="events-list">
        {docs.map((event, index) => (
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
      {eventType === "view" &&
        !loading &&
        totalEvents &&
        docs.length < totalEvents && (
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
