import "./DueDate.css";

interface DueDateProps {
  title: string;
  author: string;
  keywords: string[];
  datePosted: string;
  dateDue: string;
  applicableTo: string;
}

const DueDate = ({
  title,
  author,
  keywords,
  datePosted,
  dateDue,
  applicableTo,
}: DueDateProps) => {
  const formattedDate = new Date(datePosted);
  const formattedDateDue = new Date(dateDue);
  return (
    <div className="duedate">
      <div className="duedate-header">
        <h3 className="duedate-title">{title}</h3>
        <h3 className="duedate-duedate">
          Due Date: {formattedDateDue.toDateString()}
        </h3>
        <h3 className="duedate-author">{author}</h3>
      </div>
      <div className="duedate-body"></div>
      <div className="duedate-footer">
        <span className="duedate-keywords">
          Key Words: {keywords.join(", ")}
        </span>
        <span className="duedate-applicable">
          Applicable To: {applicableTo}
        </span>
        <span className="duedate-posted">
          Posted: {formattedDate.toDateString()}
        </span>
      </div>
    </div>
  );
};

export default DueDate;
