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
        <span>Date of the Event: {dateOfEvent.split("T")[0]}</span>
        <span>Applicable To: {applicableTo}</span>
        <span>Posted: {datePosted.split("T")[0]}</span>
      </div>
    </div>
  );
};

export default Announcement;
