import "./Event.css";

interface EventProps {
  title: string;
  author: string;
  body: string;
  datePosted: string;
  dateOfEvent: string;
  applicableTo: string;
  image: string;
}

const Announcement = ({
  title,
  author,
  body,
  datePosted,
  dateOfEvent,
  applicableTo,
  image,
}: EventProps) => {
  const formattedDate = new Date(datePosted);
  const formattedDateOfEvent = new Date(dateOfEvent);

  return (
    <div className="event">
      <div className="event-header">
        <h3>{title}</h3>
        <span>{author}</span>
      </div>
      <div className="event-body">
        <div className="event-text">
          <p>{body}</p>
        </div>
        <div className="event-image">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="event-footer">
        <span>Date of the Event: {formattedDateOfEvent.toDateString()}</span>
        <span>Applicable To: {applicableTo}</span>
        <span>Posted: {formattedDate.toDateString()}</span>
      </div>
    </div>
  );
};

export default Announcement;
