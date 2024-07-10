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
        <h3>{title}</h3>
        <h3 className="duedate-duedate">
          Due Date: {formattedDateDue.toDateString()}
        </h3>
        <h3>{author}</h3>
      </div>
      <div className="duedate-body"></div>
      <div className="duedate-footer">
        <span>Key Words: {keywords.join(", ")}</span>
        <span>Applicable To: {applicableTo}</span>
        <span>Posted: {formattedDate.toDateString()}</span>
      </div>
    </div>
  );
};

export default DueDate;
