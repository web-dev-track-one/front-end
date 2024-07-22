import { useEffect, useState } from "react";
import "./DueDates.css";
import DueDate from "./DueDate";
import { deleteDoc } from "../Admin/deleteFunction";
import DeletableDueDate from "../Admin/DeleteDueDate";

interface DueDateData {
  _id: string;
  Title: string;
  Author: string;
  Keywords: string[];
  "Date Posted": string;
  "Due Date": string;
  "Applicable to": string;
}

interface DueDatesProps {
  eventType: string;
  docs: DueDateData[];
  setDocs: React.Dispatch<React.SetStateAction<DueDateData[]>>;
  loadMoreDueDates?: () => void;
  totalDueDates?: number;
  loading?: boolean;
}

const DueDates = ({
  eventType,
  docs,
  setDocs,
  loadMoreDueDates,
  totalDueDates,
  loading,
}: DueDatesProps) => {
  const handleDeleteDueDate = async (id: string) => {
    const success = await deleteDoc(id, "Due Dates");
    if (success) {
      setDocs((prevDueDates) =>
        prevDueDates.filter((event) => event._id !== id)
      );
    }
  };

  return (
    <div className="duedates-container">
      <h1>Due Dates</h1>
      <div className="duedates-list">
        {docs.map((duedate, index) => (
          <>
            {eventType === "view" ? (
              <DueDate
                key={index}
                title={duedate.Title}
                author={duedate.Author}
                keywords={duedate.Keywords}
                datePosted={duedate["Date Posted"]}
                dateDue={duedate["Due Date"]}
                applicableTo={duedate["Applicable to"]}
              />
            ) : (
              <DeletableDueDate
                _id={duedate._id}
                title={duedate.Title}
                author={duedate.Author}
                keywords={duedate.Keywords}
                datePosted={duedate["Date Posted"]}
                dateDue={duedate["Due Date"]}
                applicableTo={duedate["Applicable to"]}
                onDelete={handleDeleteDueDate}
              />
            )}
          </>
        ))}
      </div>
      {eventType === "view" &&
        !loading &&
        totalDueDates &&
        docs.length < totalDueDates && (
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
