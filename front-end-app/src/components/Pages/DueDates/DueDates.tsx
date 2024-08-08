import { useEffect, useState } from "react";
import "./DueDates.css";
import DueDate from "./DueDate";
import { deleteDoc, editDoc } from "../Admin/helperFunctions";
import DeletableDueDate from "../Admin/DeleteDoc/DeleteDueDate";
import EditableDueDate from "../Admin/EditDoc/EditDueDate";

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

  const handleEditDueDate = async (id: string, updatedDueDate: DueDateData) => {
    const success = await editDoc(id, updatedDueDate, "duedate");
    if (success) {
      setDocs((prevDueDates) =>
        prevDueDates.map((dueDate) =>
          dueDate._id === id ? { ...dueDate, ...updatedDueDate } : dueDate
        )
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
            ) : eventType === "delete" ? (
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
            ) : (
              <EditableDueDate
                _id={duedate._id}
                title={duedate.Title}
                author={duedate.Author}
                datePosted={duedate["Date Posted"]}
                dueDate={duedate["Due Date"]}
                keywords={duedate.Keywords}
                applicableTo={duedate["Applicable to"]}
                onEdit={handleEditDueDate}
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
