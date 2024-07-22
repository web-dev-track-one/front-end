import React from "react";
import { Button } from "@mui/material";
import "./Admin.css";
import Announcements from "../Announcements/Announcements";
import Events from "../Events/Events";
import Teams from "../MeetTheTeam/MeetTheTeam";
import DueDates from "../DueDates/DueDates";
import SearchBy from "./SearchBy";
import GetAlltoDelete from "./GetAlltoDelete";

import { useState, useEffect } from "react";

interface DeleteFormProps {
  type: string;
}

const DeleteForm = ({ type }: DeleteFormProps) => {
  const [getAll, setGetAll] = useState(false);
  const [searchBy, setSearchBy] = useState(false);
  const [announcement, setAnnouncement] = useState(false);
  const [event, setEvent] = useState(false);
  const [dueDate, setDueDate] = useState(false);
  const [team, setTeam] = useState(false);
  const [searchTypes, setSearchTypes] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setGetAll(false);
    setSearchBy(false);
    if (type === "Events") {
      setSearchTypes("Title, Author or Text");
      setDescription("Events");
      setEvent(true);
      setAnnouncement(false);
      setDueDate(false);
      setTeam(false);
    } else if (type === "Announcements") {
      setSearchTypes("Title, Author or Keywords");
      setDescription("Announcements");
      setAnnouncement(true);
      setEvent(false);
      setDueDate(false);
      setTeam(false);
    } else if (type === "Due Dates") {
      setSearchTypes("Title, Author or Keywords");
      setDescription("Due Dates");
      setDueDate(true);
      setAnnouncement(false);
      setEvent(false);
      setTeam(false);
    } else {
      // type === "Team"
      setSearchTypes("Name, Role or Bio");
      setDescription("a Team member");
      setTeam(true);
      setAnnouncement(false);
      setEvent(false);
      setDueDate(false);
    }
  }, [type]);

  const handleGetEverything = () => {
    setGetAll(true);
    setSearchBy(false);
  };
  return (
    <div className="delete-form-container">
      <h1>Delete {description}</h1>
      <div className="delete-form-buttons">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setSearchBy(true);
            setGetAll(false);
          }}
        >
          Search by {searchTypes}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGetEverything}
        >
          Get Everything
        </Button>
      </div>
      <div className="delete-form-results">
        {getAll ? (
          <GetAlltoDelete eventType="delete" docType={type} />
        ) : (
          searchBy && <>{<SearchBy eventType="delete" docType={type} />}</>
        )}
      </div>
    </div>
  );
};

export default DeleteForm;
