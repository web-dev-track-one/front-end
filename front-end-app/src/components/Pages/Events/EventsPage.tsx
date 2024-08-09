import React, { useEffect, useState } from "react";
import Events from "./Events";

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

const EventsPage = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchEvents = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/events?offset=${offset}&limit=${limit}`
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
    <Events
      eventType="view"
      docs={events}
      setDocs={setEvents}
      loadMoreEvents={loadMoreEvents}
      totalEvents={totalEvents}
      loading={loading}
    />
  );
};

export default EventsPage;
