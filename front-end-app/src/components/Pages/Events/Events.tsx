import { useEffect, useState } from "react";
import Event from "./Event";
import "./Events.css";
import EditEvent from "../Admin/EditDoc/EditEvent";
import DeleteEvent from "../Admin/DeleteDoc/DeleteEvent";
import { deleteDoc, editDoc } from "../Admin/helperFunctions";

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

  const handleEditEvent = async (id: string, updatedEvent: EventData) => {
    const success = await editDoc(id, updatedEvent, "event");
    if (success) {
      setDocs((prevEvents) =>
        prevEvents.map((event) =>
          event._id === id ? { ...event, ...updatedEvent } : event
        )
      );
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
            ) : eventType === "delete" ? (
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
            ) : (
              <EditEvent
                _id={event._id}
                title={event.Title}
                author={event.Author}
                body={event.Body}
                dateOfEvent={event.DateOfEvent}
                datePosted={event.DatePosted}
                applicableTo={event["Applicable to"]}
                image={event.Image}
                onEdit={handleEditEvent}
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
