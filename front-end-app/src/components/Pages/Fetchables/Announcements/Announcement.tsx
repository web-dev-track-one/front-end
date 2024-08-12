import "./Announcement.css";

interface AnnouncementProps {
  title: string;
  author: string;
  body: string;
  keywords: string[];
  date: string;
}

const Announcement = ({
  title,
  author,
  body,
  keywords,
  date,
}: AnnouncementProps) => {
  return (
    <div className="announcement">
      <div className="announcement-header">
        <h3>{title}</h3>
        <span>{author}</span>
      </div>
      <div className="announcement-body">
        <p>{body}</p>
      </div>
      <div className="announcement-footer">
        <span>Key Words: {keywords.join(", ")}</span>
        <span>Posted: {date.split("T")[0]}</span>
      </div>
    </div>
  );
};

export default Announcement;
